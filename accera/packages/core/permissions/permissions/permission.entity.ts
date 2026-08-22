import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type { Permission } from "./permission.types";
export const createPermission = (
  code: string,
  description: string,
  now = new Date(),
): Permission => {
  invariant(
    /^[a-z][a-z0-9_.]*$/.test(code),
    "permission.invalid_code",
    "Permission code is invalid.",
  );
  return {
    id: newId<"PermissionId">(),
    code: code as Permission["code"],
    description,
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
};
