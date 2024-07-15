import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
})

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;