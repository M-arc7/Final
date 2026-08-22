import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in permission-group.schema.ts. */
export type PermissionGroupId = Brand<string, 'PermissionGroupId'>;
export type PermissionGroupStatus = EntityStatus;
export type PermissionGroup = Readonly<{ id: PermissionGroupId; status: PermissionGroupStatus; metadata: Metadata } & Timestamped>;
export type CreatePermissionGroupInput = Readonly<{ id?: PermissionGroupId; metadata?: Metadata }>;
export type UpdatePermissionGroupInput = Readonly<{ metadata?: Metadata }>;
