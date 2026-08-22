create type public.record_status as enum ('active', 'inactive', 'archived', 'deleted');
create type public.notification_channel as enum ('in_app', 'email', 'sms', 'push');
create type public.notification_status as enum ('pending', 'sent', 'failed', 'read');
create type public.file_status as enum ('pending_scan', 'available', 'quarantined', 'deleted');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 120),
  given_name text,
  family_name text,
  avatar_file_id uuid,
  phone text,
  locale text not null default 'en',
  timezone text not null default 'Africa/Nairobi',
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

create table public.roles (
  id uuid primary key default extensions.gen_random_uuid(),
  code extensions.citext not null unique,
  name text not null,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.permissions (
  id uuid primary key default extensions.gen_random_uuid(),
  code extensions.citext not null unique,
  description text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.role_permissions (
  role_id uuid not null references public.roles(id) on delete cascade,
  permission_id uuid not null references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table public.user_roles (
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  primary key (user_id, role_id)
);

create table public.user_settings (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.files (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references public.profiles(id),
  bucket_id text not null,
  object_key text not null unique,
  original_name text not null,
  content_type text not null,
  byte_size bigint not null check (byte_size >= 0),
  checksum text,
  status public.file_status not null default 'pending_scan',
  created_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz
);

alter table public.profiles add constraint profiles_avatar_file_id_fkey
  foreign key (avatar_file_id) references public.files(id) on delete set null;

create table public.notifications (
  id uuid primary key default extensions.gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  channel public.notification_channel not null,
  template_key text not null,
  payload jsonb not null default '{}'::jsonb,
  status public.notification_status not null default 'pending',
  read_at timestamptz,
  sent_at timestamptz,
  failed_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.message_threads (
  id uuid primary key default extensions.gen_random_uuid(),
  subject text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.thread_participants (
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default timezone('utc', now()),
  last_read_at timestamptz,
  primary key (thread_id, user_id)
);

create table public.messages (
  id uuid primary key default extensions.gen_random_uuid(),
  thread_id uuid not null references public.message_threads(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null check (char_length(body) between 1 and 10000),
  created_at timestamptz not null default timezone('utc', now()),
  edited_at timestamptz,
  deleted_at timestamptz
);

create table public.audit_log (
  id uuid primary key default extensions.gen_random_uuid(),
  occurred_at timestamptz not null default timezone('utc', now()),
  actor_id uuid references public.profiles(id),
  organisation_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  correlation_id uuid,
  origin text not null default 'application',
  before_state jsonb,
  after_state jsonb,
  metadata jsonb not null default '{}'::jsonb
);

create trigger profiles_set_updated_at before update on public.profiles for each row execute function app.set_updated_at();
create trigger user_settings_set_updated_at before update on public.user_settings for each row execute function app.set_updated_at();
create trigger message_threads_set_updated_at before update on public.message_threads for each row execute function app.set_updated_at();
