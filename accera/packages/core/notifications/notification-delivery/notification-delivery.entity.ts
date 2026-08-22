import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateNotificationDeliveryInput, NotificationDelivery, NotificationDeliveryStatus } from './notification-delivery.types';

/** Pure notification-delivery representation and invariants; no database or provider access. */
export const createNotificationDelivery = (input: CreateNotificationDeliveryInput, now = new Date()): NotificationDelivery => ({ id: input.id ?? newId<'NotificationDeliveryId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionNotificationDeliveryStatus = (record: NotificationDelivery, status: NotificationDeliveryStatus, now = new Date()): NotificationDelivery => { invariant(canTransitionStatus(record.status, status), 'notification-delivery.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
