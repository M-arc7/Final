import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const message_attachmentIdSchema = z.string().uuid();
export const createMessageAttachmentSchema = z.object({ id: message_attachmentIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateMessageAttachmentSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
