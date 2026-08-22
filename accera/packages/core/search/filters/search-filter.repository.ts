import type { Repository } from '../../shared/repository';
import type { SearchFilter, SearchFilterId } from './search-filter.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SearchFilterRepository extends Repository<SearchFilterId, SearchFilter> {}
