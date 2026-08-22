import { CoreError } from '../../shared/errors';
import { createAuthentication, transitionAuthenticationStatus } from './authentication.entity';
import type { AuthenticationRepository } from './authentication.repository';
import type { CreateAuthenticationInput, Authentication, AuthenticationId, AuthenticationStatus } from './authentication.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class AuthenticationService {
  constructor(private readonly repository: AuthenticationRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: AuthenticationId): Promise<Authentication | null> { return this.repository.findById(id); }
  async create(input: CreateAuthenticationInput): Promise<Authentication> { return this.repository.insert(createAuthentication(input, this.now())); }
  async changeStatus(id: AuthenticationId, status: AuthenticationStatus): Promise<Authentication> { const record = await this.repository.findById(id); if (!record) throw new CoreError('authentication.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionAuthenticationStatus(record, status, this.now())); }
}
