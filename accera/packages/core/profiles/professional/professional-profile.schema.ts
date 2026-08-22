import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const professional_profileIdSchema = z.string().uuid();
export const createProfessionalProfileSchema = z.object({ id: professional_profileIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateProfessionalProfileSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
