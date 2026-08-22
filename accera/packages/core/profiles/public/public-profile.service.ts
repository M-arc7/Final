import { CoreError } from '../../shared/errors';
import { createPublicProfile, transitionPublicProfileStatus } from './public-profile.entity';
import type { PublicProfileRepository } from './public-profile.repository';
import type { CreatePublicProfileInput, PublicProfile, PublicProfileId, PublicProfileStatus } from './public-profile.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class PublicProfileService {
  constructor(private readonly repository: PublicProfileRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: PublicProfileId): Promise<PublicProfile | null> { return this.repository.findById(id); }
  async create(input: CreatePublicProfileInput): Promise<PublicProfile> { return this.repository.insert(createPublicProfile(input, this.now())); }
  async changeStatus(id: PublicProfileId, status: PublicProfileStatus): Promise<PublicProfile> { const record = await this.repository.findById(id); if (!record) throw new CoreError('public-profile.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionPublicProfileStatus(record, status, this.now())); }
}
