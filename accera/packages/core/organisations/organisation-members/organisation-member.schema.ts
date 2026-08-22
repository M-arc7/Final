import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const organisation_memberIdSchema = z.string().uuid();
export const createOrganisationMemberSchema = z.object({ id: organisation_memberIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateOrganisationMemberSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
