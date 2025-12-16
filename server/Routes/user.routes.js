import express from "express";
import {SendOtp,SignUp,Login,logout} from "../Controllers/Auth.js";
const router = express.Router();
router.post("/SendOtp",SendOtp)
router.post("/SignUp",SignUp)
router.post("/Login",Login)
router.post("/logout",logout)
export default router