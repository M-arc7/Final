import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in search-index.schema.ts. */
export type SearchIndexId = Brand<string, 'SearchIndexId'>;
export type SearchIndexStatus = EntityStatus;
export type SearchIndex = Readonly<{ id: SearchIndexId; status: SearchIndexStatus; metadata: Metadata } & Timestamped>;
export type CreateSearchIndexInput = Readonly<{ id?: SearchIndexId; metadata?: Metadata }>;
export type UpdateSearchIndexInput = Readonly<{ metadata?: Metadata }>;
