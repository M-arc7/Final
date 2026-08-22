-- =========================================================
-- 1. SECURITY FUNCTIONS
-- =========================================================
-- RLS is the row-level enforcement layer. These predicates derive identity only
-- from auth.uid(); they never accept a caller-supplied user id as proof of identity.

create or replace function app.is_active_account()
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select auth.uid() is not null and exists (
    select 1 from public.profiles profile
    where profile.id = auth.uid() and profile.status = 'active' and profile.deleted_at is null
  );
$$;

create or replace function app.is_platform_admin()
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_active_account() and exists (
    select 1 from public.user_roles user_role
    join public.roles role on role.id = user_role.role_id
    where user_role.user_id = auth.uid()
      and role.is_system
      and role.code = 'platform_admin'
  );
$$;

create or replace function app.owns_record(owner_user_id uuid)
returns boolean language sql stable security invoker set search_path = pg_catalog, public as $$
  select app.is_active_account() and owner_user_id = auth.uid();
$$;

create or replace function app.is_thread_participant(target_thread_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_active_account() and exists (
    select 1 from public.thread_participants participant
    where participant.thread_id = target_thread_id and participant.user_id = auth.uid()
  );
$$;

create or replace function app.is_organisation_member(target_organisation_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_active_account() and exists (
    select 1 from public.organisation_memberships membership
    where membership.organisation_id = target_organisation_id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
  );
$$;

create or replace function app.has_organisation_role(target_organisation_id uuid, required_role extensions.citext)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1
    from public.organisation_memberships membership
    join public.organisation_member_roles member_role on member_role.membership_id = membership.id
    join public.organisation_roles role on role.id = member_role.role_id
    where membership.organisation_id = target_organisation_id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
      and role.code = required_role
  );
$$;

create or replace function app.has_permission(required_permission extensions.citext)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1
    from public.user_roles user_role
    join public.role_permissions role_permission on role_permission.role_id = user_role.role_id
    join public.permissions permission on permission.id = role_permission.permission_id
    where user_role.user_id = auth.uid() and permission.code = required_permission
  );
$$;

create or replace function app.has_organisation_permission(target_organisation_id uuid, required_permission extensions.citext)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1
    from public.organisation_memberships membership
    join public.organisation_member_roles member_role on member_role.membership_id = membership.id
    join public.organisation_roles role on role.id = member_role.role_id
    left join public.organisation_role_permissions role_permission on role_permission.role_id = role.id
    left join public.permissions permission on permission.id = role_permission.permission_id
    where membership.organisation_id = target_organisation_id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
      and (role.is_owner_role or permission.code = required_permission)
  );
$$;

create or replace function app.can_access_organisation_membership(target_membership_id uuid, required_permission extensions.citext default 'members.read')
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1 from public.organisation_memberships membership
    where membership.id = target_membership_id
      and (membership.user_id = auth.uid() or app.has_organisation_permission(membership.organisation_id, required_permission))
  );
$$;

create or replace function app.can_access_organisation_role(target_role_id uuid, required_permission extensions.citext default 'roles.read')
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1 from public.organisation_roles role
    where role.id = target_role_id
      and role.organisation_id is not null
      and app.has_organisation_permission(role.organisation_id, required_permission)
  );
$$;

create or replace function app.can_access_facility(target_facility_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1 from public.facilities facility
    where facility.id = target_facility_id
      and (
        app.has_organisation_permission(facility.organisation_id, 'facilities.read')
        or exists (
          select 1 from public.facility_staff_assignments assignment
          where assignment.facility_id = facility.id and assignment.user_id = auth.uid()
            and assignment.starts_at <= timezone('utc', now())
            and (assignment.ends_at is null or assignment.ends_at > timezone('utc', now()))
        )
      )
  );
$$;

create or replace function app.has_facility_permission(target_facility_id uuid, required_permission extensions.citext)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1 from public.facilities facility
    where facility.id = target_facility_id
      and app.has_organisation_permission(facility.organisation_id, required_permission)
  );
$$;

create or replace function app.can_access_academy(target_program_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1 from public.academy_programs program
    where program.id = target_program_id and (
      app.has_organisation_permission(program.organisation_id, 'academy.read')
      or exists (
        select 1 from public.academy_enrollments enrollment
        left join public.athlete_profiles athlete on athlete.user_id = enrollment.athlete_id
        where enrollment.program_id = program.id
          and enrollment.status = 'active'
          and (enrollment.athlete_id = auth.uid() or athlete.guardian_user_id = auth.uid())
      )
      or exists (
        select 1 from public.academy_coach_assignments coach
        join public.academy_classes class on class.id = coach.class_id
        where class.program_id = program.id and coach.coach_id = auth.uid()
          and coach.starts_at <= timezone('utc', now())
          and (coach.ends_at is null or coach.ends_at > timezone('utc', now()))
      )
    )
  );
$$;

create or replace function app.can_access_academy_class(target_class_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select exists (select 1 from public.academy_classes class where class.id = target_class_id and app.can_access_academy(class.program_id));
$$;

create or replace function app.can_access_academy_session(target_session_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select exists (
    select 1 from public.academy_sessions session
    where session.id = target_session_id and app.can_access_academy_class(session.class_id)
  );
$$;

create or replace function app.can_manage_academy_session(target_session_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1
    from public.academy_sessions session
    join public.academy_classes class on class.id = session.class_id
    join public.academy_programs program on program.id = class.program_id
    where session.id = target_session_id and (
      app.has_organisation_permission(program.organisation_id, 'academy.manage')
      or exists (
        select 1 from public.academy_coach_assignments coach
        where coach.class_id = class.id and coach.coach_id = auth.uid()
          and coach.starts_at <= timezone('utc', now())
          and (coach.ends_at is null or coach.ends_at > timezone('utc', now()))
      )
    )
  );
$$;

create or replace function app.can_access_competition(target_competition_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select app.is_platform_admin() or exists (
    select 1 from public.competitions competition
    where competition.id = target_competition_id and (
      app.has_organisation_permission(competition.organisation_id, 'competition.read')
      or exists (select 1 from public.competition_registrations registration where registration.competition_id = competition.id and registration.participant_user_id = auth.uid())
      or exists (
        select 1 from public.competition_match_officials official
        join public.competition_matches match on match.id = official.match_id
        where match.competition_id = competition.id and official.official_id = auth.uid()
      )
    )
  );
$$;

create or replace function app.can_access_competition_match(target_match_id uuid)
returns boolean language sql stable security definer set search_path = pg_catalog, public as $$
  select exists (
    select 1 from public.competition_matches match
    where match.id = target_match_id and app.can_access_competition(match.competition_id)
  );
$$;

-- RPCs expose only boolean decisions. Authoritative role and membership rows remain RLS-protected.
create or replace function public.has_organisation_permission(target_organisation_id uuid, required_permission extensions.citext)
returns boolean language sql stable security invoker set search_path = pg_catalog, public, app as $$
  select app.has_organisation_permission(target_organisation_id, required_permission);
$$;
create or replace function public.is_organisation_member(target_organisation_id uuid)
returns boolean language sql stable security invoker set search_path = pg_catalog, public, app as $$
  select app.is_organisation_member(target_organisation_id);
$$;
revoke all on function public.has_organisation_permission(uuid, extensions.citext) from public;
revoke all on function public.is_organisation_member(uuid) from public;
grant execute on function public.has_organisation_permission(uuid, extensions.citext) to authenticated;
grant execute on function public.is_organisation_member(uuid) to authenticated;

-- =========================================================
-- 12. DENY-BY-DEFAULT VERIFICATION
-- =========================================================
-- Every public application table participates in RLS. A table has no client access
-- until a domain migration adds an explicit policy; the service role remains server-only.
do $$
declare table_name text;
begin
  for table_name in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

revoke all on all tables in schema public from anon;
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
