// import mongoose from "mongoose";

// const db = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Database connected");
//     } catch (error) {
//         console.log(error);
//     }
// };

// export default db;
import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000, // 10 sec
      connectTimeoutMS: 10000,
    });
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1); // stop app if DB fails
  }
};

export default db;
