import type { Repository } from '../../shared/repository';
import type { Participant, ParticipantId } from './participant.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface ParticipantRepository extends Repository<ParticipantId, Participant> {}
