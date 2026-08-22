import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in file-permission.schema.ts. */
export type FilePermissionId = Brand<string, 'FilePermissionId'>;
export type FilePermissionStatus = EntityStatus;
export type FilePermission = Readonly<{ id: FilePermissionId; status: FilePermissionStatus; metadata: Metadata } & Timestamped>;
export type CreateFilePermissionInput = Readonly<{ id?: FilePermissionId; metadata?: Metadata }>;
export type UpdateFilePermissionInput = Readonly<{ metadata?: Metadata }>;
