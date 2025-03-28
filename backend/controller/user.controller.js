import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import createToken,{ User } from "../model/user.model.js";



const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields (username, email, password) are required!",
        success: false,
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

   
    const user = new User({
      username,
      email,
      password, 
    });

    await user.save();
    const token = createToken(user._id);

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


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


const logoutUser = async (req, res) => {

    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.token = null;
        await user.save();

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export { registerUser, loginUser, logoutUser };
