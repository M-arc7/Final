import { CoreError } from '../../shared/errors';
import { createVerification, transitionVerificationStatus } from './verification.entity';
import type { VerificationRepository } from './verification.repository';
import type { CreateVerificationInput, Verification, VerificationId, VerificationStatus } from './verification.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class VerificationService {
  constructor(private readonly repository: VerificationRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: VerificationId): Promise<Verification | null> { return this.repository.findById(id); }
  async create(input: CreateVerificationInput): Promise<Verification> { return this.repository.insert(createVerification(input, this.now())); }
  async changeStatus(id: VerificationId, status: VerificationStatus): Promise<Verification> { const record = await this.repository.findById(id); if (!record) throw new CoreError('verification.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionVerificationStatus(record, status, this.now())); }
}
