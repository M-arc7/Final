import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in session.schema.ts. */
export type SessionId = Brand<string, 'SessionId'>;
export type SessionStatus = EntityStatus;
export type Session = Readonly<{ id: SessionId; status: SessionStatus; metadata: Metadata } & Timestamped>;
export type CreateSessionInput = Readonly<{ id?: SessionId; metadata?: Metadata }>;
export type UpdateSessionInput = Readonly<{ metadata?: Metadata }>;
