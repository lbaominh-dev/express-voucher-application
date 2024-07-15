import { RequestHandler } from "express";
import productServices from "./product.service";

export const getAll: RequestHandler = async (req, res) => {
  try {
    const products = await productServices.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const create: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const getById: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.getById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.update(req.params.id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await productServices.getById(req.params.id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};

export const remove: RequestHandler = async (req, res) => {
  try {
    const product = await productServices.remove(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
};
