import type { PermissionGroup } from "./permission-group.types";
export interface PermissionGroupRepository {
  findById(id: string): Promise<PermissionGroup | null>;
  save(group: PermissionGroup): Promise<PermissionGroup>;
}
