import type { Brand, Timestamped } from "../../shared/primitives";
import type { RoleDefinitionId, RoleScope } from "../role-definitions";
export type RoleAssignmentId = Brand<string, "RoleAssignmentId">;
export type RoleAssignmentScope = Readonly<{
  type: RoleScope;
  organisationId?: string;
  resourceId?: string;
}>;
export type RoleAssignment = Readonly<
  {
    id: RoleAssignmentId;
    accountId: string;
    roleDefinitionId: RoleDefinitionId;
    scope: RoleAssignmentScope;
    status: "active" | "inactive";
    startsAt: Date;
    endsAt?: Date;
  } & Timestamped
>;
export type RoleAssignmentInput = Readonly<
  Omit<RoleAssignment, "id" | "status" | "createdAt" | "updatedAt">
>;
