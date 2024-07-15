import express from "express";
import { create, remove, getAll, getById, update } from "./product.controller";
import { createSchema, updateSchema } from "./product.validation";
import validateMiddleware from "../../middlewares/validate.middleware";

const app = express.Router();

app.get("/products", getAll);

app.post("/product", validateMiddleware(createSchema), create);

app.get("/product/:id", getById);

app.put("/product/:id", validateMiddleware(updateSchema), update);

app.delete("/product/:id", remove);

export default app;

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API for products in the system
 * 
*/

/**
 * @swagger
 * /products/:
 *  get:
 *      summary: Get all products
 *      description: Get all products
 *      tags: [Products]
 *      responses:
 *         200:
 *          description: List of products
 *          content:
 *             application/json:
 *                schema:
 *                   type: array
 *                   $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /product/:
 *  post:
 *      summary: Create a new product
 *      tags: [Products]
 *      parameters:
 *        - in: body
 *          name: product
 *          description: The product to create.
 *          schema:
 *              $ref: '#/components/schemas/Product'
 *      responses:
 *         201:
 *          description: Product created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Product'
 *         500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 */

/**
 * @swagger
 * /product/{id}:
 *  get:
 *      summary: Get a product by id
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *         description: Product found successfully
 */

/**
 * @swagger
 * /product/{id}:
 *  put:
 *      summary: Update a product by id
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *         200:
 *          description: Product updated successfully
 */

/**
 * @swagger
 * /product/{id}:
 *  delete:
 *      summary: Delete a product by id
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *         200:
 *          description: Product deleted successfully
 */

