import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  image: z.string().optional(),
});

export const updateProductSchema = z.object({}).merge(createProductSchema).partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
