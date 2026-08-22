import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateOrganisationMemberInput, OrganisationMember, OrganisationMemberStatus } from './organisation-member.types';

/** Pure organisation-member representation and invariants; no database or provider access. */
export const createOrganisationMember = (input: CreateOrganisationMemberInput, now = new Date()): OrganisationMember => ({ id: input.id ?? newId<'OrganisationMemberId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionOrganisationMemberStatus = (record: OrganisationMember, status: OrganisationMemberStatus, now = new Date()): OrganisationMember => { invariant(canTransitionStatus(record.status, status), 'organisation-member.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
