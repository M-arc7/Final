import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateNotificationTypeInput, NotificationType, NotificationTypeStatus } from './notification-type.types';

/** Pure notification-type representation and invariants; no database or provider access. */
export const createNotificationType = (input: CreateNotificationTypeInput, now = new Date()): NotificationType => ({ id: input.id ?? newId<'NotificationTypeId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionNotificationTypeStatus = (record: NotificationType, status: NotificationTypeStatus, now = new Date()): NotificationType => { invariant(canTransitionStatus(record.status, status), 'notification-type.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
