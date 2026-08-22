import type { Repository } from '../../shared/repository';
import type { ModerationCase, ModerationCaseId } from './moderation-case.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface ModerationCaseRepository extends Repository<ModerationCaseId, ModerationCase> {}
