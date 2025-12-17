import express from "express";
import {SendOtp,SignUp,Login,logout} from "../controllers/auth.js";
const router = express.Router();
router.post("/send-otp", SendOtp);
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout", logout);

export default router