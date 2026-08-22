import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const notification_typeIdSchema = z.string().uuid();
export const createNotificationTypeSchema = z.object({ id: notification_typeIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateNotificationTypeSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
