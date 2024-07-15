import { z } from "zod";

export const eventCreateSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
  date: z.number(),
  maxQuantity: z.number().int().positive(),
});

export const eventUpdateSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
  date: z.number(),
  maxQuantity: z.number().int().positive(),
}).partial();

export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;
