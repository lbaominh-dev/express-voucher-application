import express from "express";
import {
  createVoucher,
  deleteVoucher,
  getAllVouchers,
  updateVoucher,
} from "./voucher.controller";
import validateMiddleware from "@/middlewares/validate.middleware";
import { voucherCreateSchema, voucherUpdateSchema } from "./voucher.validation";

const app = express.Router();

app.get("/vouchers", getAllVouchers);
app.post("/voucher", validateMiddleware(voucherCreateSchema), createVoucher);
app.put("/voucher/:id", validateMiddleware(voucherUpdateSchema), updateVoucher);
app.delete("/voucher/:id", deleteVoucher);

export default app;

/**
 * @swagger
 * tags:
 *  name: Vouchers
 *  description: API for Vouchers in the system
 */

/**
 * @swagger
 * /vouchers/:
 *  get:
 *      summary: Get all Vouchers
 *      description: Get all Vouchers
 *      tags: [Vouchers]
 *      responses:
 *         200:
 *          description: List of Vouchers
 */

/**
 * @swagger
 * /voucher/:
 *  post:
 *   summary: Create a new Voucher
 *   tags: [Vouchers]
 *   requestBody:
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - discount
 *              - eventId
 *              - email
 *             properties:
 *              discount:
 *               type: number
 *              eventId:
 *               type: string
 *              email:
 *               type: string
 *   responses:
 *      201:
 *          description: Voucher created successfully
 *      500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /voucher/{id}:
 *  put:
 *   summary: Update a Voucher
 *   tags: [Vouchers]
 *   parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *   requestBody:
 *      content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              discount:
 *               type: number
 *              eventId:
 *               type: string
 *   responses:
 *      200:
 *          description: Voucher update successfully
 *      500:
 *          description: Internal server error
 */

/**
 * @swagger
 * /voucher/{id}:
 *  delete:
 *   summary: Delete a Voucher
 *   tags: [Vouchers]
 *   parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *   responses:
 *      204:
 *          description: Voucher deleted successfully
 *      500:
 *          description: Internal server error
 */