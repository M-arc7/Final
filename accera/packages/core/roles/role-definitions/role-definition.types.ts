import type { Brand, Timestamped } from "../../shared/primitives";
export type RoleDefinitionId = Brand<string, "RoleDefinitionId">;
export type RoleScope =
  | "platform"
  | "organisation"
  | "facility"
  | "academy"
  | "competition";
export type RoleDefinition = Readonly<
  {
    id: RoleDefinitionId;
    code: string;
    name: string;
    scope: RoleScope;
    description?: string;
    permissionCodes: readonly string[];
    version: number;
    status: "active" | "inactive";
  } & Timestamped
>;
