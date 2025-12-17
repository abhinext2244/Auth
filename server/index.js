import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./database/db.js";
import router from "./routes/user.routes.js";
import cors from "cors";
const app=express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use(
  cors({
    origin: "https://auth-h3mx.vercel.app",
    // origin:"http://localhost:5173",
    credentials:true,
  })
);


const PORT=process.env.PORT || 3008;
app.use("/api/v1/auth",router);
app.get("/",(req,res)=>res.send("Welcome to our Home Page"));
app.listen(PORT, async()=>{
    await db()
    console.log(`server is running on port ${PORT}`);
});
