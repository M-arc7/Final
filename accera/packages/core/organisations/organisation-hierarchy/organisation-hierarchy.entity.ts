import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateOrganisationHierarchyInput, OrganisationHierarchy, OrganisationHierarchyStatus } from './organisation-hierarchy.types';

/** Pure organisation-hierarchy representation and invariants; no database or provider access. */
export const createOrganisationHierarchy = (input: CreateOrganisationHierarchyInput, now = new Date()): OrganisationHierarchy => ({ id: input.id ?? newId<'OrganisationHierarchyId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionOrganisationHierarchyStatus = (record: OrganisationHierarchy, status: OrganisationHierarchyStatus, now = new Date()): OrganisationHierarchy => { invariant(canTransitionStatus(record.status, status), 'organisation-hierarchy.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
