import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import createToken,{ User } from "../model/user.model.js";


// Create a new user

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // ✅ Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields (username, email, password) are required!",
        success: false,
      });
    }

    // ✅ Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    // ✅ Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // ✅ Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

    // ✅ Create user instance (no need to manually hash password)
    const user = new User({
      username,
      email,
      password, // This will be hashed automatically due to the pre-save middleware
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
