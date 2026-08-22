import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreatePersonalProfileInput, PersonalProfile, PersonalProfileStatus } from './personal-profile.types';

/** Pure personal-profile representation and invariants; no database or provider access. */
export const createPersonalProfile = (input: CreatePersonalProfileInput, now = new Date()): PersonalProfile => ({ id: input.id ?? newId<'PersonalProfileId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionPersonalProfileStatus = (record: PersonalProfile, status: PersonalProfileStatus, now = new Date()): PersonalProfile => { invariant(canTransitionStatus(record.status, status), 'personal-profile.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
