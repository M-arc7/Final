import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateSocialProfileInput, SocialProfile, SocialProfileStatus } from './social-profile.types';

/** Pure social-profile representation and invariants; no database or provider access. */
export const createSocialProfile = (input: CreateSocialProfileInput, now = new Date()): SocialProfile => ({ id: input.id ?? newId<'SocialProfileId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionSocialProfileStatus = (record: SocialProfile, status: SocialProfileStatus, now = new Date()): SocialProfile => { invariant(canTransitionStatus(record.status, status), 'social-profile.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
