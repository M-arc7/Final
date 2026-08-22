import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateUserPreferenceInput, UserPreference, UserPreferenceStatus } from './user-preference.types';

/** Pure user-preference representation and invariants; no database or provider access. */
export const createUserPreference = (input: CreateUserPreferenceInput, now = new Date()): UserPreference => ({ id: input.id ?? newId<'UserPreferenceId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionUserPreferenceStatus = (record: UserPreference, status: UserPreferenceStatus, now = new Date()): UserPreference => { invariant(canTransitionStatus(record.status, status), 'user-preference.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
