import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in notification-type.schema.ts. */
export type NotificationTypeId = Brand<string, 'NotificationTypeId'>;
export type NotificationTypeStatus = EntityStatus;
export type NotificationType = Readonly<{ id: NotificationTypeId; status: NotificationTypeStatus; metadata: Metadata } & Timestamped>;
export type CreateNotificationTypeInput = Readonly<{ id?: NotificationTypeId; metadata?: Metadata }>;
export type UpdateNotificationTypeInput = Readonly<{ metadata?: Metadata }>;
