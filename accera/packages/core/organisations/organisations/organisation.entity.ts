import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateOrganisationInput, Organisation, OrganisationStatus } from './organisation.types';

/** Pure organisation representation and invariants; no database or provider access. */
export const createOrganisation = (input: CreateOrganisationInput, now = new Date()): Organisation => ({ id: input.id ?? newId<'OrganisationId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionOrganisationStatus = (record: Organisation, status: OrganisationStatus, now = new Date()): Organisation => { invariant(canTransitionStatus(record.status, status), 'organisation.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
