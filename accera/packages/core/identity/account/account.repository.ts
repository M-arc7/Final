import type { Repository } from '../../shared/repository';
import type { Account, AccountId } from './account.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface AccountRepository extends Repository<AccountId, Account> {}
