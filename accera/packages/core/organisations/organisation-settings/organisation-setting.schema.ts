import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const organisation_settingIdSchema = z.string().uuid();
export const createOrganisationSettingSchema = z.object({ id: organisation_settingIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateOrganisationSettingSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
