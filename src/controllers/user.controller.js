import mongoose from 'mongoose'
import { asyncHandler } from '../utils/asyncHandler.js'

const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "Hello"
    // })

    const { fullName, email, password, username } = req.body
} )

export { registerUser }