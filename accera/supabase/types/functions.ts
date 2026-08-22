/** Generated RPC boundary; regenerate from the applied database. */
export type HasOrganisationPermissionArgs = {
  target_organisation_id: string;
  required_permission: string;
};
export type IsOrganisationMemberArgs = { target_organisation_id: string };
export type RlsFunctionArgs = {
  has_organisation_permission: HasOrganisationPermissionArgs;
  is_organisation_member: IsOrganisationMemberArgs;
};
export type RlsFunctionReturns = {
  has_organisation_permission: boolean;
  is_organisation_member: boolean;
};
