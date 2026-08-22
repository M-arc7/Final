-- RLS is the tenant boundary. Service-role access is limited to audited Edge Functions.
create or replace function app.is_thread_participant(target_thread_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.thread_participants
    where thread_id = target_thread_id and user_id = auth.uid()
  );
$$;

-- Narrow RPC wrapper used by Edge Functions. It exposes a boolean only; the
-- membership/role tables themselves remain protected by RLS.
create or replace function public.has_organisation_permission(target_organisation_id uuid, required_permission extensions.citext)
returns boolean language sql stable security invoker set search_path = public, app as $$
  select app.has_organisation_permission(target_organisation_id, required_permission);
$$;
grant execute on function public.has_organisation_permission(uuid, extensions.citext) to authenticated;

-- Enable RLS on every application table. A table without a policy is deny-by-default.
do $$
declare table_name text;
begin
  for table_name in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

create policy profiles_self_select on public.profiles for select using (id = auth.uid());
create policy profiles_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy user_settings_self on public.user_settings for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy files_owner on public.files for select using (owner_id = auth.uid());
create policy notifications_recipient on public.notifications for select using (recipient_id = auth.uid());
create policy notifications_recipient_update on public.notifications for update using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());
create policy thread_participants_self on public.thread_participants for select using (user_id = auth.uid());
create policy messages_participant_select on public.messages for select using (app.is_thread_participant(thread_id));
create policy messages_participant_insert on public.messages for insert with check (sender_id = auth.uid() and app.is_thread_participant(thread_id));
create policy athlete_profiles_owner_or_guardian on public.athlete_profiles for select using (user_id = auth.uid() or guardian_user_id = auth.uid());
create policy athlete_profiles_owner_update on public.athlete_profiles for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy content_feed_recipient on public.content_feed_items for select using (recipient_id = auth.uid());
create policy recommendations_recipient on public.recommendations for select using (recipient_id = auth.uid());

create policy organisations_member_select on public.organisations for select using (app.is_organisation_member(id));
create policy organisation_memberships_self_or_member on public.organisation_memberships for select using (user_id = auth.uid() or app.is_organisation_member(organisation_id));
create policy organisation_settings_member on public.organisation_settings for select using (app.is_organisation_member(organisation_id));
create policy organisation_relationships_member on public.organisation_relationships for select using (app.is_organisation_member(source_organisation_id) or app.is_organisation_member(target_organisation_id));

-- The following tables own an organisation_id directly. Membership is the database
-- isolation floor; Edge Functions enforce operation-level permissions before writes.
do $$
declare table_name text;
begin
  foreach table_name in array array[
    'facilities', 'bookings', 'academy_programs', 'academy_assessments',
    'athlete_progression_records', 'competitions', 'financial_transactions',
    'invoices', 'payouts', 'orders', 'sponsorship_campaigns', 'athlete_metrics',
    'training_records', 'performance_tests', 'recovery_records', 'match_analyses',
    'performance_videos', 'performance_reports', 'announcements',
    'intelligence_reports'
  ] loop
    execute format('create policy %I on public.%I for select using (app.is_organisation_member(organisation_id))', table_name || '_tenant_select', table_name);
    execute format('create policy %I on public.%I for insert with check (app.is_organisation_member(organisation_id))', table_name || '_tenant_insert', table_name);
    execute format('create policy %I on public.%I for update using (app.is_organisation_member(organisation_id)) with check (app.is_organisation_member(organisation_id))', table_name || '_tenant_update', table_name);
  end loop;
end $$;

create policy sports_public_read on public.sports for select using (status = 'active');
create policy sport_disciplines_public_read on public.sport_disciplines for select using (true);
create policy sport_categories_public_read on public.sport_categories for select using (true);
create policy sport_seasons_member_read on public.sport_seasons for select using (organisation_id is null or app.is_organisation_member(organisation_id));
create policy published_posts_read on public.content_posts for select using (status = 'published' or author_id = auth.uid() or (organisation_id is not null and app.is_organisation_member(organisation_id)));
create policy published_articles_read on public.articles for select using (status = 'published' or author_id = auth.uid() or (organisation_id is not null and app.is_organisation_member(organisation_id)));

revoke all on all tables in schema public from anon;
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
