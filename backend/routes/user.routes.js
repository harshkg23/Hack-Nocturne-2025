import express from "express";
const userRoutes = express.Router();

import { loginUser, logoutUser, registerUser } from "../controller/user.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";

userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser)
userRoutes.route("/logout").post(verifyJwt, logoutUser)



export default userRoutes;