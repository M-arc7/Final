import type { RoleAssignmentRepository } from "./role-assignment.repository";
import {
  createRoleAssignment,
  isAssignmentEffective,
} from "./role-assignment.entity";
import type {
  RoleAssignment,
  RoleAssignmentInput,
} from "./role-assignment.types";
export class RoleAssignmentService {
  constructor(
    private readonly repository: RoleAssignmentRepository,
    private readonly now: () => Date = () => new Date(),
  ) {}
  async assign(input: RoleAssignmentInput): Promise<RoleAssignment> {
    return this.repository.save(createRoleAssignment(input, this.now()));
  }
  async effective(accountId: string, organisationId?: string) {
    return (
      await this.repository.listEffective(accountId, organisationId)
    ).filter((assignment) => isAssignmentEffective(assignment, this.now()));
  }
}
