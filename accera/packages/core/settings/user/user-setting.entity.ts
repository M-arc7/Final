import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateUserSettingInput, UserSetting, UserSettingStatus } from './user-setting.types';

/** Pure user-setting representation and invariants; no database or provider access. */
export const createUserSetting = (input: CreateUserSettingInput, now = new Date()): UserSetting => ({ id: input.id ?? newId<'UserSettingId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionUserSettingStatus = (record: UserSetting, status: UserSettingStatus, now = new Date()): UserSetting => { invariant(canTransitionStatus(record.status, status), 'user-setting.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
