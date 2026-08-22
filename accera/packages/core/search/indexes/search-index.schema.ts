import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const search_indexIdSchema = z.string().uuid();
export const createSearchIndexSchema = z.object({ id: search_indexIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateSearchIndexSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
