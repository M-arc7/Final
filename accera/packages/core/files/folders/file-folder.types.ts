import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in file-folder.schema.ts. */
export type FileFolderId = Brand<string, 'FileFolderId'>;
export type FileFolderStatus = EntityStatus;
export type FileFolder = Readonly<{ id: FileFolderId; status: FileFolderStatus; metadata: Metadata } & Timestamped>;
export type CreateFileFolderInput = Readonly<{ id?: FileFolderId; metadata?: Metadata }>;
export type UpdateFileFolderInput = Readonly<{ metadata?: Metadata }>;
