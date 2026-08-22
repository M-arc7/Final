import type { Repository } from '../../shared/repository';
import type { SearchQuery, SearchQueryId } from './search-query.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SearchQueryRepository extends Repository<SearchQueryId, SearchQuery> {}
