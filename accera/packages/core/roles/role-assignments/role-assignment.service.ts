import { CoreError } from '../../shared/errors';
import { createRoleAssignment, transitionRoleAssignmentStatus } from './role-assignment.entity';
import type { RoleAssignmentRepository } from './role-assignment.repository';
import type { CreateRoleAssignmentInput, RoleAssignment, RoleAssignmentId, RoleAssignmentStatus } from './role-assignment.types';

/** Use-case orchestration only. UI, HTTP and provider SDK concerns are forbidden here. */
export class RoleAssignmentService {
  constructor(private readonly repository: RoleAssignmentRepository, private readonly now: () => Date = () => new Date()) {}
  async get(id: RoleAssignmentId): Promise<RoleAssignment | null> { return this.repository.findById(id); }
  async create(input: CreateRoleAssignmentInput): Promise<RoleAssignment> { return this.repository.insert(createRoleAssignment(input, this.now())); }
  async changeStatus(id: RoleAssignmentId, status: RoleAssignmentStatus): Promise<RoleAssignment> { const record = await this.repository.findById(id); if (!record) throw new CoreError('role-assignment.not_found', 'The requested record does not exist.', { id }); return this.repository.replace(transitionRoleAssignmentStatus(record, status, this.now())); }
}
