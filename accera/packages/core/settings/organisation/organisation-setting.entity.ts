import { invariant } from '../../shared/errors';
import { canTransitionStatus } from '../../shared/rules';
import { newId } from '../../shared/primitives';
import type { CreateOrganisationSettingInput, OrganisationSetting, OrganisationSettingStatus } from './organisation-setting.types';

/** Pure organisation-setting representation and invariants; no database or provider access. */
export const createOrganisationSetting = (input: CreateOrganisationSettingInput, now = new Date()): OrganisationSetting => ({ id: input.id ?? newId<'OrganisationSettingId'>(), status: 'active', metadata: input.metadata ?? {}, createdAt: now, updatedAt: now });
export const transitionOrganisationSettingStatus = (record: OrganisationSetting, status: OrganisationSettingStatus, now = new Date()): OrganisationSetting => { invariant(canTransitionStatus(record.status, status), 'organisation-setting.invalid_status_transition', 'The requested lifecycle transition is not allowed.', { from: record.status, to: status }); return { ...record, status, updatedAt: now }; };
