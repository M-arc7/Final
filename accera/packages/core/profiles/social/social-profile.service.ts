import { CoreError } from '../../shared/errors';
import { createSocialProfile, transitionSocialProfileStatus } from './social-profile.entity';
import type { SocialProfileRepository } from './social-profile.repository';
import type { CreateSocialProfileInput, SocialProfile, SocialProfileId, SocialProfileStatus } from './social-profile.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class SocialProfileService {
  constructor(private readonly repository: SocialProfileRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: SocialProfileId): Promise<SocialProfile | null> { return this.repository.findById(id); }
  async create(input: CreateSocialProfileInput): Promise<SocialProfile> { return this.repository.insert(createSocialProfile(input, this.now())); }
  async changeStatus(id: SocialProfileId, status: SocialProfileStatus): Promise<SocialProfile> { const record = await this.repository.findById(id); if (!record) throw new CoreError('social-profile.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionSocialProfileStatus(record, status, this.now())); }
}
