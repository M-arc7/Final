import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in permission-check.schema.ts. */
export type PermissionCheckId = Brand<string, 'PermissionCheckId'>;
export type PermissionCheckStatus = EntityStatus;
export type PermissionCheck = Readonly<{ id: PermissionCheckId; status: PermissionCheckStatus; metadata: Metadata } & Timestamped>;
export type CreatePermissionCheckInput = Readonly<{ id?: PermissionCheckId; metadata?: Metadata }>;
export type UpdatePermissionCheckInput = Readonly<{ metadata?: Metadata }>;
