import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateEntitlementInput, Entitlement, EntitlementStatus } from './entitlement.types';

/** Pure entitlement representation and invariants; no database or provider access. */
export const createEntitlement = (input: CreateEntitlementInput, now = new Date()): Entitlement => ({ id: input.id ?? newId<'EntitlementId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionEntitlementStatus = (record: Entitlement, status: EntitlementStatus, now = new Date()): Entitlement => { invariant(canTransitionStatus(record.status, status), 'entitlement.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
