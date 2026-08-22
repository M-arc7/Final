import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type {
  Account,
  AccountCreateInput,
  AccountStatus,
} from "./account.types";
const transitions: Readonly<Record<AccountStatus, readonly AccountStatus[]>> = {
  pending: ["active", "deactivated"],
  active: ["suspended", "locked", "deactivated"],
  suspended: ["active", "deactivated"],
  locked: ["active", "deactivated"],
  deactivated: [],
};
/** Pure one-account identity model. Roles and organisation membership are not account fields. */
export const createAccount = (
  input: AccountCreateInput,
  now = new Date(),
): Account => ({
  id: input.id ?? newId<"AccountId">(),
  identity: input.identity,
  status: "pending",
  metadata: input.metadata ?? {},
  createdAt: now,
  updatedAt: now,
});
export const transitionAccountStatus = (
  account: Account,
  next: AccountStatus,
  now = new Date(),
): Account => {
  invariant(
    transitions[account.status].includes(next),
    "account.invalid_status_transition",
    "The requested account lifecycle transition is not allowed.",
    { from: account.status, to: next },
  );
  return { ...account, status: next, updatedAt: now };
};
