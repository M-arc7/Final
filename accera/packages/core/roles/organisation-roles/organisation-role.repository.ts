import type { OrganisationRole } from "./organisation-role.types";
export interface OrganisationRoleRepository {
  findById(id: string): Promise<OrganisationRole | null>;
  listForOrganisation(
    organisationId: string,
  ): Promise<readonly OrganisationRole[]>;
  save(role: OrganisationRole): Promise<OrganisationRole>;
}
