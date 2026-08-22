create table public.athlete_metrics (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  metric_key text not null,
  value numeric not null,
  unit text not null,
  measured_at timestamptz not null,
  recorded_by uuid references public.profiles(id),
  source text not null default 'manual',
  metadata jsonb not null default '{}'::jsonb
);
create table public.training_records (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  coach_id uuid references public.coach_profiles(user_id),
  occurred_at timestamptz not null,
  training jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.performance_tests (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  test_type text not null,
  result jsonb not null,
  tested_at timestamptz not null,
  recorded_by uuid references public.profiles(id)
);
create table public.recovery_records (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  recorded_at timestamptz not null,
  data jsonb not null
);
create table public.match_analyses (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid references public.athlete_profiles(user_id),
  match_id uuid references public.sport_matches(id) on delete set null,
  analysis jsonb not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now())
);
create table public.performance_videos (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid references public.athlete_profiles(user_id),
  file_id uuid not null references public.files(id),
  captured_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);
create table public.performance_reports (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  report jsonb not null,
  generated_by uuid references public.profiles(id),
  generated_at timestamptz not null default timezone('utc', now())
);
