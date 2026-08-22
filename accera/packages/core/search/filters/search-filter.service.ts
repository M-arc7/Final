import { CoreError } from '../../shared/errors';
import type { SearchFilterRepository } from './search-filter.repository';
import type { CreateSearchFilterInput, SearchFilter, SearchFilterId, SearchFilterStatus } from './search-filter.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SearchFilterService {
  constructor(private readonly repository: SearchFilterRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SearchFilterId): Promise<SearchFilter | null> { return this.repository.findById(id); }
  async save(record: SearchFilter): Promise<SearchFilter> { return this.repository.replace(record); }
}
