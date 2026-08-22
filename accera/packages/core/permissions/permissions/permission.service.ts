import type { PermissionRepository } from "./permission.repository";
import type { Permission } from "./permission.types";
export class PermissionService {
  constructor(private readonly repository: PermissionRepository) {}
  async resolve(code: string): Promise<Permission | null> {
    const permission = await this.repository.findByCode(code);
    return permission?.status === "active" ? permission : null;
  }
}
