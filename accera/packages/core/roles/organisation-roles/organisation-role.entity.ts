import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateOrganisationRoleInput, OrganisationRole, OrganisationRoleStatus } from './organisation-role.types';

/** Pure organisation-role representation and invariants; no database or provider access. */
export const createOrganisationRole = (input: CreateOrganisationRoleInput, now = new Date()): OrganisationRole => ({ id: input.id ?? newId<'OrganisationRoleId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionOrganisationRoleStatus = (record: OrganisationRole, status: OrganisationRoleStatus, now = new Date()): OrganisationRole => { invariant(canTransitionStatus(record.status, status), 'organisation-role.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
