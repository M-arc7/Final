import { CoreError } from '../../shared/errors';
import { createSearchIndex, transitionSearchIndexStatus } from './search-index.entity';
import type { SearchIndexRepository } from './search-index.repository';
import type { CreateSearchIndexInput, SearchIndex, SearchIndexId, SearchIndexStatus } from './search-index.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SearchIndexService {
  constructor(private readonly repository: SearchIndexRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SearchIndexId): Promise<SearchIndex | null> { return this.repository.findById(id); }
  async create(input: CreateSearchIndexInput): Promise<SearchIndex> { return this.repository.insert(createSearchIndex(input, this.now())); }
  async changeStatus(id: SearchIndexId, status: SearchIndexStatus): Promise<SearchIndex> { const record = await this.repository.findById(id); if (!record) throw new CoreError('search-index.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionSearchIndexStatus(record, status, this.now())); }
}
