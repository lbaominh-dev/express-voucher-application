import express from "express";
import validateMiddleware from "../../middlewares/validate.middleware";
import { loginUser, refreshToken, registerUser } from "./auth.controller";
import { loginUserSchema, registerUserSchema } from "./auth.validation";

const app = express.Router();

app.post("/auth/login", validateMiddleware(loginUserSchema), loginUser);
app.post("/auth/register", validateMiddleware(registerUserSchema), registerUser);
app.post("/auth/refreshToken", refreshToken);

export default app;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API for Auth in the system
*/

/**
 * @swagger   
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                  type: object
 *                  required: 
 *                      - email
 *                      - password
 *                  properties:
 *                      email:
 *                        type: string
 *                        format: email
 *                        description: must be unique
 *                      password:
 *                        type: string
 *                        format: password
 *                        minLength: 8
 *                        description: At least one number and one letter
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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: User already exists
*/

/**
 * @swagger 
 * /auth/refreshToken:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *     responses:
 *       200:
 *         description: Successful operation
 *       401:
 *         description: Unauthorized
 */