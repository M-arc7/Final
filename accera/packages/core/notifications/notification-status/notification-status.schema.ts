import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const notification_statusIdSchema = z.string().uuid();
export const createNotificationStatusSchema = z.object({ id: notification_statusIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateNotificationStatusSchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
