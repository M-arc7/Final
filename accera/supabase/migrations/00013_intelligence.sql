create table public.analytics_events (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete set null,
  actor_id uuid references public.profiles(id) on delete set null,
  event_name text not null,
  occurred_at timestamptz not null default timezone('utc', now()),
  properties jsonb not null default '{}'::jsonb,
  correlation_id uuid
);
create table public.recommendations (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  recommendation_type text not null,
  payload jsonb not null,
  model_version text,
  explanation text,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.predictions (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  subject_type text not null,
  subject_id uuid not null,
  prediction_type text not null,
  value jsonb not null,
  model_version text not null,
  generated_at timestamptz not null default timezone('utc', now()),
  expires_at timestamptz
);
create table public.intelligence_reports (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  report_type text not null,
  period_start timestamptz,
  period_end timestamptz,
  data jsonb not null,
  generated_at timestamptz not null default timezone('utc', now())
);
