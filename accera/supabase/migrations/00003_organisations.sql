create type public.organisation_member_status as enum ('invited', 'active', 'suspended', 'removed');

create table public.organisation_types (
  id uuid primary key default extensions.gen_random_uuid(),
  code extensions.citext not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.organisations (
  id uuid primary key default extensions.gen_random_uuid(),
  type_id uuid not null references public.organisation_types(id),
  legal_name text not null,
  display_name text not null,
  slug extensions.citext not null unique,
  parent_organisation_id uuid references public.organisations(id) on delete restrict,
  status public.record_status not null default 'active',
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table public.organisation_memberships (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status public.organisation_member_status not null default 'invited',
  invited_by uuid references public.profiles(id),
  joined_at timestamptz,
  removed_at timestamptz,
  unique (organisation_id, user_id)
);

create table public.organisation_roles (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  code extensions.citext not null,
  name text not null,
  is_owner_role boolean not null default false,
  unique nulls not distinct (organisation_id, code)
);

create table public.organisation_member_roles (
  membership_id uuid not null references public.organisation_memberships(id) on delete cascade,
  role_id uuid not null references public.organisation_roles(id) on delete cascade,
  primary key (membership_id, role_id)
);

create table public.organisation_role_permissions (
  role_id uuid not null references public.organisation_roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table public.organisation_settings (
  organisation_id uuid primary key references public.organisations(id) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.organisation_relationships (
  id uuid primary key default extensions.gen_random_uuid(),
  source_organisation_id uuid not null references public.organisations(id) on delete cascade,
  target_organisation_id uuid not null references public.organisations(id) on delete cascade,
  relationship_type text not null,
  status public.record_status not null default 'active',
  starts_at timestamptz,
  ends_at timestamptz,
  check (source_organisation_id <> target_organisation_id),
  unique (source_organisation_id, target_organisation_id, relationship_type)
);

create or replace function app.is_organisation_member(target_organisation_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.organisation_memberships membership
    where membership.organisation_id = target_organisation_id
      and membership.user_id = auth.uid()
      and membership.status = 'active'
  );
$$;

create or replace function app.has_organisation_permission(target_organisation_id uuid, required_permission extensions.citext)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
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

create trigger organisations_set_updated_at before update on public.organisations for each row execute function app.set_updated_at();
create trigger organisation_settings_set_updated_at before update on public.organisation_settings for each row execute function app.set_updated_at();

alter table public.audit_log add constraint audit_log_organisation_id_fkey
  foreign key (organisation_id) references public.organisations(id) on delete set null;
