import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type { SystemRole, SystemRoleCode } from "./system-role.types";
export const createSystemRole = (
  code: SystemRoleCode,
  name: string,
  privileged: boolean,
  now = new Date(),
): SystemRole => {
  invariant(
    name.trim().length > 0,
    "system_role.name_required",
    "A system role name is required.",
  );
  return {
    id: newId<"SystemRoleId">(),
    code,
    name: name.trim(),
    privileged,
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
};
