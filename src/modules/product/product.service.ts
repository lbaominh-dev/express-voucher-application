import { QueryOptions } from "mongoose";
import { ProductDocument } from "./product.model";
import productRepository from "./product.repository";
import { createInput } from "./product.validation";

export const getAll = async () => {
  return await productRepository.getAll();
};

export const create = async (product: createInput) => {
  return await productRepository.create(product);
};

export const getById = async (id: string) => {
  return await productRepository.getById(id);
};

export const update = async (
  id: string,
  product: ProductDocument,
  opts?: QueryOptions
) => {
  return await productRepository.update(id, product, opts);
};

export const remove = async (id: string) => {
  return await productRepository.remove(id);
};

const productServices = {
  getAll,
  create,
  getById,
  update,
  remove,
};

export default productServices;
