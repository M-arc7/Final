import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in search-filter.schema.ts. */
export type SearchFilterId = Brand<string, 'SearchFilterId'>;
export type SearchFilterStatus = EntityStatus;
export type SearchFilter = Readonly<{ id: SearchFilterId; status: SearchFilterStatus; metadata: Metadata } & Timestamped>;
export type CreateSearchFilterInput = Readonly<{ id?: SearchFilterId; metadata?: Metadata }>;
export type UpdateSearchFilterInput = Readonly<{ metadata?: Metadata }>;
