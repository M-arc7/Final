import type { RoleDefinition } from "./role-definition.types";
export interface RoleDefinitionRepository {
  findByCode(code: string): Promise<RoleDefinition | null>;
  save(definition: RoleDefinition): Promise<RoleDefinition>;
}
