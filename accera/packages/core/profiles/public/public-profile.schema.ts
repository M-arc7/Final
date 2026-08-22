import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const public_profileIdSchema = z.string().uuid();
export const createPublicProfileSchema = z.object({ id: public_profileIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updatePublicProfileSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
