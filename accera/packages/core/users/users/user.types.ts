import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in user.schema.ts. */
export type UserId = Brand<string, 'UserId'>;
export type UserStatus = EntityStatus;
export type User = Readonly<{ id: UserId; status: UserStatus; metadata: Metadata } & Timestamped>;
export type CreateUserInput = Readonly<{ id?: UserId; metadata?: Metadata }>;
export type UpdateUserInput = Readonly<{ metadata?: Metadata }>;
