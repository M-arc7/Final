import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateAccountInput, Account, AccountStatus } from './account.types';

/** Pure account representation and invariants; no database or provider access. */
export const createAccount = (input: CreateAccountInput, now = new Date()): Account => ({ id: input.id ?? newId<'AccountId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionAccountStatus = (record: Account, status: AccountStatus, now = new Date()): Account => { invariant(canTransitionStatus(record.status, status), 'account.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
