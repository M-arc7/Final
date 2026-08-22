import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const storageIdSchema = z.string().uuid();
export const createStorageSchema = z.object({ id: storageIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateStorageSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
