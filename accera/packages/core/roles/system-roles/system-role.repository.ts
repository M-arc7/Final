import type { SystemRole, SystemRoleCode } from "./system-role.types";
export interface SystemRoleRepository {
  findByCode(code: SystemRoleCode): Promise<SystemRole | null>;
  save(role: SystemRole): Promise<SystemRole>;
}
