import { CoreError } from '../../shared/errors';
import { createUser, transitionUserStatus } from './user.entity';
import type { UserRepository } from './user.repository';
import type { CreateUserInput, User, UserId, UserStatus } from './user.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class UserService {
  constructor(private readonly repository: UserRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: UserId): Promise<User | null> { return this.repository.findById(id); }
  async create(input: CreateUserInput): Promise<User> { return this.repository.insert(createUser(input, this.now())); }
  async changeStatus(id: UserId, status: UserStatus): Promise<User> { const record = await this.repository.findById(id); if (!record) throw new CoreError('user.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionUserStatus(record, status, this.now())); }
}
