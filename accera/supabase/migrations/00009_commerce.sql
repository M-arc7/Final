create type public.order_status as enum ('draft', 'pending_payment', 'paid', 'fulfilling', 'fulfilled', 'cancelled', 'refunded');

create table public.vendors (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null unique references public.organisations(id) on delete cascade,
  display_name text not null,
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now())
);
create table public.catalogues (
  id uuid primary key default extensions.gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  name text not null,
  currency char(3) not null,
  status public.record_status not null default 'active',
  unique (vendor_id, name)
);
create table public.products (
  id uuid primary key default extensions.gen_random_uuid(),
  catalogue_id uuid not null references public.catalogues(id) on delete cascade,
  name text not null,
  description text,
  status public.record_status not null default 'active',
  created_at timestamptz not null default timezone('utc', now())
);
create table public.product_variants (
  id uuid primary key default extensions.gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  name text not null,
  price_minor bigint not null check (price_minor >= 0),
  attributes jsonb not null default '{}'::jsonb,
  status public.record_status not null default 'active'
);
create table public.inventory_items (
  id uuid primary key default extensions.gen_random_uuid(),
  variant_id uuid not null unique references public.product_variants(id) on delete cascade,
  quantity_on_hand integer not null default 0 check (quantity_on_hand >= 0),
  quantity_reserved integer not null default 0 check (quantity_reserved >= 0 and quantity_reserved <= quantity_on_hand),
  updated_at timestamptz not null default timezone('utc', now())
);
create table public.carts (
  id uuid primary key default extensions.gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (customer_id, vendor_id, status)
);
create table public.cart_items (
  id uuid primary key default extensions.gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id),
  quantity integer not null check (quantity > 0),
  unique (cart_id, variant_id)
);
create table public.orders (
  id uuid primary key default extensions.gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete restrict,
  vendor_id uuid not null references public.vendors(id),
  customer_id uuid not null references public.profiles(id),
  transaction_id uuid references public.financial_transactions(id),
  status public.order_status not null default 'draft',
  currency char(3) not null,
  total_minor bigint not null check (total_minor >= 0),
  idempotency_key text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (customer_id, idempotency_key)
);
create table public.order_items (
  id uuid primary key default extensions.gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  variant_id uuid references public.product_variants(id),
  product_name text not null,
  sku text not null,
  quantity integer not null check (quantity > 0),
  unit_price_minor bigint not null check (unit_price_minor >= 0)
);
create table public.fulfillments (
  id uuid primary key default extensions.gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null default 'pending',
  tracking_reference text,
  fulfilled_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);
create table public.shipments (
  id uuid primary key default extensions.gen_random_uuid(),
  fulfillment_id uuid not null references public.fulfillments(id) on delete cascade,
  carrier text,
  tracking_number text,
  address jsonb not null,
  shipped_at timestamptz,
  delivered_at timestamptz
);
create table public.promotions (
  id uuid primary key default extensions.gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  code extensions.citext not null,
  rules jsonb not null,
  starts_at timestamptz,
  ends_at timestamptz,
  status public.record_status not null default 'active',
  unique (vendor_id, code)
);
create trigger inventory_items_set_updated_at before update on public.inventory_items for each row execute function app.set_updated_at();
create trigger carts_set_updated_at before update on public.carts for each row execute function app.set_updated_at();
create trigger orders_set_updated_at before update on public.orders for each row execute function app.set_updated_at();
