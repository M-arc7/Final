import { CoreError } from "../../shared/errors";
import type { OrganisationRoleRepository } from "./organisation-role.repository";
import type { OrganisationRole } from "./organisation-role.types";
export class OrganisationRoleService {
  constructor(private readonly repository: OrganisationRoleRepository) {}
  async assertAssignable(
    assigner: OrganisationRole,
    target: OrganisationRole,
  ): Promise<void> {
    if (
      assigner.organisationId !== target.organisationId ||
      assigner.rank <= target.rank
    )
      throw new CoreError(
        "organisation_role.assignment_denied",
        "The role cannot be assigned at this scope.",
        {},
      );
  }
}
