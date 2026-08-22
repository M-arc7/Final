import { invariant } from "../../shared/errors";
import { newId } from "../../shared/primitives";
import type { OrganisationRole } from "./organisation-role.types";
export const createOrganisationRole = (
  input: Omit<OrganisationRole, "id" | "status" | "createdAt" | "updatedAt">,
  now = new Date(),
): OrganisationRole => {
  invariant(
    input.rank >= 0,
    "organisation_role.invalid_rank",
    "Role rank cannot be negative.",
  );
  return {
    ...input,
    id: newId<"OrganisationRoleId">(),
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
};
