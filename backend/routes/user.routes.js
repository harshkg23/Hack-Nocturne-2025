import express from "express";
const router = express.Router();
import { registerUser, loginUser, logoutUser } from "../controller/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)



export default router;