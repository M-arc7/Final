import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const user_verificationIdSchema = z.string().uuid();
export const createUserVerificationSchema = z.object({ id: user_verificationIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateUserVerificationSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
