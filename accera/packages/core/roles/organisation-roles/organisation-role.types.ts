import type { Brand, Timestamped } from "../../shared/primitives";
export type OrganisationRoleId = Brand<string, "OrganisationRoleId">;
export type OrganisationRole = Readonly<
  {
    id: OrganisationRoleId;
    organisationId: string;
    code: string;
    name: string;
    rank: number;
    inheritsFrom?: OrganisationRoleId;
    status: "active" | "inactive";
  } & Timestamped
>;
