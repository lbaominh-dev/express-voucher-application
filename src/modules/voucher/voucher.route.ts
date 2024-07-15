import express from "express";
import { createVoucher, getAllVouchers } from "./voucher.controller";
import validateMiddleware from "@/middlewares/validate.middleware";
import { voucherCreateSchema } from "./voucher.validation";

const app = express.Router();


app.get("/vouchers", getAllVouchers);
app.post("/voucher", validateMiddleware(voucherCreateSchema), createVoucher);


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
 *             properties:
 *              discount:
 *               type: number
 *              eventId:
 *               type: string
 *   responses:
 *      201:
 *          description: Voucher created successfully
 *      500:
 *          description: Internal server error
 */