import type { Brand, Timestamped } from "../../shared/primitives";
export type PermissionGroupId = Brand<string, "PermissionGroupId">;
export type PermissionGroup = Readonly<
  {
    id: PermissionGroupId;
    name: string;
    permissionCodes: readonly string[];
    status: "active" | "inactive";
  } & Timestamped
>;
