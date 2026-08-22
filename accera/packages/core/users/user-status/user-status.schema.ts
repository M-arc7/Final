import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const user_statusIdSchema = z.string().uuid();
export const createUserStatusSchema = z.object({ id: user_statusIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateUserStatusSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
