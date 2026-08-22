import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const search_queryIdSchema = z.string().uuid();
export const createSearchQuerySchema = z.object({ id: search_queryIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateSearchQuerySchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
