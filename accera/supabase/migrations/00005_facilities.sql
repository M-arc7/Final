create type public.resource_kind as enum ('court', 'room', 'field', 'equipment', 'other');
create type public.booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed', 'no_show');

create table public.facilities (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  description text,
  address jsonb not null default '{}'::jsonb,
  timezone text not null default 'Africa/Nairobi',
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organisation_id, name)
);
create table public.facility_venues (
  id uuid primary key default extensions.gen_random_uuid(),
  facility_id uuid not null references public.facilities(id) on delete cascade,
  name text not null,
  unique (facility_id, name)
);
create table public.facility_resources (
  id uuid primary key default extensions.gen_random_uuid(),
  facility_id uuid not null references public.facilities(id) on delete cascade,
  venue_id uuid references public.facility_venues(id) on delete set null,
  kind public.resource_kind not null,
  name text not null,
  capacity integer check (capacity is null or capacity > 0),
  metadata jsonb not null default '{}'::jsonb,
  status public.record_status not null default 'active',
  unique (facility_id, name)
);
create table public.resource_availability_rules (
  id uuid primary key default extensions.gen_random_uuid(),
  resource_id uuid not null references public.facility_resources(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  is_available boolean not null,
  recurrence_rule text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now())
);
create table public.bookings (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete restrict,
  resource_id uuid not null references public.facility_resources(id) on delete restrict,
  customer_id uuid not null references public.profiles(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  status public.booking_status not null default 'pending',
  idempotency_key text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (customer_id, idempotency_key)
);
alter table public.bookings add constraint bookings_no_active_overlap
  exclude using gist (resource_id with =, tstzrange(starts_at, ends_at, '[)') with &&)
  where (status in ('pending', 'confirmed'));
create table public.booking_check_ins (
  id uuid primary key default extensions.gen_random_uuid(),
  booking_id uuid not null unique references public.bookings(id) on delete cascade,
  checked_in_by uuid not null references public.profiles(id),
  checked_in_at timestamptz not null default timezone('utc', now()),
  notes text
);
create table public.facility_staff_assignments (
  id uuid primary key default extensions.gen_random_uuid(),
  facility_id uuid not null references public.facilities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_name text not null,
  starts_at timestamptz not null default timezone('utc', now()),
  ends_at timestamptz,
  unique (facility_id, user_id, role_name)
);
create trigger facilities_set_updated_at before update on public.facilities for each row execute function app.set_updated_at();
create trigger bookings_set_updated_at before update on public.bookings for each row execute function app.set_updated_at();
