import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const user_preferenceIdSchema = z.string().uuid();
export const createUserPreferenceSchema = z.object({ id: user_preferenceIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateUserPreferenceSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
