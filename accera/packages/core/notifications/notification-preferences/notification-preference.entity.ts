import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateNotificationPreferenceInput, NotificationPreference, NotificationPreferenceStatus } from './notification-preference.types';

/** Pure notification-preference representation and invariants; no database or provider access. */
export const createNotificationPreference = (input: CreateNotificationPreferenceInput, now = new Date()): NotificationPreference => ({ id: input.id ?? newId<'NotificationPreferenceId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionNotificationPreferenceStatus = (record: NotificationPreference, status: NotificationPreferenceStatus, now = new Date()): NotificationPreference => { invariant(canTransitionStatus(record.status, status), 'notification-preference.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
