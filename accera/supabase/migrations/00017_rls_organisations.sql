-- =========================================================
-- ORGANISATIONS: membership is not a blanket grant; permissions decide actions.
-- =========================================================

grant select on public.organisation_types to anon;
create policy organisation_types_public_read on public.organisation_types for select using (true);
create policy organisations_member_or_platform_read on public.organisations for select
  using (app.is_platform_admin() or app.is_organisation_member(id));
create policy organisations_creator_insert on public.organisations for insert
  with check (app.is_platform_admin() or app.owns_record(created_by));
create policy organisations_manage_update on public.organisations for update
  using (app.has_organisation_permission(id, 'organisations.manage'))
  with check (app.has_organisation_permission(id, 'organisations.manage'));

create policy memberships_self_or_authorised_read on public.organisation_memberships for select
  using (app.owns_record(user_id) or app.has_organisation_permission(organisation_id, 'members.read'));
create policy memberships_manage_insert on public.organisation_memberships for insert
  with check (app.has_organisation_permission(organisation_id, 'members.manage'));
create policy memberships_manage_update on public.organisation_memberships for update
  using (app.has_organisation_permission(organisation_id, 'members.manage'))
  with check (app.has_organisation_permission(organisation_id, 'members.manage'));
create policy memberships_manage_delete on public.organisation_memberships for delete
  using (app.has_organisation_permission(organisation_id, 'members.manage'));

create policy organisation_roles_member_read on public.organisation_roles for select
  using (organisation_id is null and app.is_platform_admin() or (organisation_id is not null and app.is_organisation_member(organisation_id)));
create policy organisation_roles_manage_write on public.organisation_roles for all
  using (organisation_id is not null and app.has_organisation_permission(organisation_id, 'roles.manage'))
  with check (organisation_id is not null and app.has_organisation_permission(organisation_id, 'roles.manage'));
create policy organisation_member_roles_access_read on public.organisation_member_roles for select
  using (app.can_access_organisation_membership(membership_id) or app.can_access_organisation_role(role_id));
create policy organisation_member_roles_manage_write on public.organisation_member_roles for all
  using (app.can_access_organisation_membership(membership_id, 'roles.manage') and app.can_access_organisation_role(role_id, 'roles.manage'))
  with check (app.can_access_organisation_membership(membership_id, 'roles.manage') and app.can_access_organisation_role(role_id, 'roles.manage'));
create policy organisation_role_permissions_access_read on public.organisation_role_permissions for select
  using (app.can_access_organisation_role(role_id));
create policy organisation_role_permissions_manage_write on public.organisation_role_permissions for all
  using (app.can_access_organisation_role(role_id, 'roles.manage')) with check (app.can_access_organisation_role(role_id, 'roles.manage'));
create policy organisation_settings_permission_read on public.organisation_settings for select using (app.has_organisation_permission(organisation_id, 'organisations.settings.read'));
create policy organisation_settings_permission_write on public.organisation_settings for all using (app.has_organisation_permission(organisation_id, 'organisations.settings.manage')) with check (app.has_organisation_permission(organisation_id, 'organisations.settings.manage'));
create policy organisation_relationships_permission_read on public.organisation_relationships for select using (app.has_organisation_permission(source_organisation_id, 'organisations.relationships.read') or app.has_organisation_permission(target_organisation_id, 'organisations.relationships.read'));
create policy organisation_relationships_permission_write on public.organisation_relationships for all using (app.has_organisation_permission(source_organisation_id, 'organisations.relationships.manage')) with check (app.has_organisation_permission(source_organisation_id, 'organisations.relationships.manage'));
