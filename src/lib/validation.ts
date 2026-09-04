import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^\+91[6-9]\d{9}$/,
    "Invalid Indian phone number"
  );

export const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .max(128, "Password is too long");

export const registerSchema = z
  .object({
    phone: phoneSchema,
    password: passwordSchema,
  })
  .strict();

export const loginSchema = z
  .object({
    phone: phoneSchema,
    password: passwordSchema,
  })
  .strict();