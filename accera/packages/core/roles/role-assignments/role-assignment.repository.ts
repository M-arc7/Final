import type { RoleAssignment } from "./role-assignment.types";
export interface RoleAssignmentRepository {
  save(assignment: RoleAssignment): Promise<RoleAssignment>;
  listEffective(
    accountId: string,
    organisationId?: string,
  ): Promise<readonly RoleAssignment[]>;
}
