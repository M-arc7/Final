import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const personal_profileIdSchema = z.string().uuid();
export const createPersonalProfileSchema = z.object({ id: personal_profileIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updatePersonalProfileSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
