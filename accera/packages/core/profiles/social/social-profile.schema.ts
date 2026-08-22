import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const social_profileIdSchema = z.string().uuid();
export const createSocialProfileSchema = z.object({ id: social_profileIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateSocialProfileSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
