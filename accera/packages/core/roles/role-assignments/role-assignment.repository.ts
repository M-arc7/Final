import type { Repository } from '../../shared/repository';
import type { RoleAssignment, RoleAssignmentId } from './role-assignment.types';

/** Persistence port only. Database queries and adapter details live outside core. */
export interface RoleAssignmentRepository extends Repository<RoleAssignmentId, RoleAssignment> {}
