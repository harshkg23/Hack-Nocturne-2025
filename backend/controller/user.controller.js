import { createToken, User } from "../model/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import createToken, { User } from "../model/user.model.js";


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
            success: true,
            token
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

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.json({
                message: "User not found",
                success: false
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.json({
                message: "Password is incorrect",
                success: false
            })
        }

        const token = createToken(user._id);

        return res.json({
            message: "User logged in successfully",
            success: true,
            token
        })
    } catch (error) {
        console.error("Error in loginUser", error);
        return res.json({
            message: "Internal server error",
            success: false
        })
    }

}

//logout user

const logoutUser = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await
            User.findById(userId);
        if (!user) {
            return res.json({
                message: "User not found",
                success: false
            })
        }
        user.token = null;
        await user.save();
        return res.json({
            message: "User logged out successfully",
            success: true
        })
    }
    catch (error) {
        console.error("Error in logoutUser", error);
        return res.json({
            message: "Internal server error",
            success: false
        })
    }
}

export { registerUser, loginUser, logoutUser };
