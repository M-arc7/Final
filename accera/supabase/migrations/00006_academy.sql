create type public.enrollment_status as enum ('pending', 'active', 'withdrawn', 'completed', 'waitlisted');
create type public.attendance_status as enum ('present', 'late', 'absent', 'excused');

create table public.academy_programs (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  sport_id uuid references public.sports(id),
  name text not null,
  description text,
  capacity integer check (capacity is null or capacity > 0),
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  unique (organisation_id, name)
);
create table public.academy_classes (
  id uuid primary key default extensions.gen_random_uuid(),
  program_id uuid not null references public.academy_programs(id) on delete cascade,
  facility_resource_id uuid references public.facility_resources(id) on delete set null,
  name text not null,
  capacity integer check (capacity is null or capacity > 0),
  unique (program_id, name)
);
create table public.academy_sessions (
  id uuid primary key default extensions.gen_random_uuid(),
  class_id uuid not null references public.academy_classes(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  session_plan jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.academy_coach_assignments (
  id uuid primary key default extensions.gen_random_uuid(),
  class_id uuid not null references public.academy_classes(id) on delete cascade,
  coach_id uuid not null references public.coach_profiles(user_id),
  starts_at timestamptz not null default timezone('utc', now()),
  ends_at timestamptz,
  unique (class_id, coach_id, starts_at)
);
create table public.academy_enrollments (
  id uuid primary key default extensions.gen_random_uuid(),
  program_id uuid not null references public.academy_programs(id) on delete cascade,
  class_id uuid references public.academy_classes(id) on delete set null,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  status public.enrollment_status not null default 'pending',
  enrolled_by uuid not null references public.profiles(id),
  enrolled_at timestamptz not null default timezone('utc', now()),
  unique (program_id, athlete_id)
);
create table public.academy_attendance (
  id uuid primary key default extensions.gen_random_uuid(),
  session_id uuid not null references public.academy_sessions(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  status public.attendance_status not null,
  recorded_by uuid not null references public.profiles(id),
  recorded_at timestamptz not null default timezone('utc', now()),
  unique (session_id, athlete_id)
);
create table public.academy_assessments (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  assessor_id uuid not null references public.profiles(id),
  assessment_type text not null,
  assessment jsonb not null,
  assessed_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);
create table public.athlete_progression_records (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  athlete_id uuid not null references public.athlete_profiles(user_id),
  source_assessment_id uuid references public.academy_assessments(id) on delete set null,
  milestone text not null,
  achieved_at timestamptz not null default timezone('utc', now()),
  notes text
);
