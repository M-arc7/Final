import { CoreError } from '../../shared/errors';
import { createParticipant, transitionParticipantStatus } from './participant.entity';
import type { ParticipantRepository } from './participant.repository';
import type { CreateParticipantInput, Participant, ParticipantId, ParticipantStatus } from './participant.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class ParticipantService {
  constructor(private readonly repository: ParticipantRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: ParticipantId): Promise<Participant | null> { return this.repository.findById(id); }
  async create(input: CreateParticipantInput): Promise<Participant> { return this.repository.insert(createParticipant(input, this.now())); }
  async changeStatus(id: ParticipantId, status: ParticipantStatus): Promise<Participant> { const record = await this.repository.findById(id); if (!record) throw new CoreError('participant.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionParticipantStatus(record, status, this.now())); }
}
