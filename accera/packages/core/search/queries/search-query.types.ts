import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in search-query.schema.ts. */
export type SearchQueryId = Brand<string, 'SearchQueryId'>;
export type SearchQueryStatus = EntityStatus;
export type SearchQuery = Readonly<{ id: SearchQueryId; status: SearchQueryStatus; metadata: Metadata } & Timestamped>;
export type CreateSearchQueryInput = Readonly<{ id?: SearchQueryId; metadata?: Metadata }>;
export type UpdateSearchQueryInput = Readonly<{ metadata?: Metadata }>;
