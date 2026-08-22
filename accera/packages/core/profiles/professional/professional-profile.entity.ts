import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateProfessionalProfileInput, ProfessionalProfile, ProfessionalProfileStatus } from './professional-profile.types';

/** Pure professional-profile representation and invariants; no database or provider access. */
export const createProfessionalProfile = (input: CreateProfessionalProfileInput, now = new Date()): ProfessionalProfile => ({ id: input.id ?? newId<'ProfessionalProfileId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionProfessionalProfileStatus = (record: ProfessionalProfile, status: ProfessionalProfileStatus, now = new Date()): ProfessionalProfile => { invariant(canTransitionStatus(record.status, status), 'professional-profile.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
