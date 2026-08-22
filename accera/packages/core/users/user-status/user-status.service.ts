import { CoreError } from '../../shared/errors';
import { createUserStatus, transitionUserStatusStatus } from './user-status.entity';
import type { UserStatusRepository } from './user-status.repository';
import type { CreateUserStatusInput, UserStatus, UserStatusId, UserStatusStatus } from './user-status.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class UserStatusService {
  constructor(private readonly repository: UserStatusRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: UserStatusId): Promise<UserStatus | null> { return this.repository.findById(id); }
  async create(input: CreateUserStatusInput): Promise<UserStatus> { return this.repository.insert(createUserStatus(input, this.now())); }
  async changeStatus(id: UserStatusId, status: UserStatusStatus): Promise<UserStatus> { const record = await this.repository.findById(id); if (!record) throw new CoreError('user-status.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionUserStatusStatus(record, status, this.now())); }
}
