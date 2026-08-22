import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreatePublicProfileInput, PublicProfile, PublicProfileStatus } from './public-profile.types';

/** Pure public-profile representation and invariants; no database or provider access. */
export const createPublicProfile = (input: CreatePublicProfileInput, now = new Date()): PublicProfile => ({ id: input.id ?? newId<'PublicProfileId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionPublicProfileStatus = (record: PublicProfile, status: PublicProfileStatus, now = new Date()): PublicProfile => { invariant(canTransitionStatus(record.status, status), 'public-profile.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
