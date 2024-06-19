import mongoose from 'mongoose'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import  { User } from "../models/user.models.js" 
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "Hello"
    })

    // get user details from frontend
    const { fullName, email, password, username } = req.body
    // console.log(`This is req.body: ${JSON.stringify(req.body)}`);


    // validating the received data
    if(
        [fullName, email, password, username].some((field) => field?.trim() === '')
    ) { // can use map() too instead of some above OR u can separately check all the fields 
        throw new ApiError(400, 'All fields are required')
    }

    // check if user already exists: username, email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }



    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   
    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })


    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }



    // return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


} )

const loginUser = asyncHandler(async(req,res) => {

})

export { registerUser, loginUser }