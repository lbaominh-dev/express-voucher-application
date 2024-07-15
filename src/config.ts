import mongoose from "mongoose";

export const dbUri = process.env.MONGO_URI || "mongodb://root:root1234@localhost:27017";
export const dbClientOptions: mongoose.ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};