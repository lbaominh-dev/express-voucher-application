import { z } from "zod";

export const voucherCreateSchema = z.object({
    discount: z.number().int().positive(),
    eventId: z.string(),
})

export type VoucherCreateInput = z.infer<typeof voucherCreateSchema>;