import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in compliance-event.schema.ts. */
export type ComplianceEventId = Brand<string, 'ComplianceEventId'>;
export type ComplianceEventStatus = EntityStatus;
export type ComplianceEvent = Readonly<{ id: ComplianceEventId; status: ComplianceEventStatus; metadata: Metadata } & Timestamped>;
export type CreateComplianceEventInput = Readonly<{ id?: ComplianceEventId; metadata?: Metadata }>;
export type UpdateComplianceEventInput = Readonly<{ metadata?: Metadata }>;
