import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const organisation_roleIdSchema = z.string().uuid();
export const createOrganisationRoleSchema = z.object({ id: organisation_roleIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateOrganisationRoleSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
