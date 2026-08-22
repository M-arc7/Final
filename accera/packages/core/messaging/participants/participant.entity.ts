import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateParticipantInput, Participant, ParticipantStatus } from './participant.types';

/** Pure participant representation and invariants; no database or provider access. */
export const createParticipant = (input: CreateParticipantInput, now = new Date()): Participant => ({ id: input.id ?? newId<'ParticipantId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionParticipantStatus = (record: Participant, status: ParticipantStatus, now = new Date()): Participant => { invariant(canTransitionStatus(record.status, status), 'participant.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
