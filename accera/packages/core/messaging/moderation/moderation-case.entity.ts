import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateModerationCaseInput, ModerationCase, ModerationCaseStatus } from './moderation-case.types';

/** Pure moderation-case representation and invariants; no database or provider access. */
export const createModerationCase = (input: CreateModerationCaseInput, now = new Date()): ModerationCase => ({ id: input.id ?? newId<'ModerationCaseId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionModerationCaseStatus = (record: ModerationCase, status: ModerationCaseStatus, now = new Date()): ModerationCase => { invariant(canTransitionStatus(record.status, status), 'moderation-case.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
