import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreatePlatformSettingInput, PlatformSetting, PlatformSettingStatus } from './platform-setting.types';

/** Pure platform-setting representation and invariants; no database or provider access. */
export const createPlatformSetting = (input: CreatePlatformSettingInput, now = new Date()): PlatformSetting => ({ id: input.id ?? newId<'PlatformSettingId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionPlatformSettingStatus = (record: PlatformSetting, status: PlatformSettingStatus, now = new Date()): PlatformSetting => { invariant(canTransitionStatus(record.status, status), 'platform-setting.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
