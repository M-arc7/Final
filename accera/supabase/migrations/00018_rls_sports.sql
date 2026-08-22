-- =========================================================
-- SPORTS: public reference data; relationship and permission-gated records.
-- =========================================================

grant select on public.sports, public.sport_disciplines, public.sport_categories to anon;
create policy sports_public_read on public.sports for select using (status = 'active');
create policy sport_disciplines_public_read on public.sport_disciplines for select using (true);
create policy sport_categories_public_read on public.sport_categories for select using (true);
create policy sport_seasons_scoped_read on public.sport_seasons for select using (organisation_id is null or app.has_organisation_permission(organisation_id, 'sports.read'));
create policy sport_seasons_scoped_write on public.sport_seasons for all using (organisation_id is not null and app.has_organisation_permission(organisation_id, 'sports.manage')) with check (organisation_id is not null and app.has_organisation_permission(organisation_id, 'sports.manage'));

create policy athlete_profiles_self_guardian_or_permission_read on public.athlete_profiles for select
  using (app.owns_record(user_id) or app.owns_record(guardian_user_id) or app.has_permission('athletes.read'));
create policy athlete_profiles_self_update on public.athlete_profiles for update
  using (app.owns_record(user_id)) with check (app.owns_record(user_id));
create policy coach_profiles_self_read on public.coach_profiles for select using (app.owns_record(user_id) or app.has_permission('coaches.read'));
create policy coach_profiles_self_update on public.coach_profiles for update using (app.owns_record(user_id)) with check (app.owns_record(user_id));
create policy official_profiles_self_read on public.official_profiles for select using (app.owns_record(user_id) or app.has_permission('officials.read'));
create policy official_profiles_self_update on public.official_profiles for update using (app.owns_record(user_id)) with check (app.owns_record(user_id));

create policy sport_matches_organisation_read on public.sport_matches for select using (organisation_id is not null and app.has_organisation_permission(organisation_id, 'matches.read'));
create policy sport_matches_organisation_write on public.sport_matches for all using (organisation_id is not null and app.has_organisation_permission(organisation_id, 'matches.manage')) with check (organisation_id is not null and app.has_organisation_permission(organisation_id, 'matches.manage'));
create policy match_results_organisation_read on public.match_results for select using (exists (select 1 from public.sport_matches match where match.id = match_id and match.organisation_id is not null and app.has_organisation_permission(match.organisation_id, 'matches.read')));
create policy match_results_organisation_write on public.match_results for all using (exists (select 1 from public.sport_matches match where match.id = match_id and match.organisation_id is not null and app.has_organisation_permission(match.organisation_id, 'matches.manage'))) with check (exists (select 1 from public.sport_matches match where match.id = match_id and match.organisation_id is not null and app.has_organisation_permission(match.organisation_id, 'matches.manage')));
create policy sport_statistics_owner_guardian_or_permission_read on public.sport_statistics for select using (app.owns_record(athlete_id) or exists (select 1 from public.athlete_profiles athlete where athlete.user_id = athlete_id and app.owns_record(athlete.guardian_user_id)) or (organisation_id is not null and app.has_organisation_permission(organisation_id, 'performance.read')));
create policy sport_statistics_organisation_write on public.sport_statistics for all using (organisation_id is not null and app.has_organisation_permission(organisation_id, 'performance.write')) with check (organisation_id is not null and app.has_organisation_permission(organisation_id, 'performance.write'));
