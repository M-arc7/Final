import { CoreError } from '../../shared/errors';
import type { SearchQueryRepository } from './search-query.repository';
import type { CreateSearchQueryInput, SearchQuery, SearchQueryId, SearchQueryStatus } from './search-query.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SearchQueryService {
  constructor(private readonly repository: SearchQueryRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SearchQueryId): Promise<SearchQuery | null> { return this.repository.findById(id); }
  async save(record: SearchQuery): Promise<SearchQuery> { return this.repository.replace(record); }
}
