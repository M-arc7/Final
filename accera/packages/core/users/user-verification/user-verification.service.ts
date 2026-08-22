import { CoreError } from '../../shared/errors';
import { createUserVerification, transitionUserVerificationStatus } from './user-verification.entity';
import type { UserVerificationRepository } from './user-verification.repository';
import type { CreateUserVerificationInput, UserVerification, UserVerificationId, UserVerificationStatus } from './user-verification.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class UserVerificationService {
  constructor(private readonly repository: UserVerificationRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: UserVerificationId): Promise<UserVerification | null> { return this.repository.findById(id); }
  async create(input: CreateUserVerificationInput): Promise<UserVerification> { return this.repository.insert(createUserVerification(input, this.now())); }
  async changeStatus(id: UserVerificationId, status: UserVerificationStatus): Promise<UserVerification> { const record = await this.repository.findById(id); if (!record) throw new CoreError('user-verification.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionUserVerificationStatus(record, status, this.now())); }
}
