import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const conversationIdSchema = z.string().uuid();
export const createConversationSchema = z.object({ id: conversationIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateConversationSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
