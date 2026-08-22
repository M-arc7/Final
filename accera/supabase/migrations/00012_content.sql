create type public.content_status as enum ('draft', 'published', 'hidden', 'archived');
create table public.content_posts (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create table public.articles (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  title text not null,
  slug extensions.citext not null unique,
  body text not null,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create table public.content_media (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  file_id uuid not null unique references public.files(id),
  owner_id uuid not null references public.profiles(id),
  status public.content_status not null default 'draft',
  created_at timestamptz not null default timezone('utc', now())
);
create table public.announcements (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  title text not null,
  body text not null,
  audience jsonb not null default '{}'::jsonb,
  status public.content_status not null default 'draft',
  published_at timestamptz
);
create table public.content_feed_items (
  id uuid primary key default extensions.gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  content_type text not null,
  content_id uuid not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (recipient_id, content_type, content_id)
);
create trigger content_posts_set_updated_at before update on public.content_posts for each row execute function app.set_updated_at();
create trigger articles_set_updated_at before update on public.articles for each row execute function app.set_updated_at();
