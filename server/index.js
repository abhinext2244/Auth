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
const allowedOrigins = [
  "https://auth-h3mx.vercel.app",
  "https://auth-taupe-phi.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman / server-side requests ke liye
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);



const PORT=process.env.PORT || 3008;
app.use("/api/v1/auth",router);
app.get("/",(req,res)=>res.send("Welcome to our Home Page"));
app.listen(PORT, async()=>{
    await db()
    console.log(`server is running on port ${PORT}`);
});
