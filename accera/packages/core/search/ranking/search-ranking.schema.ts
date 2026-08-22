import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const search_rankingIdSchema = z.string().uuid();
export const createSearchRankingSchema = z.object({ id: search_rankingIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateSearchRankingSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
