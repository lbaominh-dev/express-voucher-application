import { QueryOptions } from "mongoose";
import Product from "./product.model";
import { createInput, updateInput } from "./product.validation";

export const getAll = async () => {
  return await Product.find({});
};

export const create = async (product: createInput) => {
  return await Product.create(product);
};

export const getById = async (id: string) => {
  return await Product.findById(id);
};

export const update = async (id: string, product: updateInput, opts?: QueryOptions) => {
  return await Product.findByIdAndUpdate(id, product, opts);
};

export const remove = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

const productRepository = {
  getAll,
  create,
  getById,
  update,
  remove,
};

export default productRepository;
