import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in role-assignment.schema.ts. */
export type RoleAssignmentId = Brand<string, 'RoleAssignmentId'>;
export type RoleAssignmentStatus = EntityStatus;
export type RoleAssignment = Readonly<{ id: RoleAssignmentId; status: RoleAssignmentStatus; metadata: Metadata } & Timestamped>;
export type CreateRoleAssignmentInput = Readonly<{ id?: RoleAssignmentId; metadata?: Metadata }>;
export type UpdateRoleAssignmentInput = Readonly<{ metadata?: Metadata }>;
