import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error("No mongo url");
    process.exit(1);
  }

  try {
    console.log();
    await mongoose.connect(mongoUrl);
    console.log("✅ MongoDB connected");
  } catch (err: any) {
    console.error("❌ Mongo connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
