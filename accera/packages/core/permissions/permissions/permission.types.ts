import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in permission.schema.ts. */
export type PermissionId = Brand<string, 'PermissionId'>;
export type PermissionStatus = EntityStatus;
export type Permission = Readonly<{ id: PermissionId; status: PermissionStatus; metadata: Metadata } & Timestamped>;
export type CreatePermissionInput = Readonly<{ id?: PermissionId; metadata?: Metadata }>;
export type UpdatePermissionInput = Readonly<{ metadata?: Metadata }>;
