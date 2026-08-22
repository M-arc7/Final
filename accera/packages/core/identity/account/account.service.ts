import { CoreError } from "../../shared/errors";
import { createAccount, transitionAccountStatus } from "./account.entity";
import type { AccountRepository } from "./account.repository";
import type {
  Account,
  AccountCreateInput,
  AccountId,
  AccountStatus,
} from "./account.types";
/** Account lifecycle use cases. This service has no organisation role or permission logic. */
export class AccountService {
  constructor(
    private readonly repository: AccountRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}

  async create(input: AccountCreateInput): Promise<Account> {
    if (await this.repository.existsByIdentity(input.identity)) {
      throw new CoreError(
        "account.identity_exists",
        "An account cannot be created for this identity.",
        {},
      );
    }
    return this.repository.create(createAccount(input, this.now()));
  }

  async get(id: AccountId): Promise<Account | null> {
    return this.repository.findById(id);
  }
  async getByIdentity(identity: Account["identity"]): Promise<Account | null> {
    return this.repository.findByIdentity(identity);
  }
  async activate(id: AccountId): Promise<Account> {
    return this.changeStatus(id, "active");
  }
  async deactivate(id: AccountId): Promise<Account> {
    return this.changeStatus(id, "deactivated");
  }

  async changeStatus(id: AccountId, status: AccountStatus): Promise<Account> {
    const account = await this.repository.findById(id);
    if (!account)
      throw new CoreError(
        "account.not_found",
        "The requested account does not exist.",
        {},
      );
    return this.repository.update(
      transitionAccountStatus(account, status, this.now()),
    );
  }
}
