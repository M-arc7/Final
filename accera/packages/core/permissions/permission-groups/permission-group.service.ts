import type { PermissionGroupRepository } from "./permission-group.repository";
import type { PermissionGroup } from "./permission-group.types";
export class PermissionGroupService {
  constructor(private readonly repository: PermissionGroupRepository) {}
  async resolve(id: string): Promise<PermissionGroup | null> {
    const group = await this.repository.findById(id);
    return group?.status === "active" ? group : null;
  }
}
