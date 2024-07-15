import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import loggerMiddleware from "./middlewares/logger.middleware";
import productRoutes from "./modules/product/product.route";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.route";
import eventRoutes from "./modules/event/event.route";
import voucherRoutes from "./modules/voucher/voucher.route";
import swaggerSpec from "./swagger";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(loggerMiddleware);

app.get("/health-check", (_, res) => {
  const isConnectionAlive = mongoose.connection.readyState;

  if (!isConnectionAlive) {
    res.status(500).json("MongoDB connection is not alive");
  }

  res.status(200).json("MongoDB connection alive");
});

// Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
app.use("/api", authRoutes, userRoutes, productRoutes, eventRoutes, voucherRoutes);

export default app;
