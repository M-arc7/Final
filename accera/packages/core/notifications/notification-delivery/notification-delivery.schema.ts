import { z } from 'zod';

/** Runtime input validation only; this module has no persistence access. */
export const notification_deliveryIdSchema = z.string().uuid();
export const createNotificationDeliverySchema = z.object({ id: notification_deliveryIdSchema.optional(), metadata: z.record(z.unknown()).default({}) }).strict();
export const updateNotificationDeliverySchema = z.object({ metadata: z.record(z.unknown()).optional() }).strict();
