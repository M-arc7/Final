import { CoreError } from '../../shared/errors';
import { createUserPreference, transitionUserPreferenceStatus } from './user-preference.entity';
import type { UserPreferenceRepository } from './user-preference.repository';
import type { CreateUserPreferenceInput, UserPreference, UserPreferenceId, UserPreferenceStatus } from './user-preference.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class UserPreferenceService {
  constructor(private readonly repository: UserPreferenceRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: UserPreferenceId): Promise<UserPreference | null> { return this.repository.findById(id); }
  async create(input: CreateUserPreferenceInput): Promise<UserPreference> { return this.repository.insert(createUserPreference(input, this.now())); }
  async changeStatus(id: UserPreferenceId, status: UserPreferenceStatus): Promise<UserPreference> { const record = await this.repository.findById(id); if (!record) throw new CoreError('user-preference.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionUserPreferenceStatus(record, status, this.now())); }
}
