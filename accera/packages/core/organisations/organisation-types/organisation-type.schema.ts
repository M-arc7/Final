import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const organisation_typeIdSchema = z.string().uuid();
export const createOrganisationTypeSchema = z.object({ id: organisation_typeIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateOrganisationTypeSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
