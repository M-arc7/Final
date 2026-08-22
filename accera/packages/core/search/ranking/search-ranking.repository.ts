import type { Repository } from '../../shared/repository';
import type { SearchRanking, SearchRankingId } from './search-ranking.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SearchRankingRepository extends Repository<SearchRankingId, SearchRanking> {}
