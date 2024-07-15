import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  image: z.string().optional(),
});

export const updateSchema = z.object({}).merge(createSchema).partial();

export type createInput = z.infer<typeof createSchema>;
export type updateInput = z.infer<typeof updateSchema>;
