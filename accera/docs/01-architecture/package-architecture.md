# ACCERA Package Architecture

> **Status:** Baseline controlled specification. The package boundary checker enforces the dependency rules in this document.

## Decision

`packages/` is a package-level architecture. Each package has a public entry point,
a manifest and a single responsibility. A directory is introduced only when it has
an accountable owner and a public or internal contract to implement; empty folder
trees are not architecture.

## Layering

```text
core + utils + design-system
             ↓
auth + database + payments + notifications + analytics + api + ui
             ↓
sports + facilities + academy + competition + commerce + finance + sponsorship + performance + content
             ↓
intelligence
             ↓
applications
```

Packages may use only an earlier layer. No domain package may import another domain
package. Collaboration uses a narrow contract owned by the receiving boundary or a
published event; applications and services compose those contracts.

## Ownership map

| Package | Internal areas when implemented |
| --- | --- |
| `auth` | client authentication/sessions/tokens; server authentication/sessions/verification; guards for authentication, authorization and organisation context; session management/refresh/persistence |
| `api` | clients for core, sports, facilities, academy, competition, commerce, finance, sponsorship, performance and intelligence; thin controllers, services and transport handlers; authentication/authorization/rate-limit/logging middleware; schemas and typed errors |
| `database` | browser/server/admin Supabase clients; domain queries and repositories; generated, domain and database-specific types. Migrations remain under `supabase/`. |
| `payments` | provider adapters, checkout sessions/validation/confirmation, subscription lifecycle, payouts and verified webhooks |
| `notifications` | email, push, SMS and in-app templates/providers/delivery. Core remains the source of truth for recipient identity and platform-neutral notification preferences. |
| `analytics` | canonical event definitions/tracking/validation; web/mobile/backend/realtime tracking; metrics/dashboards/exports/reports |
| `ui` | generic components, forms, tables, modals, dialogs, navigation, feedback, charts, calendars, maps and media. Components receive data; they do not fetch it. |
| `design-system` | tokens, typography, system/sport/brand icons, light/dark/high-contrast themes and accessibility support |
| `utils` | dates, currency, generic validation/formatting/identifiers/localization/errors/logging/security/constants/types |
| `sports` | sport/discipline definitions, categories, seasons, athlete/coach/official relationships, rankings, ratings, matches, results and statistics |
| `facilities` | facility/venue/court/room/resource models, availability, bookings, check-ins, staff and operations |
| `academy` | programmes, classes, sessions, coach assignments, enrolment, attendance, assessment, development and progression |
| `competition` | competitions, events, registration, entries, draws, brackets, scheduling, scoring, official assignment, result publication and competition ranking impact |
| `commerce` | catalogues, products, variants, inventory, vendors, carts, orders, fulfilment, shipping and promotions |
| `finance` | wallets, transactions, invoices, subscriptions, payouts, refunds, commissions and accounting/reconciliation |
| `sponsorship` | sponsors, partners, campaigns, contracts, placements, deliverables and reporting |
| `performance` | athlete metrics, training, strength, conditioning, recovery, testing, match analysis, video and reports |
| `content` | posts, articles, videos, media, announcements and feeds |
| `intelligence` | derived analytics, recommendations, predictions, athlete/facility/business intelligence |

## Non-negotiable ownership rules

1. `core` owns account, person, organisation and permission identity. An athlete,
   coach or official record supplements a Core person; it never creates another user.
2. Domain packages own their domain rules. Authentication answers who is signed in;
   Core authorization answers whether the operation is permitted; the domain supplies
   the operation context.
3. Infrastructure exposes adapters and transport mechanisms, never business rules.
   For example, ranking calculation belongs to `sports`, competition winner selection
   to `competition`, and ledger semantics to `finance`.
   `notifications` sends through a channel; Core owns recipient identity and the
   preference contract, while the requesting domain decides whether to notify.
4. The database package contains adapters only. Generated database types are copied
   from `supabase/types` and are never hand-authored in `packages/database`.
5. Payment webhook signatures are verified before an event reaches finance or commerce;
   secrets and privileged clients are server-only.

## Enforcement

Every package manifest declares its internal workspace dependencies. The
`architecture:check` script rejects missing boundary files, an unapproved dependency
direction, undeclared `@accera/*` imports and inter-domain imports. The check is a
guardrail, not a replacement for reviewing the actual responsibility of a change.
