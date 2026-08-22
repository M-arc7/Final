import type {
  Account,
  AccountId,
  AccountIdentity,
  AccountStatus,
} from "./account.types";
/** Persistence port only; it contains no authorization decisions or provider SDK calls. */
export interface AccountRepository {
  create(account: Account): Promise<Account>;
  findById(id: AccountId): Promise<Account | null>;
  findByIdentity(identity: AccountIdentity): Promise<Account | null>;
  update(account: Account): Promise<Account>;
  existsByIdentity(identity: AccountIdentity): Promise<boolean>;
  changeStatus(id: AccountId, status: AccountStatus): Promise<Account>;
}
