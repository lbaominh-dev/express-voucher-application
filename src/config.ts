import mongoose from "mongoose";

export const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
export const DB_OPTIONS: mongoose.ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const SMTP_HOST = process.env.SMTP_HOST || "localhost";
export const SMTP_PORT = Number(process.env.SMTP_PORT) || 1025;
export const SMTP_USERNAME = process.env.SMTP_USERNAME || "Voucher Application";
export const SMTP_USER = process.env.SMTP_USER || "sender@mailhog.com";
export const SMTP_PASS = process.env.SMTP_PASS || "pass";