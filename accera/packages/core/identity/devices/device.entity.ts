import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateDeviceInput, Device, DeviceStatus } from './device.types';

/** Pure device representation and invariants; no database or provider access. */
export const createDevice = (input: CreateDeviceInput, now = new Date()): Device => ({ id: input.id ?? newId<'DeviceId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionDeviceStatus = (record: Device, status: DeviceStatus, now = new Date()): Device => { invariant(canTransitionStatus(record.status, status), 'device.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
