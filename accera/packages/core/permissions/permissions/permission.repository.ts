import type { Permission } from "./permission.types";
export interface PermissionRepository {
  findByCode(code: string): Promise<Permission | null>;
  save(permission: Permission): Promise<Permission>;
}
