import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in search-ranking.schema.ts. */
export type SearchRankingId = Brand<string, 'SearchRankingId'>;
export type SearchRankingStatus = EntityStatus;
export type SearchRanking = Readonly<{ id: SearchRankingId; status: SearchRankingStatus; metadata: Metadata } & Timestamped>;
export type CreateSearchRankingInput = Readonly<{ id?: SearchRankingId; metadata?: Metadata }>;
export type UpdateSearchRankingInput = Readonly<{ metadata?: Metadata }>;
