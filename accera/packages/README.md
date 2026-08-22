# ACCERA packages

Each directory in this workspace is a deployable-consumable package boundary, not a
bucket for related files. The owning package is the single source of truth for a
concept; applications compose packages and must not recreate their policies.

## Layers and dependency direction

```text
foundation (core, utils, design-system)
  -> shared infrastructure (auth, database, payments, notifications, analytics, api, ui)
  -> domain (sports, facilities, academy, competition, commerce, finance, sponsorship, performance, content)
  -> intelligence
  -> applications
```

Dependencies may point only left. Domain packages must communicate across another
domain through an explicit contract or event, not an import. `intelligence` reads
published data and produces derived results; it never mutates a domain's
source-of-truth records.

| Package | Owns | Must not own |
| --- | --- | --- |
| `core` | accounts, people, organisations, memberships, roles, permissions and platform-neutral recipient/preference contracts | provider SDKs, UI, sport-specific identities |
| `utils` | small generic primitives: dates, currency, formatting, IDs and errors | domain policy or authentication |
| `design-system` | tokens, themes, typography, icons and accessibility primitives | feature UI or data fetching |
| `ui` | reusable presentation components and form/table/navigation primitives | domain logic or direct API calls |
| `auth` | authentication, session mechanics and request guards | product authorisation policy |
| `database` | Supabase clients, generated types, queries and repository adapters | migrations or domain business rules |
| `api` | transport handlers, request/response validation and safe API errors | domain policy or raw persistence in controllers |
| `payments` | provider-neutral payment integration, checkout, payout and webhook mechanics | finance ledger policy |
| `notifications` | email, SMS, push and in-app delivery adapters | recipient identity, preference policy or domain notification decisions |
| `analytics` | canonical event capture and reporting infrastructure | domain source-of-truth data |
| `sports` | sport, athlete, coach, official, ranking, match, result and statistics policy | account identity or cross-domain workflows |
| `facilities` | facilities, spaces, availability, bookings, check-ins and operations | commerce or finance policy |
| `academy` | programmes, classes, enrolments, attendance, assessment and progression | athlete identity or competition policy |
| `competition` | competition lifecycle, entry, draws, schedules, scoring and result publication | ranking system ownership or account identity |
| `commerce` | catalogues, products, inventory, carts, orders and fulfilment | financial accounting |
| `finance` | wallets, transactions, invoices, subscriptions, payouts, refunds and ledger | provider adapters or product catalogues |
| `sponsorship` | sponsors, agreements, campaigns, placements, deliverables and ROI reporting | payment execution |
| `performance` | training, testing, recovery, analysis, video and performance reports | sports results or identity |
| `content` | posts, articles, media, announcements and feeds | authorisation or UI rendering |
| `intelligence` | analytics-derived recommendations, predictions and insight | direct source-of-truth writes |

The authoritative nested ownership map is
[`docs/01-architecture/package-architecture.md`](../docs/01-architecture/package-architecture.md).
Run `pnpm architecture:check` before introducing a workspace dependency.
