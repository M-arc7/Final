import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateNotificationStatusInput, NotificationStatus, NotificationStatusStatus } from './notification-status.types';

/** Pure notification-status representation and invariants; no database or provider access. */
export const createNotificationStatus = (input: CreateNotificationStatusInput, now = new Date()): NotificationStatus => ({ id: input.id ?? newId<'NotificationStatusId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionNotificationStatusStatus = (record: NotificationStatus, status: NotificationStatusStatus, now = new Date()): NotificationStatus => { invariant(canTransitionStatus(record.status, status), 'notification-status.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
