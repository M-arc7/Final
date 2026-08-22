import type { PermissionCheck } from "./permission-check.types";
export interface PermissionCheckRepository {
  isActiveOrganisationMember(
    accountId: string,
    organisationId: string,
  ): Promise<boolean>;
  resolvePermissionCodes(
    accountId: string,
    organisationId: string | undefined,
    resource: PermissionCheck["resource"],
  ): Promise<readonly string[]>;
}
