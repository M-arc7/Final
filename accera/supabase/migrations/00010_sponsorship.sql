create table public.sponsors (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null unique references public.organisations(id) on delete cascade,
  name text not null,
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now())
);
create table public.sponsorship_campaigns (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  sponsor_id uuid not null references public.sponsors(id) on delete restrict,
  name text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now())
);
create table public.sponsorship_contracts (
  id uuid primary key default extensions.gen_random_uuid(),
  campaign_id uuid not null references public.sponsorship_campaigns(id) on delete cascade,
  document_file_id uuid references public.files(id),
  status text not null default 'draft',
  terms jsonb not null default '{}'::jsonb,
  signed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.sponsorship_placements (
  id uuid primary key default extensions.gen_random_uuid(),
  campaign_id uuid not null references public.sponsorship_campaigns(id) on delete cascade,
  placement_type text not null,
  target_reference jsonb not null,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.record_status not null default 'active'
);
create table public.sponsorship_deliverables (
  id uuid primary key default extensions.gen_random_uuid(),
  campaign_id uuid not null references public.sponsorship_campaigns(id) on delete cascade,
  description text not null,
  due_at timestamptz,
  status text not null default 'pending',
  evidence jsonb not null default '{}'::jsonb,
  completed_at timestamptz
);
create table public.sponsorship_reports (
  id uuid primary key default extensions.gen_random_uuid(),
  campaign_id uuid not null references public.sponsorship_campaigns(id) on delete cascade,
  period_start date not null,
  period_end date not null check (period_end >= period_start),
  metrics jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);
