import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const search_filterIdSchema = z.string().uuid();
export const createSearchFilterSchema = z.object({ id: search_filterIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateSearchFilterSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
