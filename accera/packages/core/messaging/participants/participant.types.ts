import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in participant.schema.ts. */
export type ParticipantId = Brand<string, 'ParticipantId'>;
export type ParticipantStatus = EntityStatus;
export type Participant = Readonly<{ id: ParticipantId; status: ParticipantStatus; metadata: Metadata } & Timestamped>;
export type CreateParticipantInput = Readonly<{ id?: ParticipantId; metadata?: Metadata }>;
export type UpdateParticipantInput = Readonly<{ metadata?: Metadata }>;
