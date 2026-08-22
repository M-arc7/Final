import type { Brand, EntityStatus, Metadata, Timestamped } from '../../shared/primitives';

/** Type contracts only; runtime validation belongs in moderation-case.schema.ts. */
export type ModerationCaseId = Brand<string, 'ModerationCaseId'>;
export type ModerationCaseStatus = EntityStatus;
export type ModerationCase = Readonly<{ id: ModerationCaseId; status: ModerationCaseStatus; metadata: Metadata } & Timestamped>;
export type CreateModerationCaseInput = Readonly<{ id?: ModerationCaseId; metadata?: Metadata }>;
export type UpdateModerationCaseInput = Readonly<{ metadata?: Metadata }>;
