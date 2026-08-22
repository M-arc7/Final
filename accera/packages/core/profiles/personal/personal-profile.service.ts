import { CoreError } from '../../shared/errors';
import { createPersonalProfile, transitionPersonalProfileStatus } from './personal-profile.entity';
import type { PersonalProfileRepository } from './personal-profile.repository';
import type { CreatePersonalProfileInput, PersonalProfile, PersonalProfileId, PersonalProfileStatus } from './personal-profile.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class PersonalProfileService {
  constructor(private readonly repository: PersonalProfileRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: PersonalProfileId): Promise<PersonalProfile | null> { return this.repository.findById(id); }
  async create(input: CreatePersonalProfileInput): Promise<PersonalProfile> { return this.repository.insert(createPersonalProfile(input, this.now())); }
  async changeStatus(id: PersonalProfileId, status: PersonalProfileStatus): Promise<PersonalProfile> { const record = await this.repository.findById(id); if (!record) throw new CoreError('personal-profile.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionPersonalProfileStatus(record, status, this.now())); }
}
