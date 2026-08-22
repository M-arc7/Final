import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const sessionIdSchema = z.string().uuid();
export const createSessionSchema = z.object({ id: sessionIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateSessionSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
