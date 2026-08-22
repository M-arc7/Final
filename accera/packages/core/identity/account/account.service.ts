import { CoreError } from '../../shared/errors';
import { createAccount, transitionAccountStatus } from './account.entity';
import type { AccountRepository } from './account.repository';
import type { CreateAccountInput, Account, AccountId, AccountStatus } from './account.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class AccountService {
  constructor(private readonly repository: AccountRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: AccountId): Promise<Account | null> { return this.repository.findById(id); }
  async create(input: CreateAccountInput): Promise<Account> { return this.repository.insert(createAccount(input, this.now())); }
  async changeStatus(id: AccountId, status: AccountStatus): Promise<Account> { const record = await this.repository.findById(id); if (!record) throw new CoreError('account.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionAccountStatus(record, status, this.now())); }
}
