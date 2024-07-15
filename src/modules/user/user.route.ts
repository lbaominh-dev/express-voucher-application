import express from "express";
import { getMe, loginUser, refreshToken, registerUser } from "./user.controller";
import validateMiddleware from "../../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema } from "./user.validation";
import authMiddleware from "../../middlewares/auth.middileware";

const app = express.Router();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API for users in the system
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: User not found
 */
app.post("/login", validateMiddleware(loginUserSchema), loginUser);

/**
 * @openai
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: User already exists
 */
app.post("/register", validateMiddleware(registerUserSchema), registerUser);

/**
 * @openai
 * /me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */
app.get("/me", authMiddleware, getMe);

/**
 * @openai
 * /refreshToken:
 *   get:
 *     summary: Refresh access token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */
app.post("/refreshToken", refreshToken);

export default app;
