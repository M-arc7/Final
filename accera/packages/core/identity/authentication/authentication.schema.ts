import { z } from "zod";
const identifier = z.string().trim().min(3).max(320);
const secret = z.string().min(12).max(1024);
export const signUpSchema = z
  .object({
    provider: z.string().min(1).max(80),
    identifier,
    secret: secret.optional(),
  })
  .strict();
export const signInSchema = z
  .object({
    provider: z.string().min(1).max(80),
    identifier,
    secret: secret.optional(),
    verificationCode: z.string().min(4).max(32).optional(),
    deviceId: z.string().uuid().optional(),
  })
  .strict();
export const signOutSchema = z
  .object({ sessionId: z.string().uuid() })
  .strict();
export const verifyIdentitySchema = z
  .object({
    verificationId: z.string().uuid(),
    token: z.string().min(4).max(1024),
  })
  .strict();
export const refreshSessionSchema = z
  .object({ sessionId: z.string().uuid() })
  .strict();
export const passwordResetSchema = z
  .object({
    provider: z.string().min(1).max(80),
    identifier,
    resetToken: z.string().min(16).max(1024).optional(),
    newSecret: secret.optional(),
  })
  .strict();
