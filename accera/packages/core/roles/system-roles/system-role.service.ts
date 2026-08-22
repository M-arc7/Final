import { CoreError } from "../../shared/errors";
import type { SystemRoleRepository } from "./system-role.repository";
import type { SystemRole } from "./system-role.types";
export class SystemRoleService {
  constructor(private readonly repository: SystemRoleRepository) {}
  async assignPrivileged(
    actorIsPlatformAdmin: boolean,
    role: SystemRole,
  ): Promise<SystemRole> {
    if (!actorIsPlatformAdmin)
      throw new CoreError(
        "system_role.assignment_denied",
        "This role cannot be assigned through an ordinary workflow.",
        {},
      );
    return this.repository.save(role);
  }
}
