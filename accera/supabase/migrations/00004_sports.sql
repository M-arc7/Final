create type public.participant_kind as enum ('individual', 'team');
create type public.match_status as enum ('scheduled', 'in_progress', 'completed', 'cancelled', 'void');

create table public.sports (
  id uuid primary key default extensions.gen_random_uuid(),
  name text not null unique,
  slug extensions.citext not null unique,
  rules jsonb not null default '{}'::jsonb,
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now())
);
create table public.sport_disciplines (
  id uuid primary key default extensions.gen_random_uuid(),
  sport_id uuid not null references public.sports(id) on delete cascade,
  name text not null,
  rules jsonb not null default '{}'::jsonb,
  unique (sport_id, name)
);
create table public.sport_categories (
  id uuid primary key default extensions.gen_random_uuid(),
  sport_id uuid not null references public.sports(id) on delete cascade,
  discipline_id uuid references public.sport_disciplines(id) on delete cascade,
  name text not null,
  eligibility_rules jsonb not null default '{}'::jsonb,
  unique (sport_id, discipline_id, name)
);
create table public.sport_seasons (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  sport_id uuid not null references public.sports(id),
  name text not null,
  starts_on date not null,
  ends_on date not null check (ends_on >= starts_on),
  unique (organisation_id, sport_id, name)
);
create table public.athlete_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  date_of_birth date,
  guardian_user_id uuid references public.profiles(id),
  public_visibility boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create table public.coach_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  qualifications jsonb not null default '[]'::jsonb,
  bio text,
  updated_at timestamptz not null default timezone('utc', now())
);
create table public.official_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  certifications jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);
create table public.sport_matches (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  sport_id uuid not null references public.sports(id),
  category_id uuid references public.sport_categories(id),
  scheduled_at timestamptz,
  status public.match_status not null default 'scheduled',
  created_at timestamptz not null default timezone('utc', now())
);
create table public.match_results (
  id uuid primary key default extensions.gen_random_uuid(),
  match_id uuid not null unique references public.sport_matches(id) on delete cascade,
  result jsonb not null,
  finalized_by uuid references public.profiles(id),
  finalized_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.sport_statistics (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  match_id uuid references public.sport_matches(id) on delete set null,
  metric_key text not null,
  metric_value numeric not null,
  measured_at timestamptz not null default timezone('utc', now())
);
create trigger athlete_profiles_set_updated_at before update on public.athlete_profiles for each row execute function app.set_updated_at();
create trigger coach_profiles_set_updated_at before update on public.coach_profiles for each row execute function app.set_updated_at();
create trigger official_profiles_set_updated_at before update on public.official_profiles for each row execute function app.set_updated_at();
