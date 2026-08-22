import type { Brand, Timestamped } from "../../shared/primitives";
export type PermissionId = Brand<string, "PermissionId">;
export type PermissionCode = string & {
  readonly __permissionCode: unique symbol;
};
export type Permission = Readonly<
  {
    id: PermissionId;
    code: PermissionCode;
    description: string;
    status: "active" | "inactive";
  } & Timestamped
>;
