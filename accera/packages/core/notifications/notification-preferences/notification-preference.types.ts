import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in notification-preference.schema.ts. */
export type NotificationPreferenceId = Brand<string, 'NotificationPreferenceId'>;
export type NotificationPreferenceStatus = EntityStatus;
export type NotificationPreference = Readonly<{ id: NotificationPreferenceId; status: NotificationPreferenceStatus; metadata: Metadata } & Timestamped>;
export type CreateNotificationPreferenceInput = Readonly<{ id?: NotificationPreferenceId; metadata?: Metadata }>;
export type UpdateNotificationPreferenceInput = Readonly<{ metadata?: Metadata }>;
