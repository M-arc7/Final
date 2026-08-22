import { z } from "zod";
export const createVerificationSchema = z
  .object({
    accountId: z.string().uuid(),
    purpose: z.enum(["identity", "email", "phone", "password_reset", "mfa"]),
    channel: z.string().min(1).max(80),
    expiresAt: z.coerce.date(),
    maxAttempts: z.number().int().min(1).max(10).optional(),
  })
  .strict();
export const verifyChallengeSchema = z
  .object({
    verificationId: z.string().uuid(),
    token: z.string().min(4).max(1024),
  })
  .strict();
