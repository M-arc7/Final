import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type {
  RoleAssignment,
  RoleAssignmentInput,
} from "./role-assignment.types";
export const createRoleAssignment = (
  input: RoleAssignmentInput,
  now = new Date(),
): RoleAssignment => {
  invariant(
    !input.endsAt || input.endsAt > input.startsAt,
    "role_assignment.invalid_period",
    "Assignment end must follow start.",
  );
  invariant(
    input.scope.type === "platform" || Boolean(input.scope.organisationId),
    "role_assignment.missing_scope",
    "A non-platform role requires organisation scope.",
  );
  return {
    ...input,
    id: newId<"RoleAssignmentId">(),
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
};
export const isAssignmentEffective = (
  assignment: RoleAssignment,
  now = new Date(),
) =>
  assignment.status === "active" &&
  assignment.startsAt <= now &&
  (!assignment.endsAt || assignment.endsAt > now);
