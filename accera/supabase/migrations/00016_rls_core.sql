-- =========================================================
-- CORE: platform access, user ownership and audit records
-- =========================================================

create policy profiles_owner_or_platform_select on public.profiles for select
  using (app.owns_record(id) or app.is_platform_admin());
create policy profiles_owner_insert on public.profiles for insert
  with check (id = auth.uid());
create policy profiles_owner_or_platform_update on public.profiles for update
  using (app.owns_record(id) or app.is_platform_admin())
  with check (id = auth.uid() or app.is_platform_admin());

create policy user_settings_owner on public.user_settings for all
  using (app.owns_record(user_id)) with check (app.owns_record(user_id));
create policy files_owner_or_platform_select on public.files for select
  using (app.owns_record(owner_id) or app.is_platform_admin());
create policy files_owner_insert on public.files for insert with check (app.owns_record(owner_id));
create policy files_owner_update on public.files for update using (app.owns_record(owner_id)) with check (app.owns_record(owner_id));
create policy files_owner_delete on public.files for delete using (app.owns_record(owner_id));
create policy notifications_recipient_select on public.notifications for select using (app.owns_record(recipient_id));
create policy notifications_recipient_update on public.notifications for update using (app.owns_record(recipient_id)) with check (app.owns_record(recipient_id));

create policy system_roles_platform_read on public.roles for select using (app.is_platform_admin());
create policy permissions_platform_read on public.permissions for select using (app.is_platform_admin());
create policy role_permissions_platform_read on public.role_permissions for select using (app.is_platform_admin());
create policy user_roles_self_or_platform_read on public.user_roles for select using (app.owns_record(user_id) or app.is_platform_admin());

create policy threads_participant_select on public.message_threads for select using (app.is_thread_participant(id));
create policy threads_creator_insert on public.message_threads for insert with check (app.owns_record(created_by));
create policy threads_creator_update on public.message_threads for update using (app.owns_record(created_by)) with check (app.owns_record(created_by));
create policy thread_participants_self_or_creator_read on public.thread_participants for select
  using (app.owns_record(user_id) or exists (select 1 from public.message_threads thread where thread.id = thread_id and app.owns_record(thread.created_by)));
create policy thread_participants_creator_insert on public.thread_participants for insert
  with check (exists (select 1 from public.message_threads thread where thread.id = thread_id and app.owns_record(thread.created_by)));
create policy messages_participant_select on public.messages for select using (app.is_thread_participant(thread_id));
create policy messages_participant_insert on public.messages for insert with check (app.owns_record(sender_id) and app.is_thread_participant(thread_id));
create policy messages_sender_update on public.messages for update using (app.owns_record(sender_id) and app.is_thread_participant(thread_id)) with check (app.owns_record(sender_id) and app.is_thread_participant(thread_id));

-- Audit is append-only to ordinary clients. Server-side audited operations use the service role.
create policy audit_log_platform_or_permission_read on public.audit_log for select
  using (app.is_platform_admin() or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'audit.read')));
