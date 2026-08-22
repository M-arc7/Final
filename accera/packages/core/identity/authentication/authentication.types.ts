import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in authentication.schema.ts. */
export type AuthenticationId = Brand<string, 'AuthenticationId'>;
export type AuthenticationStatus = EntityStatus;
export type Authentication = Readonly<{ id: AuthenticationId; status: AuthenticationStatus; metadata: Metadata } & Timestamped>;
export type CreateAuthenticationInput = Readonly<{ id?: AuthenticationId; metadata?: Metadata }>;
export type UpdateAuthenticationInput = Readonly<{ metadata?: Metadata }>;
