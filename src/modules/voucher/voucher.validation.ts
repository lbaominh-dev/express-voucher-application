import { z } from "zod";

export const voucherCreateSchema = z.object({
  email: z.string().email(),
  discount: z.number().int().positive(),
  eventId: z.string(),
});

export const voucherUpdateSchema = z.object({
  email: z.string().email(),
  discount: z.number().int().positive().optional(),
  eventId: z.string().optional(),
});

export type VoucherCreateInput = z.infer<typeof voucherCreateSchema>;
export type VoucherUpdateInput = z.infer<typeof voucherUpdateSchema>;
