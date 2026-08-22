import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const user_settingIdSchema = z.string().uuid();
export const createUserSettingSchema = z.object({ id: user_settingIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateUserSettingSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
