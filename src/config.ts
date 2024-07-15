import mongoose from "mongoose";

export const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
export const DB_OPTIONS: mongoose.ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const SMTP_HOST = process.env.SMTP_HOST || "smtp.mailtrap.io";
export const SMTP_PORT = Number(process.env.SMTP_PORT) || 2525;
export const SMTP_USER = process.env.SMTP_USER || "user";
export const SMTP_PASS = process.env.SMTP_PASS || "pass";