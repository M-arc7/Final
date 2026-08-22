import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in notification-status.schema.ts. */
export type NotificationStatusId = Brand<string, 'NotificationStatusId'>;
export type NotificationStatusStatus = EntityStatus;
export type NotificationStatus = Readonly<{ id: NotificationStatusId; status: NotificationStatusStatus; metadata: Metadata } & Timestamped>;
export type CreateNotificationStatusInput = Readonly<{ id?: NotificationStatusId; metadata?: Metadata }>;
export type UpdateNotificationStatusInput = Readonly<{ metadata?: Metadata }>;
