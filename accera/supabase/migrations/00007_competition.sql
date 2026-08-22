create type public.competition_status as enum ('draft', 'published', 'registration_open', 'in_progress', 'completed', 'cancelled');
create type public.competition_registration_status as enum ('pending', 'accepted', 'withdrawn', 'rejected');

create table public.competitions (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  sport_id uuid not null references public.sports(id),
  season_id uuid references public.sport_seasons(id),
  name text not null,
  status public.competition_status not null default 'draft',
  starts_at timestamptz,
  ends_at timestamptz,
  rules jsonb not null default '{}'::jsonb,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now()),
  check (ends_at is null or starts_at is null or ends_at >= starts_at)
);
create table public.competition_categories (
  id uuid primary key default extensions.gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  sport_category_id uuid references public.sport_categories(id),
  name text not null,
  capacity integer check (capacity is null or capacity > 0),
  unique (competition_id, name)
);
create table public.competition_registrations (
  id uuid primary key default extensions.gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  category_id uuid references public.competition_categories(id) on delete set null,
  participant_user_id uuid references public.profiles(id),
  status public.competition_registration_status not null default 'pending',
  idempotency_key text not null,
  registered_by uuid not null references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, participant_user_id),
  unique (registered_by, idempotency_key)
);
create table public.competition_draws (
  id uuid primary key default extensions.gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  category_id uuid references public.competition_categories(id) on delete set null,
  version integer not null default 1 check (version > 0),
  draw jsonb not null,
  generated_by uuid not null references public.profiles(id),
  generated_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, category_id, version)
);
create table public.competition_matches (
  id uuid primary key default extensions.gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  category_id uuid references public.competition_categories(id),
  resource_id uuid references public.facility_resources(id),
  scheduled_at timestamptz,
  status public.match_status not null default 'scheduled',
  score jsonb,
  result_finalized_at timestamptz,
  result_finalized_by uuid references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now())
);
create table public.competition_match_officials (
  match_id uuid not null references public.competition_matches(id) on delete cascade,
  official_id uuid not null references public.official_profiles(user_id),
  assignment_role text not null,
  primary key (match_id, official_id, assignment_role)
);
create table public.competition_ranking_entries (
  id uuid primary key default extensions.gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  points numeric not null default 0,
  position integer,
  calculated_at timestamptz not null default timezone('utc', now()),
  unique (competition_id, athlete_id)
);
