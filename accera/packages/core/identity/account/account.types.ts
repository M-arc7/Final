import type { Brand, Metadata, Timestamped } from "../../shared/primitives";
export type AccountId = Brand<string, "AccountId">;
export type AccountStatus =
  | "pending"
  | "active"
  | "suspended"
  | "locked"
  | "deactivated";
export type AccountIdentity = Readonly<{
  provider: string;
  providerSubject: string;
}>;
export type Account = Readonly<
  {
    id: AccountId;
    identity: AccountIdentity;
    status: AccountStatus;
    metadata: Metadata;
  } & Timestamped
>;
export type AccountCreateInput = Readonly<{
  id?: AccountId;
  identity: AccountIdentity;
  metadata?: Metadata;
}>;
export type AccountUpdateInput = Readonly<{ metadata?: Metadata }>;
export type AccountSummary = Readonly<
  Pick<Account, "id" | "status" | "createdAt">
>;
