import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const verificationIdSchema = z.string().uuid();
export const createVerificationSchema = z.object({ id: verificationIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateVerificationSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
