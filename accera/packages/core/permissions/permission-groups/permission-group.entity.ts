import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type { PermissionGroup } from "./permission-group.types";
export const createPermissionGroup = (
  name: string,
  permissionCodes: readonly string[],
  now = new Date(),
): PermissionGroup => {
  invariant(
    name.trim().length > 0,
    "permission_group.name_required",
    "A permission group name is required.",
  );
  return {
    id: newId<"PermissionGroupId">(),
    name: name.trim(),
    permissionCodes: [...new Set(permissionCodes)],
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
};
