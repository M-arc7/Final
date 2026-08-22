import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in notification-delivery.schema.ts. */
export type NotificationDeliveryId = Brand<string, 'NotificationDeliveryId'>;
export type NotificationDeliveryStatus = EntityStatus;
export type NotificationDelivery = Readonly<{ id: NotificationDeliveryId; status: NotificationDeliveryStatus; metadata: Metadata } & Timestamped>;
export type CreateNotificationDeliveryInput = Readonly<{ id?: NotificationDeliveryId; metadata?: Metadata }>;
export type UpdateNotificationDeliveryInput = Readonly<{ metadata?: Metadata }>;
