import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // imp: this is a costly operation for the database, ideally use it only when necessary, else don't
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true, // using it 'coz, searching it would be necessary for the application so okay to use this expensive operation
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
        },
        password: {
            type: String,
            required: [true,"Password is required"] 
        },
        refreshToken: {
            type: String,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Video'
            }
        ]
    },{ timestamps: true })




// Pre-hook in mongoose , can be used to hold a data for a specific action, just before a certain execution
// Ex: A user after putting in his paswd, that paswd is stopped by the pre hook to convert it to a specific hash
// this key is necessary here because, this pre hook will working for every instance and as it is a middleware, so it should have access to (next)
// don't use arrow functions here as it doesn't have the ref of this key
userSchema.pre("save", async function(next) {
    // Now this code will run everytime, the user changes anything, so if he changes the avatar, then again the paswd wilol get changed, and so on..
    // Don't want that to happen, so better to use a conditional check
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)// 10 denotes the number of rounds the paswd will be hashed
    next()
    // if u want remove the ! operator and move the above 2 lines inside the if statement 
})

// now the functionality to check if the password given by the a user is correct as per his passwd saved in the DB
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password) // password entered by user & password saved in DB
}





// Not necessay to use async here as the execution is pretty fast, but if u want, u may use async-await here
userSchema.methods.generateAccessToken = function() {
    // sign() methods generates the token
    return jwt.sign (
        {
            // Left part is name of payload : right part is coming from the database
            // u may write up as many u want from the Schema, all will be available if they have been defined above
            _id: this._id, // this is already stored in the DB, will get direct access from there
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        //after the above payload gen, now the access token/secret key is needed
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    // Returning as it .sign() is generating the token and giving back , usually not requried to use async-await here
}

userSchema.methods.generateRefreshToken = function() {
    // refreshtoken doesn't need as many info like in the case of access token
    return jwt.sign (
        {
            _id: this._id, // this is already stored in the DB, will get direct access from there
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}

export const User = mongoose.model("User", userSchema)