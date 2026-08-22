import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateRoleDefinitionInput, RoleDefinition, RoleDefinitionStatus } from './role-definition.types';

/** Pure role-definition representation and invariants; no database or provider access. */
export const createRoleDefinition = (input: CreateRoleDefinitionInput, now = new Date()): RoleDefinition => ({ id: input.id ?? newId<'RoleDefinitionId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionRoleDefinitionStatus = (record: RoleDefinition, status: RoleDefinitionStatus, now = new Date()): RoleDefinition => { invariant(canTransitionStatus(record.status, status), 'role-definition.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
