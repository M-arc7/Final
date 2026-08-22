import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const docsRoot = join(root, 'docs');

const overview = {
  vision: ['ACCERA’s long-term destination: connected digital sports infrastructure that enables sustainable athlete, organisation and facility ecosystems across Africa and internationally.', 'Set the north star for athlete opportunity, organisation operations, facility networks, commercial participation and future physical infrastructure. Do not define near-term features or delivery dates.'],
  mission: ['What ACCERA must accomplish now: remove the operational fragmentation between people, organisations and sport activity.', 'Define present users, problems, operating model, immediate value and explicit non-goals. Product scope belongs in product documents; this page sets the current mandate.'],
  ecosystem: ['How people, organisations, sports, facilities, academies, competitions, commerce, finance, sponsors, performance, content and intelligence create one connected system.', 'Describe causal relationships and shared identifiers. Do not specify tables or APIs; those belong to database and API documentation.'],
  'business-model': ['The complete economic model across B2C, B2B, B2B2C, marketplace, facility, academy, competition, sponsorship, enterprise and infrastructure services.', 'State economic actors, value exchanges and architectural capabilities required to support them without redesign. Transaction recording belongs to the finance domain.'],
  'product-map': ['The product-to-participant map: player, coach, parent, facility, competition, official, organisation, federation, club, sponsor, staff, admin and public experiences.', 'Specify which product is the primary interface for each capability and which capabilities are shared. Business rules remain in domain packages.'],
  'strategic-objectives': ['Measurable outcomes for market, product, athlete, facility, revenue, geography, technology, infrastructure and partnerships.', 'For every objective define the metric, owner, baseline, target, review cadence and leading indicator. Do not turn this into an engineering backlog.'],
  'target-markets': ['Initial and expansion geographies, sports, customer segments, facilities, academies, organisations, enterprises and international markets.', 'Record inclusion criteria, localisation assumptions, regulation dependencies and segment needs. Market-entry sequencing belongs to expansion strategy.'],
  'user-ecosystem': ['All participant categories and the relationships among players, parents, coaches, officials, facilities, academies, organisers, clubs, federations, sponsors, vendors, administrators, partners and public users.', 'Define actor responsibilities, representation rules and delegation boundaries. Permissions are specified by the core domain and security documents.'],
  'revenue-model': ['Operational revenue architecture for subscriptions, booking fees, commissions, academy payments, competition registration, ticketing, sponsorship, advertising, enterprise and ethically permitted data services.', 'For every stream define payer, payee, timing, ledger event, tax responsibility, refund/payout path and system of record.'],
  'growth-strategy': ['Acquisition and retention strategy for athletes, academies, facilities, competitions and organisations, including network effects, partnerships, sponsorship, geographic, product-led and community-led growth.', 'Identify the loop, activation event, retention signal, owner and measurement for each channel. Do not imply unconsented marketing or data use.'],
  'expansion-strategy': ['Rules for expanding geography, sports, products, facilities, infrastructure and international reach.', 'Define market-entry gates, localisation, regulatory readiness, support capacity and stop criteria. Roadmap records dependencies and order.'],
  roadmap: ['Sequenced evolution from foundation and MVP through market launch, platform expansion, facility network, competition ecosystem, marketplace, intelligence, sponsorship, physical infrastructure and regional/international expansion.', 'Use dependency gates and exit criteria instead of invented dates. Every stage identifies required domains, operational capability, risks and proof of readiness.']
};

const architecture = {
  'system-architecture': ['The top-level system: role-specific applications, shared packages, Supabase/PostgreSQL, Edge Functions, workers, integrations, infrastructure and user devices.', 'Show data/control flow and trust boundaries. The detail of a layer lives in its dedicated architecture document.'],
  'backend-architecture': ['Domain services, Edge Functions, workers, jobs, event processing, authentication, authorisation, data access and integration boundaries.', 'Backend entry points own validation and orchestration; domain packages own rules; RLS remains the data enforcement layer.'],
  'frontend-architecture': ['Web and mobile application structure, shared components, feature modules, state, data fetching, routing, responsive behaviour, accessibility and error handling.', 'Applications compose domain contracts and must not duplicate policy, money calculations or tenant authorization.'],
  'database-architecture': ['PostgreSQL/Supabase schemas, domain boundaries, relationships, security, indexes, transactions, functions, triggers, views and scale strategy.', 'The database is the durable source of truth. Detailed objects are documented in `docs/03-database/`.'],
  'api-architecture': ['Application-to-service communication, API boundaries, conventions, identity, authorization, validation, versioning, errors, rate limits and provider isolation.', 'Every endpoint has one domain owner and a documented contract; no application may query another domain’s private persistence directly.'],
  'event-architecture': ['Domain-event producers/consumers, naming, payload envelope, persistence, queues, retry, idempotency and failure recovery.', 'Events publish facts after committed state changes; they are not a substitute for synchronous authorization decisions.'],
  'security-architecture': ['System-wide identity, authorization, RLS, application/API/infrastructure security, encryption, secrets, auditability and threat boundaries.', 'Security controls are defense in depth. This page delegates operating rules to `docs/06-security/`.'],
  'device-strategy': ['Desktop, laptop, tablet, mobile, facility terminal, competition and official scoring device behaviour.', 'Specify supported form factors, degraded/offline behavior, input constraints, privacy and device-loss requirements. UI details belong to product docs.'],
  'application-architecture': ['Responsibility and boundaries of web, player, coach, facility, competition, official, admin and mobile applications.', 'Assign every role workflow to a primary application and prohibit divergent implementations of domain logic.'],
  'domain-architecture': ['Boundaries among core, sports, facilities, academy, competition, commerce, finance, sponsorship, performance, content and intelligence.', 'Define ownership, shared identifiers, allowed dependencies, synchronous contracts and events; cross-domain writes require the owning domain API.'],
  'integration-architecture': ['Payment, email, SMS, maps, storage, analytics, AI, sports data, identity and future partner integration patterns.', 'Adapters isolate provider APIs, normalize errors and callbacks, store provider references, and never leak provider assumptions into domain logic.'],
  'infrastructure-architecture': ['Hosting, compute, database, storage, CDN, networking, environment separation, deployment, monitoring, backups and disaster recovery.', 'Define production topology and responsibility boundaries; procedures belong in operations documentation.'],
  'realtime-architecture': ['Live scoring, match/booking/competition updates, notifications, messaging, presence, subscriptions, reconnection and conflicts.', 'Realtime conveys state changes; authorization is checked on channel join and clients reconcile from authoritative persisted state after reconnect.'],
  'storage-architecture': ['Images, video, documents, athlete/facility/competition media, sponsor assets, bucket layout, access policies and lifecycle.', 'Store opaque object references in domain records; use signed, time-limited access and validate all uploads before publication.'],
  'caching-architecture': ['Client, server, API, database and CDN caching, invalidation, TTLs and consistency requirements.', 'Cache only derived/read data; mutations invalidate by domain event or version. Never cache authorization decisions beyond the current request/session policy.'],
  'search-architecture': ['Search across people, athletes, organisations, facilities, competitions, events, products and content.', 'Define indexing owner, searchable fields, ranking, filters, permission enforcement and removal propagation. Search is never the authorization source.'],
  'notification-architecture': ['Push, email, SMS, in-app and system alerts: triggers, preferences, templates, delivery, retry and permission controls.', 'Notification requests are event-driven, deduplicated and auditable; delivery failure must not roll back the originating business action.'],
  'analytics-architecture': ['Product, behavioral, athlete, facility, competition, financial and BI analytics, event tracking and reporting.', 'Separate operational truth from analytical projections; classify data, minimize PII and define retention/consent before collection.'],
  'ai-architecture': ['AI services/models, data boundaries, prompts, recommendation and prediction use cases, security, human oversight and cost controls.', 'AI can propose or summarize; deterministic domain rules, authorization and financial decisions stay outside the model boundary.'],
  'scalability-architecture': ['Growth plan from 10 to 1,000,000+ users across applications, API, database, storage, realtime, queues, search and infrastructure.', 'Specify measured thresholds, bottlenecks, load tests and the next scaling action. Avoid premature distributed complexity.'],
  'disaster-recovery-architecture': ['Recovery objectives, backups, failover, database/storage/service recovery, data integrity and disaster exercises.', 'Set RTO/RPO by service criticality and require verified restoration, not merely successful backup jobs.']
};

const domains = {
  core: ['Identity, users, profiles, organisations, roles, permissions, memberships, notifications, messaging, files, search, audit and settings.', 'Own the canonical actor and tenant context used by every other domain. Do not own sport- or transaction-specific state.'],
  sports: ['Sports, disciplines, formats, categories, participants, seasons, sporting structures and sport-specific rules.', 'Own sport taxonomy and rule configuration. Competition owns a particular competition lifecycle; rankings owns published rank calculation.'],
  facilities: ['Facilities, venues, courts, rooms, resources, availability, bookings, check-ins, staff and operational management.', 'Own reservable inventory and booking state. Finance records resulting money movements; academy and competition consume facility capacity by contract.'],
  academy: ['Academies, programs, classes, sessions, coaches, enrollments, attendance, assessments, development and progression.', 'Own instruction and enrollment operations. Athlete identity belongs to core/sports; payments and payouts belong to finance.'],
  competition: ['Competition lifecycle: creation, registration, draws, schedules, scoring, officials, results and ranking publication inputs.', 'Own the event-of-play and its official result workflow. Sports owns generic rules; rankings owns cross-competition calculation.'],
  commerce: ['Products, catalogues, vendors, variants, inventory, carts, orders, fulfillment, shipping and promotions.', 'Own order intent and fulfillment state. Finance owns settled money and payment provider references.'],
  finance: ['Wallets, transactions, invoices, subscriptions, payouts, refunds, commissions and accounting relationships.', 'Own immutable financial records and reconciliation. Other domains request charges but cannot create arbitrary settled ledger entries.'],
  sponsorship: ['Sponsors, partnerships, campaigns, contracts, placements, deliverables, activation and reporting.', 'Own commercial obligations and evidence of delivery. Content owns published assets; finance owns invoicing and receipts.'],
  performance: ['Training, strength, conditioning, recovery, testing, match analysis, video and performance reporting.', 'Own athlete-performance observations and provenance. Intelligence may derive insights but does not overwrite raw measurements.'],
  content: ['Posts, articles, videos, media, announcements, feeds, publishing, moderation and content relationships.', 'Own publishability and moderation state. Storage owns binary access mechanics; sponsorship owns commercial obligation metadata.'],
  intelligence: ['Analytics, recommendations, predictions, athlete/facility/business intelligence.', 'Own derived insight models and explanation metadata. It reads governed domain data and never becomes the source of operational truth.'],
  organisations: ['Organisation types, ownership, structure, relationships, branches, staff and organisational permissions.', 'Own organization topology and membership context. Core owns identities and generic roles; facility/academy/competition own their operations.'],
  memberships: ['Membership plans, enrollment, status, renewals, benefits, access and membership relationships.', 'Own eligibility/access entitlement semantics. Finance owns charges; facilities and academies enforce the benefit through explicit contracts.'],
  events: ['Non-competition and competition-adjacent event lifecycle, registration, participants, scheduling and operations.', 'Own event operations not governed by the competition lifecycle. Ticketing/commerce and finance remain separate owners.'],
  rankings: ['Ranking/rating systems, points, calculation rules, periods, eligibility, history and publication.', 'Own reproducible calculations and published snapshots. Competition supplies validated results; sports supplies category/rule definitions.'],
  'athlete-development': ['Identification, training, assessment, progression, competition, performance tracking and advancement.', 'Define cross-domain athlete-development journey and milestones, without duplicating academy sessions or performance raw data.'],
  'physical-infrastructure': ['Courts, academies, arenas, training facilities, competition venues and future physical infrastructure.', 'Set portfolio and lifecycle requirements for physical assets. Facilities owns operational availability and bookings.']
};

const database = {
  erd: ['The complete entity-relationship model, grouped by domain with cardinality, optionality, tenant scope and lifecycle notes.', 'Every diagram relation must map to an actual foreign key, documented polymorphic rule or deliberate non-relational boundary.'],
  'data-model': ['Conceptual and logical model: identifiers, tenants, audit fields, lifecycle state, money, time and soft-deletion conventions.', 'Use this page for common modeling rules; table-specific columns remain in `tables.md`.'],
  relationships: ['Foreign keys and cross-domain relationships between entities.', 'Record owner, cardinality, delete behavior, tenant invariant and whether writes require a service contract.'],
  migrations: ['Migration naming, ordering, dependencies, expand/contract rollouts, verification and rollback philosophy.', 'Migrations are forward-only, transactional where possible, safe for existing production data and paired with policy/index changes.'],
  schemas: ['PostgreSQL schema boundaries and ownership.', 'Separate public application data from private/internal functions and extensions. Database schema membership follows domain ownership.'],
  tables: ['Production tables and their responsibilities, owner, primary key, tenant key, lifecycle and write authority.', 'Do not place full ERD or endpoint details here; link to their authoritative pages.'],
  indexes: ['Required indexes, the query paths they serve, uniqueness implications and maintenance cost.', 'Every nontrivial index must identify its predicate/order and be confirmed with realistic query plans before production.'],
  constraints: ['Database integrity: non-null, check, unique, exclusion, foreign-key and tenancy constraints.', 'Enforce invariants closest to data. Application validation improves UX but never replaces these guarantees.'],
  functions: ['PostgreSQL functions and permitted database-side business logic.', 'Functions must be deterministic where possible, schema-qualified, permission-reviewed and called through stable contracts.'],
  triggers: ['Permitted triggers, timing, side effects, ownership and observability.', 'Triggers are limited to local integrity/audit work; they must not call external systems or hide cross-domain workflows.'],
  views: ['Reusable read models and reporting views.', 'Views expose a stable, permission-safe projection and must document refresh behavior and owning domain.'],
  'materialized-views': ['Expensive analytical projections, refresh method, staleness tolerance and indexes.', 'A materialized view cannot support authorization-sensitive real-time decisions unless its freshness guarantee is explicit.'],
  enums: ['Controlled PostgreSQL enum types, allowed values and safe evolution rules.', 'Use enums only for small, stable domains; changing values requires compatibility and migration planning.'],
  sequences: ['Identifier-generation requirements and when sequences are appropriate.', 'Prefer UUIDs for public and distributed entity identity; sequences may support local ordering or human-friendly numbering.'],
  extensions: ['Required PostgreSQL/Supabase extensions, purpose, privileges and migration ordering.', 'Each extension must be approved for managed Supabase compatibility and threat impact.'],
  'row-level-security': ['RLS policies and tenant/data-access boundaries.', 'Policies operate on authenticated identity plus organisation membership. Test both permitted and denied cases for every table.'],
  'seed-data': ['Development, staging and controlled production seed data.', 'Seeds are deterministic, non-secret and tagged; production seeds are minimal, approved and never masquerade as user activity.'],
  'data-retention': ['Retention by data classification, legal basis, owner, deletion method and exceptions.', 'Define the clock, legal hold behavior, anonymization versus deletion and evidence of completion.'],
  archival: ['Archival of inactive/historical data while preserving required recoverability.', 'Archived data remains access-controlled and discoverable only through approved read paths; restoration is tested.'],
  'backup-strategy': ['Backup frequency, retention, encryption, verification, restoration and recovery ownership.', 'Measure actual recovery time and point, test restores regularly and protect backups with separate credentials.']
};

const api = {
  authentication: ['API identity mechanisms, token verification, service credentials and client authentication flows.', 'Authentication proves identity; authorization is a separate policy decision documented in `authorization.md`.'],
  endpoints: ['Route/resource structure, HTTP methods, ownership and lifecycle semantics.', 'Each endpoint declares its domain owner, auth requirement, request/response schema, errors and idempotency behavior.'],
  webhooks: ['Inbound/outbound webhook contracts, signatures, replay protection, retries, delivery logs and idempotency.', 'Acknowledge safely, persist delivery state, verify provider signatures and process expensive work asynchronously.'],
  events: ['API/domain event envelope, versioning, producer/consumer and payload rules.', 'Events state an immutable fact with IDs, occurred time, actor/tenant context and schema version; no secrets in payloads.'],
  versioning: ['Compatibility and versioning strategy for public/internal APIs and event payloads.', 'Prefer additive evolution; define deprecation notice, migration support and removal approval for breaking change.'],
  'request-validation': ['Validation for every untrusted API input.', 'Parse and normalize at the boundary, reject unknown/unsafe fields, enforce semantic constraints and return field-level safe errors.'],
  'response-format': ['Standard success, collection, metadata and correlation-ID response shapes.', 'Responses expose only fields authorized for the caller and use stable names/types.'],
  'error-handling': ['Error codes, structures, client recovery behavior and logging.', 'Separate safe public messages from internal cause; every error carries a correlation ID and no secrets or PII.'],
  'rate-limiting': ['Limits, abuse prevention, throttling policy and client feedback.', 'Set limits by identity, tenant, IP and operation cost; sensitive endpoints use stricter, observable controls.'],
  pagination: ['Cursor pagination standard, ordering guarantees and metadata.', 'Use opaque, stable cursors for mutable lists; never use offset pagination for unbounded or permission-sensitive feeds.'],
  filtering: ['Allowed filtering fields/operators and validation.', 'Filters are domain-owned, indexed where needed, type-safe and applied after tenant/authorization scoping.'],
  sorting: ['Allowed sort keys, direction, default order and deterministic tie-breaker.', 'Only expose indexed/approved fields and append an immutable ID tie-breaker to prevent duplicate/missing pages.'],
  idempotency: ['Safe repeat handling for payments, bookings, registrations, orders and webhooks.', 'Persist an idempotency key scoped to actor and operation, bind it to request hash and replay the original result.'],
  authorization: ['API access evaluation across roles, permissions, organisation boundaries and RLS.', 'Enforce before side effects and retain RLS as final protection. Do not trust client-supplied role, tenant or ownership fields.'],
  'service-contracts': ['Typed contracts between backend services and domains.', 'Specify owner, commands/queries/events, input/output, invariants, timeout/retry and compatible evolution.'],
  'realtime-api': ['Realtime channels, subscriptions, authorization, payloads, reconnection and ordering.', 'Channel names must not reveal private data; clients resync authoritative state after gaps or reconnect.'],
  'third-party-integrations': ['Provider contracts and failure isolation.', 'Centralize credentials and adapters, validate callbacks, use circuit breakers/timeouts and preserve provider IDs for reconciliation.']
};

const products = {
  player: ['Athlete profile, discovery, bookings, academy, competitions, rankings, performance, commerce, wallet and communication.', 'Define every player goal, screen state, permission, empty/error state and link to the owning domain contract.'],
  coach: ['Athletes/groups, sessions, plans, assessments, attendance, performance, schedules, competitions and earnings.', 'Coaches may act only within organization/guardian grants; assessment and attendance writes need auditability.'],
  parent: ['Dependent athlete management, academy participation, payments, schedules, communication, progress and permissions.', 'Define guardian verification, consent, age/privacy gates and transitions when an athlete gains independent control.'],
  facility: ['Facility/court availability, bookings, customers, memberships, staff, inventory, payments, academy, events and reporting.', 'Define conflict-free booking and check-in workflows; financial settlement and inventory ownership follow their domain contracts.'],
  competition: ['Creation, registration, categories, entries, draws, schedule, scoring, officials, results, rankings and reporting.', 'Specify lifecycle gates, publish/revision controls and the distinction between organiser action and official authority.'],
  academy: ['Programs, coaches, athletes, classes, attendance, assessments, payments and progression.', 'Define enrollment eligibility, capacity, guardian handling, attendance correction and progression visibility.'],
  official: ['Assignments, schedules, matches, scoring, incidents, results and notifications.', 'Official actions must support constrained/offline scoring, attribution, reconciliation and protected result finalization.'],
  commerce: ['Customer/vendor catalog, products, cart, order, inventory, payment, fulfillment and promotions.', 'Define checkout states, inventory reservation, order visibility, fulfillment exceptions and refunds via finance.'],
  sponsor: ['Opportunities, campaigns, partnerships, placements, deliverables, activation, measurement and reporting.', 'Define contract-gated access, approval/evidence flow and visibility of aggregate versus personal data.'],
  organisation: ['Members, roles, facilities, teams, programs, events, finances and organisation reporting.', 'Define tenant administration safeguards, delegated administration, ownership transfer and audit requirements.'],
  admin: ['Platform administration of users, organisations, sports, facilities, competitions, finance, content, intelligence, compliance, audit and configuration.', 'Privileged actions require least privilege, reason capture, audit records and explicit impersonation safeguards.'],
  federation: ['Governance, sanctioned competitions, rankings, athletes, clubs, officials and sport administration.', 'Define jurisdiction, sanctioning workflow, delegated access and how federation rules coexist with organisation operations.'],
  club: ['Athletes, teams, coaches, memberships, training, competitions, facilities and finances.', 'Define club-to-parent/athlete consent, team membership lifecycle and which finance actions need approver separation.'],
  'event-organiser': ['Planning, registration, scheduling, ticketing, operations, participants, sponsors and reporting.', 'Non-competition events use the events domain; competition-specific workflows link to the competition product.'],
  staff: ['Operational work across facility, academy, competition, customer service, check-ins, inventory and administration.', 'Define task queues, narrow permissions, handoff, escalation and device/session rules for shared terminals.']
};

const security = {
  authentication: ['Identity authentication, verification, recovery and account protection.', 'Define supported factors, verification assurance, recovery proofing, rate limits and safe account-enumeration behavior.'],
  authorization: ['Roles, permissions, access boundaries, organisation isolation and privileged operations.', 'Use deny-by-default, permission grants scoped to tenant/resource, separation of duties and audit of privilege change.'],
  rls: ['Supabase/PostgreSQL Row Level Security strategy and policies.', 'RLS is mandatory for tenant tables and tested with representative JWT claims. Service-role bypass is server-only and audited.'],
  privacy: ['Privacy principles, visibility, consent, access, export, correction and deletion controls.', 'Collect the minimum necessary, make sensitive athlete/minor visibility explicit and propagate consent to downstream processing.'],
  audit: ['Immutable/security-sensitive audit records and required operations.', 'Capture who, tenant, action, target, before/after summary, time, correlation ID and origin; prevent ordinary users from altering records.'],
  'data-protection': ['Protection requirements for personal, financial, athlete, organisational and operational data.', 'Classify data, define lawful purpose, minimize access, protect exports and impose stricter rules for minors and financial data.'],
  encryption: ['Encryption in transit, at rest, key ownership, rotation and certificate standards.', 'Use modern managed encryption, TLS everywhere and separate encryption/signing secrets from application configuration.'],
  'secrets-management': ['Storage/access for keys, credentials, tokens, certificates and secrets.', 'Secrets live in an approved manager or deployment environment, never source control/logs/clients; rotate and audit access.'],
  'session-security': ['Session lifecycle, token expiration/refresh/revocation and suspicious-session response.', 'Bind tokens to intended audience, rotate refresh tokens, permit revocation and require re-authentication for sensitive actions.'],
  'device-security': ['Device trust, local storage, biometric capabilities, device sessions and lost-device protection.', 'Store the minimum locally, protect tokens with platform secure storage and support remote session revocation.'],
  'api-security': ['API validation, authorization, rate limits, abuse controls, injection prevention and secure headers.', 'Apply controls at every public boundary and log decisions without storing credentials or sensitive request bodies.'],
  'payment-security': ['Payment credentials, processing, refunds, payouts and financial webhook boundaries.', 'Use tokenized provider data, verify callbacks, apply idempotency and restrict refund/payout authority with audit trails.'],
  'file-security': ['Upload validation, access control, scanning, signed access, media isolation and malicious-file prevention.', 'Verify content type and size server-side, quarantine/scan before publish and use opaque paths with time-limited URLs.'],
  'incident-management': ['Security incident detection, triage, containment, investigation, remediation and closure.', 'Define severity, incident commander, evidence handling, communications, notification obligations and lessons learned.'],
  'threat-model': ['Threat actors, assets, attack surfaces, trust boundaries, scenarios and mitigations.', 'Update on material architecture change; include abuse of multi-tenancy, payments, minors, privileged tools and integrations.'],
  'vulnerability-management': ['Discovery, dependency scanning, severity, remediation, patching and verification.', 'Set ownership and SLA by severity, verify fixes in deployed artifacts and maintain exception expiry/approval.'],
  compliance: ['Legal, regulatory, contractual and industry requirements by operating market.', 'Maintain a jurisdictional obligations register; legal review determines applicability and this document translates approved obligations into controls.']
};

const operations = {
  deployment: ['Application, service, database and infrastructure deployment process.', 'Use repeatable CI artifacts, approval gates, migration compatibility checks, progressive rollout, observability and documented rollback.'],
  monitoring: ['Observability requirements across services and infrastructure.', 'Define service-level indicators, dashboards, ownership, retention and the path from alert to trace/log/correlation ID.'],
  backups: ['Operational backup schedules, retention, validation and restore testing.', 'Name accountable owner, encrypted storage, recovery evidence and escalation for failed backups.'],
  'disaster-recovery': ['Operational recovery after infrastructure or service failure.', 'Translate architecture RTO/RPO into runbooks, role assignments, communications, decision authority and exercised restoration.'],
  'incident-response': ['Technical incident detection, escalation, mitigation, communication and post-incident review.', 'Separate incident response from security investigation where necessary; preserve timelines and evidence.'],
  environments: ['Development, staging and production environment purpose and separation.', 'No production data/secrets in lower environments without approved controls; promotion uses immutable artifacts and scoped credentials.'],
  'ci-cd': ['CI/CD pipelines, quality gates, artifacts, deployment promotion and branch protection.', 'Pipelines run lint, typecheck, tests, security checks and migration validation; credentials are short-lived and least privileged.'],
  'release-management': ['Versioning, preparation, approval, deployment, rollback and release notes.', 'Every release names owner, scope, risk, migration state, rollout metric and rollback/forward-fix decision path.'],
  'infrastructure-management': ['Hosting, network, compute, storage, database, domains, certificates and resource management.', 'Manage infrastructure as reviewed configuration, tag ownership/cost, restrict change access and maintain inventory.'],
  'database-operations': ['Routine migrations, maintenance, optimization, monitoring and recovery.', 'Use reviewed runbooks, query/lock observation, backup verification and a clear stop/rollback condition.'],
  logging: ['Application, infrastructure, security, audit and database logging.', 'Use structured logs with correlation/tenant context, redaction, access control, retention and tamper-aware audit separation.'],
  alerting: ['Alert severity, routing, escalation and noise control.', 'Alert on actionable symptoms tied to an owner/runbook; tune thresholds with error budgets and measure acknowledgement/resolution.'],
  'performance-monitoring': ['Frontend, API, database, realtime, infrastructure and integration performance metrics.', 'Set user-impact thresholds, synthetic checks and profiling procedures; regressions block or constrain release.'],
  'capacity-planning': ['Forecasting for users, traffic, storage, transactions and operational growth.', 'Review demand assumptions and headroom on a cadence, link forecast thresholds to scaling actions and budget owner.'],
  scaling: ['When/how compute, database, storage, APIs, queues, search and realtime scale.', 'Scale from measured bottlenecks with tested runbooks; preserve RLS, backups, observability and cost controls.'],
  maintenance: ['Planned dependency, database and infrastructure maintenance plus communication.', 'Define change window, impact, owner, backup, rollback, status updates and post-maintenance validation.'],
  'dependency-management': ['Selection, versioning, vulnerabilities, updates, lockfiles and removal.', 'Prefer maintained, licensed dependencies; pin reproducible lockfiles and remove unused packages after compatibility checks.'],
  'secret-rotation': ['Rotation of API keys, credentials, signing keys, certificates and sensitive credentials.', 'Support overlapping validity, inventory consumers, test replacement, revoke old secret and record completion without exposing values.'],
  'business-continuity': ['Maintaining critical business operations during technical, operational, infrastructure or external disruption.', 'Identify critical services, manual fallback, authority, communications, vendor dependencies and recovery exercise cadence.']
};

const sectionSources = {
  '00-overview': 'Business and ecosystem assumptions; downstream architecture must preserve these constraints.',
  '01-architecture': 'Technical boundary specification; implementation details must align with the relevant domain and security pages.',
  '02-domain': 'Business capability ownership; persistent representations are governed by the database documentation.',
  '03-database': 'Database design contract; actual change is delivered through reviewed Supabase migrations.',
  '04-api': 'Boundary contract for applications, Edge Functions, workers and partners.',
  '05-product': 'Role-specific functional contract; UI implementation must use owned domain contracts.',
  '06-security': 'Mandatory control requirements; exceptions need security-owner approval and an expiry.',
  '07-operations': 'Production operating requirements; executable runbooks may live with infrastructure but must link here.'
};

function page(title, section, item) {
  const [scope, rules] = item;
  return `# ${title}\n\n> **Status:** Baseline controlled specification. Update this document in the same change as any contract it governs.\n\n## Purpose and boundary\n\n${scope}\n\n${rules}\n\n## Implementation contract\n\n- Name the accountable domain or operational owner before adding a new capability.\n- Link changes to the source implementation, schema migration, API/event contract and tests that enforce the stated rule.\n- Preserve organisation scoping, audit context, privacy classification and error/retry behavior at every boundary.\n- Record a new ADR when this document's decision changes a durable architecture, tenancy, payment, identity or integration choice.\n\n## Required content when this specification is expanded\n\n1. Definitions and state/lifecycle rules, including allowed transitions and invalid states.\n2. Actors, permissions, tenant boundaries and consent/privacy implications.\n3. Owned data and contracts: commands, queries, events, storage or operational artifacts.\n4. Failure behavior, idempotency/concurrency where applicable, observability and test evidence.\n5. Explicit links to related documents without copying their authoritative details.\n\n## Non-duplication rule\n\n${sectionSources[section]} This page is authoritative only for the boundary stated above; it links to, rather than repeats, details owned by another document.\n`;
}

const sections = [
  ['00-overview', overview], ['01-architecture', architecture], ['02-domain', domains],
  ['03-database', database], ['04-api', api], ['05-product', products],
  ['06-security', security], ['07-operations', operations]
];
for (const [section, entries] of sections) {
  for (const [name, item] of Object.entries(entries)) {
    const title = `ACCERA ${name.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')}`;
    const file = join(docsRoot, section, `${name}.md`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page(title, section, item));
  }
}

const adrRoot = join(docsRoot, '08-decisions');
const adrs = [
  ['0001', 'monorepo', 'Use a pnpm/Turborepo monorepo for coordinated applications, packages, services and configuration.', 'Shared domain contracts and design primitives need atomic changes; independent deployment remains possible through task filtering.', 'Separate repositories, which would duplicate versioning and make cross-role contract changes unsafe.'],
  ['0002', 'supabase', 'Use Supabase PostgreSQL, Auth, Storage, Realtime and Edge Functions as the managed application platform.', 'It provides relational integrity, RLS and managed primitives suited to a tenant-aware sports platform; provider adapters protect portability.', 'A custom-auth plus self-managed database stack at the foundation stage.'],
  ['0003', 'application-boundaries', 'Provide role-specific applications that compose shared domain packages.', 'Player, coach, facility, competition, official and admin workflows differ materially, while business rules and contracts must remain singular.', 'One universal UI with role flags, or per-role duplicated domain implementations.'],
  ['0004', 'authentication-model', 'Use Supabase Auth for identity and server-verified JWT sessions, with authorization evaluated separately.', 'Managed identity supports secure standard flows; organisation membership and RLS provide tenant/resource authorization.', 'Client-trusted roles or application-only authorization without database enforcement.'],
  ['0005', 'multi-tenant-model', 'Model organisations as first-class tenants and enforce access through membership, scoped permissions and RLS.', 'Organisations, branches and relationships need explicit topology while users can participate in multiple tenants.', 'Database-per-tenant or a client-supplied tenant ID without RLS.'],
  ['0006', 'payment-architecture', 'Keep payment providers behind adapters and record ACCERA financial truth in the finance domain.', 'Provider callbacks are unreliable and provider objects are not a complete ledger; idempotent, audited local records support reconciliation.', 'Provider-specific payment logic embedded in products or treating webhook delivery as the sole state store.'],
  ['0007', 'event-architecture', 'Publish durable, versioned domain events after committed state changes; process side effects asynchronously.', 'This decouples notifications, analytics, search and integrations while preserving synchronous authority for user-visible decisions.', 'Synchronous fan-out between all domains or unversioned event payloads.'],
  ['0008', 'ai-boundaries', 'Use AI only through governed services for assistive/derived work, never as the authority for core business or access decisions.', 'Protects determinism, explainability, cost and sensitive data while allowing supervised intelligence features.', 'Embedding model calls directly in product components or allowing model output to mutate core records without review.']
];
mkdirSync(adrRoot, { recursive: true });
writeFileSync(join(adrRoot, 'README.md'), `# Architecture Decision Records\n\nADRs preserve decisions with significant, durable consequences. Create the next sequential ADR before implementing a consequential change; keep the status current and supersede rather than rewrite historical context.\n\nEach ADR states context, decision, consequences, rejected alternatives, implementation links and conditions that justify reversal.\n`);
for (const [number, slug, decision, rationale, rejected] of adrs) {
  writeFileSync(join(adrRoot, `ADR-${number}-${slug}.md`), `# ADR-${number}: ${slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')}\n\n- **Status:** Accepted\n- **Date:** 2026-08-22\n- **Decision owners:** ACCERA architecture group\n\n## Context\n\nACCERA requires documented decisions that prevent later contributors from reinterpreting core platform constraints.\n\n## Decision\n\n${decision}\n\n## Consequences\n\n${rationale}\n\nImplementation must update the relevant architecture, domain, security and operational documents, with tests or runbooks that demonstrate compliance.\n\n## Alternatives rejected\n\n${rejected}\n\n## Revisit when\n\nMaterial evidence changes the stated rationale: product scale, regulatory requirement, provider capability, cost, reliability, security posture or a validated migration path. Any replacement requires a new ADR and a transition plan.\n`);
}

writeFileSync(join(docsRoot, 'README.md'), `# ACCERA Documentation\n\nThis directory is the controlled implementation contract for ACCERA. Read the relevant overview, architecture, domain, database/API, security and operations documents before changing a boundary.\n\n| Directory | Owns |\n| --- | --- |\n| \`00-overview\` | Product direction, markets, ecosystem and economics |\n| \`01-architecture\` | System and technical boundaries |\n| \`02-domain\` | Business capability ownership |\n| \`03-database\` | Persistent-model and RLS rules |\n| \`04-api\` | Application/service/event contracts |\n| \`05-product\` | Role-specific functional contracts |\n| \`06-security\` | Mandatory protection and compliance controls |\n| \`07-operations\` | Production operation and recovery |\n| \`08-decisions\` | Durable architecture decisions and their rationale |\n\nDocumentation is versioned with code. Do not copy authoritative details into a neighboring page: link to its owner instead.\n`);
