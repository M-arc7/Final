import { CoreError } from '../../shared/errors';
import { createProfessionalProfile, transitionProfessionalProfileStatus } from './professional-profile.entity';
import type { ProfessionalProfileRepository } from './professional-profile.repository';
import type { CreateProfessionalProfileInput, ProfessionalProfile, ProfessionalProfileId, ProfessionalProfileStatus } from './professional-profile.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class ProfessionalProfileService {
  constructor(private readonly repository: ProfessionalProfileRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: ProfessionalProfileId): Promise<ProfessionalProfile | null> { return this.repository.findById(id); }
  async create(input: CreateProfessionalProfileInput): Promise<ProfessionalProfile> { return this.repository.insert(createProfessionalProfile(input, this.now())); }
  async changeStatus(id: ProfessionalProfileId, status: ProfessionalProfileStatus): Promise<ProfessionalProfile> { const record = await this.repository.findById(id); if (!record) throw new CoreError('professional-profile.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionProfessionalProfileStatus(record, status, this.now())); }
}
