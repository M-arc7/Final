import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in storage.schema.ts. */
export type StorageId = Brand<string, 'StorageId'>;
export type StorageStatus = EntityStatus;
export type Storage = Readonly<{ id: StorageId; status: StorageStatus; metadata: Metadata } & Timestamped>;
export type CreateStorageInput = Readonly<{ id?: StorageId; metadata?: Metadata }>;
export type UpdateStorageInput = Readonly<{ metadata?: Metadata }>;
