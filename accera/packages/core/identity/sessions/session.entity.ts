import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateSessionInput, Session, SessionStatus } from './session.types';

/** Pure session representation and invariants; no database or provider access. */
export const createSession = (input: CreateSessionInput, now = new Date()): Session => ({ id: input.id ?? newId<'SessionId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionSessionStatus = (record: Session, status: SessionStatus, now = new Date()): Session => { invariant(canTransitionStatus(record.status, status), 'session.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
