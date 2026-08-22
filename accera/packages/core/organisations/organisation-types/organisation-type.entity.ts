import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateOrganisationTypeInput, OrganisationType, OrganisationTypeStatus } from './organisation-type.types';

/** Pure organisation-type representation and invariants; no database or provider access. */
export const createOrganisationType = (input: CreateOrganisationTypeInput, now = new Date()): OrganisationType => ({ id: input.id ?? newId<'OrganisationTypeId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionOrganisationTypeStatus = (record: OrganisationType, status: OrganisationTypeStatus, now = new Date()): OrganisationType => { invariant(canTransitionStatus(record.status, status), 'organisation-type.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
