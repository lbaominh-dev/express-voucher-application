import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller";
import { createProductSchema, updateProductSchema } from "./product.validation";
import validateMiddleware from "../../middlewares/validate.middleware";

const app = express.Router();

/**
 * @openapi
 * tags:
 *  name: Products
 *  description: API for products in the system
 * /api/products:
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
app.get("/", getAllProducts);

/**
 * @openapi
 * /api/products:
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
app.post("/", validateMiddleware(createProductSchema), createProduct);

/**
 * @openapi
 * /api/products/{id}:
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
app.get("/:id", getProductById);

/**
 * @openapi
 * /api/products/{id}:
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
app.put("/:id", validateMiddleware(updateProductSchema), updateProduct);

/**
 * @openapi
 * /api/products/{id}:
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
app.delete("/:id", deleteProduct);

export default app;
