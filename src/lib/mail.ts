import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from "@/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default transporter;
