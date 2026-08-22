import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const platform_settingIdSchema = z.string().uuid();
export const createPlatformSettingSchema = z.object({ id: platform_settingIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updatePlatformSettingSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
