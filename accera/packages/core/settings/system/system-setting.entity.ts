import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateSystemSettingInput, SystemSetting, SystemSettingStatus } from './system-setting.types';

/** Pure system-setting representation and invariants; no database or provider access. */
export const createSystemSetting = (input: CreateSystemSettingInput, now = new Date()): SystemSetting => ({ id: input.id ?? newId<'SystemSettingId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionSystemSettingStatus = (record: SystemSetting, status: SystemSettingStatus, now = new Date()): SystemSetting => { invariant(canTransitionStatus(record.status, status), 'system-setting.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
