import type { Repository } from '../../shared/repository';
import type { OrganisationMember, OrganisationMemberId } from './organisation-member.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface OrganisationMemberRepository extends Repository<OrganisationMemberId, OrganisationMember> {}
