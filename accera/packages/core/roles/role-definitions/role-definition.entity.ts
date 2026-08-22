import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type { RoleDefinition } from "./role-definition.types";
export const createRoleDefinition = (
  input: Omit<
    RoleDefinition,
    "id" | "version" | "status" | "createdAt" | "updatedAt"
  >,
  now = new Date(),
): RoleDefinition => {
  invariant(
    input.permissionCodes.every((code) => /^[a-z][a-z0-9_.]*$/.test(code)),
    "role_definition.invalid_permission",
    "Role definition has an invalid permission code.",
  );
  return {
    ...input,
    id: newId<"RoleDefinitionId">(),
    version: 1,
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
};
