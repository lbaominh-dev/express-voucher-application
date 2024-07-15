import mongoose from "mongoose";
import { dbClientOptions, dbUri } from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, dbClientOptions);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", (error as any).message);
    process.exit(1);
  }
};

export default connectDB;
