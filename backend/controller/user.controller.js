import { createToken, User } from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const generateAccessAndRefreshTokens= async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken= refreshToken
        await user.save({validateBeforeSave: false })

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

// Create a new user

const registerUser = async (req, res) => {
    const { email, password, fullName } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json(
                {
                    message: "User already exists",
                    success: false
                }
            )
        }

        if (!validator.isEmail(email)) {
            return res.json({
                message: "Invalid email",
                success: false
            })
        }

        if (password.length < 6) {
            return res.json({
                message: "Password must be atleast 6 characters",
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = new User({
            email,
            password: hashedPassword,
            fullName
        })

        await user.save();
        const token = createToken(user._id);
        return res.json({
            message: "User registered successfully",
            success: true
        })
    } catch (error) {
        console.error("Error in registerUser", error);
        return res.json({
            message: "Internal server error",
            success: false
        })
        
    }
}

//login user
