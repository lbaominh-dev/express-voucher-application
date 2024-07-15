import { QueryOptions } from "mongoose";
import Product from "./product.model";
import { CreateProductInput, UpdateProductInput } from "./product.validation";

export const getAllProducts = async () => {
  return await Product.find({});
};

export const createProduct = async (product: CreateProductInput) => {
  return await Product.create(product);
};

export const getProductById = async (id: string) => {
  return await Product.findById(id);
};

export const updateProduct = async (id: string, product: UpdateProductInput, opts?: QueryOptions) => {
  return await Product.findByIdAndUpdate(id, product, opts);
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

const productRepository = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productRepository;
