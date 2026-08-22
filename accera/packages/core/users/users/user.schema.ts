import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const userIdSchema = z.string().uuid();
export const createUserSchema = z.object({ id: userIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateUserSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
