import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const notification_preferenceIdSchema = z.string().uuid();
export const createNotificationPreferenceSchema = z.object({ id: notification_preferenceIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateNotificationPreferenceSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
