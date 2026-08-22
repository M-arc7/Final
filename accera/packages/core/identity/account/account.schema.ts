import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const accountIdSchema = z.string().uuid();
export const createAccountSchema = z.object({ id: accountIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateAccountSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
