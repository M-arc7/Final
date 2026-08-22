import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const messageIdSchema = z.string().uuid();
export const createMessageSchema = z.object({ id: messageIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateMessageSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
