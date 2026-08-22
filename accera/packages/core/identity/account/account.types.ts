import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in account.schema.ts. */
export type AccountId = Brand<string, 'AccountId'>;
export type AccountStatus = EntityStatus;
export type Account = Readonly<{ id: AccountId; status: AccountStatus; metadata: Metadata } & Timestamped>;
export type CreateAccountInput = Readonly<{ id?: AccountId; metadata?: Metadata }>;
export type UpdateAccountInput = Readonly<{ metadata?: Metadata }>;
