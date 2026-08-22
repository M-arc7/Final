import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in upload.schema.ts. */
export type UploadId = Brand<string, 'UploadId'>;
export type UploadStatus = EntityStatus;
export type Upload = Readonly<{ id: UploadId; status: UploadStatus; metadata: Metadata } & Timestamped>;
export type CreateUploadInput = Readonly<{ id?: UploadId; metadata?: Metadata }>;
export type UpdateUploadInput = Readonly<{ metadata?: Metadata }>;
