import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in user-status.schema.ts. */
export type UserStatusId = Brand<string, 'UserStatusId'>;
export type UserStatusStatus = EntityStatus;
export type UserStatus = Readonly<{ id: UserStatusId; status: UserStatusStatus; metadata: Metadata } & Timestamped>;
export type CreateUserStatusInput = Readonly<{ id?: UserStatusId; metadata?: Metadata }>;
export type UpdateUserStatusInput = Readonly<{ metadata?: Metadata }>;
