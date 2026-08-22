import { CoreError } from "../../shared/errors";
import type { RoleDefinitionRepository } from "./role-definition.repository";
import type { RoleDefinition } from "./role-definition.types";
export class RoleDefinitionService {
  constructor(private readonly repository: RoleDefinitionRepository) {}
  async resolveCapabilities(code: string): Promise<readonly string[]> {
    const definition = await this.repository.findByCode(code);
    if (!definition || definition.status !== "active")
      throw new CoreError(
        "role_definition.unavailable",
        "The role definition is not available.",
        {},
      );
    return definition.permissionCodes;
  }
}
