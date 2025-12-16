import otpGenerator from "otp-generator";
import Otp from "../Models/otp.js";
import User from "../Models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const SendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // delete old OTP for same email
    await Otp.deleteMany({ email });

    // generate unique OTP
    let otp;
    let isUnique = false;

    while (!isUnique) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      const otpExists = await Otp.findOne({ otp });
      if (!otpExists) isUnique = true;
    }

    // hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min
    });

    // TODO: send email here
    console.log("OTP (dev only):", otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const SignUp = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password ||!otp) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // get latest OTP
    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }
    
    // OTP expiry check (5 minutes)
    const otpExpiryTime = 5 * 60 * 1000; // 5 min
    if (Date.now() - recentOtp.createdAt.getTime() > otpExpiryTime) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }
      const isOtpValid = await bcrypt.compare(otp, recentOtp.otp);

    if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }


    // OTP verified – delete it
    // await Otp.deleteOne({ _id: recentOtp._id });

    // return res.status(200).json({
    //   success: true,
    //   message: "OTP verified successfully",
    // });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ 
      success: true,
      message: "User created successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //User check
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //  Password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //  Generate Access Token (short life)
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    //  Generate Refresh Token (long life)
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    //  Store refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,       // production me true
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send access token in response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
