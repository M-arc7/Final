import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const organisation_hierarchyIdSchema = z.string().uuid();
export const createOrganisationHierarchySchema = z.object({ id: organisation_hierarchyIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateOrganisationHierarchySchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
