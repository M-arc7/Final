# ACCERA

ACCERA is a multi-product sports operating system for athletes, families, coaches,
facilities, academies, competitions, organisations, sponsors, and the public. It
connects operational sport activity—training, bookings, memberships, competition,
commerce and payments—with the data and governance needed to grow a sports ecosystem.

## Repository map

| Path | Responsibility |
| --- | --- |
| `apps/` | Role-specific web and mobile application shells. |
| `packages/` | Reusable domain, UI, API, auth, database, payment and utility code. |
| `supabase/` | PostgreSQL migrations, Edge Functions, seed data and generated types. |
| `services/` | Workers, scheduled processes and integration adapters. |
| `infrastructure/` | Environment, deployment, monitoring, backup and security configuration. |
| `docs/` | Product, domain, architecture, database, API, security, operations and ADR specifications. |

## Architecture at a glance

Applications own presentation and role-specific navigation. Domain packages own
business rules and contracts. Supabase provides identity, PostgreSQL, storage and
realtime primitives; Edge Functions enforce privileged workflows and integration
boundaries. Workers process asynchronous, retryable work. PostgreSQL Row Level
Security is the final data-access control for tenant data.

The documented architecture is the implementation contract. Start at
[`docs/README.md`](docs/README.md), then consult the relevant domain and ADR before
introducing a new entity, policy, service boundary or integration.

## Prerequisites

- Node.js 22.11 or later
- pnpm 9.15 or later
- Supabase CLI for local database and Edge Function development

## Development

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
```

Copy `.env.example` to the environment-specific local file and provide only the
credentials required for the applications being run. Never commit secret values.

## Working agreements

Changes that cross a domain boundary need a documented service or event contract.
Changes with durable architectural consequences need an ADR. Database changes are
additive, ordered migrations with RLS policies in the same release. See
[`CONTRIBUTING.md`](CONTRIBUTING.md) for the delivery checklist.
