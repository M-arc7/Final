import { CoreError } from '../../shared/errors';
import type { SearchRankingRepository } from './search-ranking.repository';
import type { CreateSearchRankingInput, SearchRanking, SearchRankingId, SearchRankingStatus } from './search-ranking.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SearchRankingService {
  constructor(private readonly repository: SearchRankingRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SearchRankingId): Promise<SearchRanking | null> { return this.repository.findById(id); }
  async save(record: SearchRanking): Promise<SearchRanking> { return this.repository.replace(record); }
}
