import "./config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import db from "./database/db.js";
import router from "./routes/user.routes.js";
import cors from "cors";

const app = express();

/* ---------- BODY PARSERS ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------- CORS (FIXED) ---------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://auth-taupe-phi.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ❌ REMOVE THIS — DO NOT USE */
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }
//   next();
// });

/* ---------- ROUTES ---------- */
app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  res.send("Welcome to our Home Page");
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 3008;

const startServer = async () => {
  try {
    await db();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
