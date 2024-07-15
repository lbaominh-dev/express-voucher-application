import { QueryOptions } from "mongoose";
import { ProductDocument } from "./product.model";
import productRepository from "./product.repository";
import { CreateProductInput } from "./product.validation";

export const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

export const createProduct = async (product: CreateProductInput) => {
  return await productRepository.createProduct(product);
};

export const getProductById = async (id: string) => {
  return await productRepository.getProductById(id);
};

export const updateProduct = async (
  id: string,
  product: ProductDocument,
  opts?: QueryOptions
) => {
  return await productRepository.updateProduct(id, product, opts);
};

export const deleteProduct = async (id: string) => {
  return await productRepository.deleteProduct(id);
};

const productServices = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productServices;
