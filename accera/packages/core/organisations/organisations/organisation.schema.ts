import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const organisationIdSchema = z.string().uuid();
export const createOrganisationSchema = z.object({ id: organisationIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateOrganisationSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
