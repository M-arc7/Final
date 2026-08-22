import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const uploadIdSchema = z.string().uuid();
export const createUploadSchema = z.object({ id: uploadIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateUploadSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
