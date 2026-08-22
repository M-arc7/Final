import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in role-definition.schema.ts. */
export type RoleDefinitionId = Brand<string, 'RoleDefinitionId'>;
export type RoleDefinitionStatus = EntityStatus;
export type RoleDefinition = Readonly<{ id: RoleDefinitionId; status: RoleDefinitionStatus; metadata: Metadata } & Timestamped>;
export type CreateRoleDefinitionInput = Readonly<{ id?: RoleDefinitionId; metadata?: Metadata }>;
export type UpdateRoleDefinitionInput = Readonly<{ metadata?: Metadata }>;
