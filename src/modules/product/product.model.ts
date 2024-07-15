import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - price
 *       properties:
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 *         image:
 *           type: string
 */
export const ProductSchema = new mongoose.Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;