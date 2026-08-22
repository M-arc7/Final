create type public.transaction_status as enum ('pending', 'authorized', 'settled', 'failed', 'refunded', 'void');
create type public.wallet_kind as enum ('customer', 'organisation', 'platform');

create table public.wallets (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete restrict,
  owner_user_id uuid references public.profiles(id) on delete restrict,
  kind public.wallet_kind not null,
  currency char(3) not null,
  created_at timestamptz not null default timezone('utc', now()),
  check (num_nonnulls(organisation_id, owner_user_id) = 1),
  unique nulls not distinct (organisation_id, owner_user_id, kind, currency)
);
create table public.financial_transactions (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete restrict,
  wallet_id uuid references public.wallets(id) on delete restrict,
  provider text,
  provider_reference text,
  idempotency_key text not null,
  amount_minor bigint not null check (amount_minor >= 0),
  currency char(3) not null,
  status public.transaction_status not null default 'pending',
  transaction_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now()),
  settled_at timestamptz,
  unique (provider, provider_reference),
  unique (created_by, idempotency_key)
);
create table public.invoices (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete restrict,
  recipient_user_id uuid references public.profiles(id),
  number text not null unique,
  currency char(3) not null,
  total_minor bigint not null check (total_minor >= 0),
  status text not null default 'draft',
  issued_at timestamptz,
  due_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.subscriptions (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete restrict,
  subscriber_user_id uuid references public.profiles(id) on delete restrict,
  provider text,
  provider_reference text unique,
  plan_code text not null,
  status text not null,
  current_period_ends_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  check (num_nonnulls(organisation_id, subscriber_user_id) = 1)
);
create table public.payouts (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete restrict,
  amount_minor bigint not null check (amount_minor > 0),
  currency char(3) not null,
  status text not null default 'pending',
  provider_reference text unique,
  requested_by uuid not null references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now())
);
create table public.refunds (
  id uuid primary key default extensions.gen_random_uuid(),
  transaction_id uuid not null references public.financial_transactions(id) on delete restrict,
  amount_minor bigint not null check (amount_minor > 0),
  reason text not null,
  status text not null default 'requested',
  requested_by uuid not null references public.profiles(id),
  created_at timestamptz not null default timezone('utc', now())
);
create table public.commissions (
  id uuid primary key default extensions.gen_random_uuid(),
  transaction_id uuid not null references public.financial_transactions(id) on delete restrict,
  recipient_organisation_id uuid references public.organisations(id) on delete restrict,
  amount_minor bigint not null check (amount_minor >= 0),
  rule_code text not null,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.accounting_entries (
  id uuid primary key default extensions.gen_random_uuid(),
  transaction_id uuid not null references public.financial_transactions(id) on delete restrict,
  account_code text not null,
  debit_minor bigint not null default 0 check (debit_minor >= 0),
  credit_minor bigint not null default 0 check (credit_minor >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  check ((debit_minor = 0) <> (credit_minor = 0))
);
create or replace function app.prevent_financial_mutation()
returns trigger language plpgsql security invoker as $$
begin
  if old.status = 'settled' then raise exception 'settled financial records are immutable'; end if;
  return new;
end; $$;
create trigger financial_transactions_immutable before update on public.financial_transactions
  for each row execute function app.prevent_financial_mutation();
