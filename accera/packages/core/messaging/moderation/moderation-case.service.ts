import { CoreError } from '../../shared/errors';
import { createModerationCase, transitionModerationCaseStatus } from './moderation-case.entity';
import type { ModerationCaseRepository } from './moderation-case.repository';
import type { CreateModerationCaseInput, ModerationCase, ModerationCaseId, ModerationCaseStatus } from './moderation-case.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class ModerationCaseService {
  constructor(private readonly repository: ModerationCaseRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: ModerationCaseId): Promise<ModerationCase | null> { return this.repository.findById(id); }
  async create(input: CreateModerationCaseInput): Promise<ModerationCase> { return this.repository.insert(createModerationCase(input, this.now())); }
  async changeStatus(id: ModerationCaseId, status: ModerationCaseStatus): Promise<ModerationCase> { const record = await this.repository.findById(id); if (!record) throw new CoreError('moderation-case.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionModerationCaseStatus(record, status, this.now())); }
}
