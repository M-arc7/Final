import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in file-metadata.schema.ts. */
export type FileMetadataId = Brand<string, 'FileMetadataId'>;
export type FileMetadataStatus = EntityStatus;
export type FileMetadata = Readonly<{ id: FileMetadataId; status: FileMetadataStatus; metadata: Metadata } & Timestamped>;
export type CreateFileMetadataInput = Readonly<{ id?: FileMetadataId; metadata?: Metadata }>;
export type UpdateFileMetadataInput = Readonly<{ metadata?: Metadata }>;
