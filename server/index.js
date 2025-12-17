import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./database/db.js";
import router from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://auth-h3mx.vercel.app",
  "https://auth-taupe-phi.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
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

app.use("/api/v1/auth", router);

app.get("/", (req, res) => res.send("Welcome to our Home Page"));

const PORT = process.env.PORT || 3008;

app.listen(PORT, async () => {
  await db();
  console.log(`Server is running on port ${PORT}`);
});
