import { RequestHandler } from "express";
import productServices from "./product.service";

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const products = await productServices.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.updateProduct(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await productServices.getProductById(req.params.id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
