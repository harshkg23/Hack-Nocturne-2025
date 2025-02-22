import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";


const verifyJwt = async (req, res, next) => {
    try {
        const token =
            req.cookies?.createToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error?.message || "Invalid Access Token" });
    }
};

export default verifyJwt;
