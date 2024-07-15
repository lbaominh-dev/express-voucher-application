import express from "express";
import authMiddleware from "@/middlewares/auth.middleware";
import { getMe } from "./user.controller";

const app = express.Router();

app.get("/user/me", authMiddleware, getMe);

export default app;

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */