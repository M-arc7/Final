import type { Repository } from '../../shared/repository';
import type { SearchIndex, SearchIndexId } from './search-index.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface SearchIndexRepository extends Repository<SearchIndexId, SearchIndex> {}
