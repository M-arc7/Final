import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateSearchIndexInput, SearchIndex, SearchIndexStatus } from './search-index.types';

/** Pure search-index representation and invariants; no database or provider access. */
export const createSearchIndex = (input: CreateSearchIndexInput, now = new Date()): SearchIndex => ({ id: input.id ?? newId<'SearchIndexId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionSearchIndexStatus = (record: SearchIndex, status: SearchIndexStatus, now = new Date()): SearchIndex => { invariant(canTransitionStatus(record.status, status), 'search-index.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
