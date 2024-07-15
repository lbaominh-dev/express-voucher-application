import mongoose from "mongoose";
import { DB_OPTIONS, DB_URI } from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, DB_OPTIONS);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", (error as any).message);
    process.exit(1);
  }
};

export default connectDB;
