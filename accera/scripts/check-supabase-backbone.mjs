import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "supabase");
const expectedMigrations = [
  "00001_extensions.sql",
  "00002_core.sql",
  "00003_organisations.sql",
  "00004_sports.sql",
  "00005_facilities.sql",
  "00006_academy.sql",
  "00007_competition.sql",
  "00008_finance.sql",
  "00009_commerce.sql",
  "00010_sponsorship.sql",
  "00011_performance.sql",
  "00012_content.sql",
  "00013_intelligence.sql",
  "00014_rls.sql",
  "00015_indexes.sql",
  "00016_rls_core.sql",
  "00017_rls_organisations.sql",
  "00018_rls_sports.sql",
  "00019_rls_facilities.sql",
  "00020_rls_academy.sql",
  "00021_rls_competition.sql",
  "00022_rls_finance.sql",
  "00023_rls_commerce.sql",
  "00024_rls_sponsorship.sql",
  "00025_rls_performance.sql",
  "00026_rls_content.sql",
  "00027_rls_intelligence.sql",
];
let failed = false;
for (const migration of expectedMigrations) {
  const file = join(root, "migrations", migration);
  if (!existsSync(file) || readFileSync(file, "utf8").trim().length < 100) {
    console.error(`Missing or incomplete migration: ${migration}`);
    failed = true;
  }
}
const migrations = readdirSync(join(root, "migrations"))
  .filter((file) => file.endsWith(".sql"))
  .sort();
if (migrations.join("|") !== expectedMigrations.join("|")) {
  console.error(
    "Migration set differs from the controlled ordered backbone. Add a new numbered migration rather than renaming an existing one.",
  );
  failed = true;
}
const required = [
  "config.toml",
  "types/database.ts",
  "types/enums.ts",
  "types/functions.ts",
  "types/views.ts",
];
for (const path of required) {
  const file = join(root, path);
  if (!existsSync(file) || readFileSync(file, "utf8").trim().length === 0) {
    console.error(`Missing required Supabase artifact: ${path}`);
    failed = true;
  }
}
function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);
    if (statSync(file).isDirectory()) visit(file);
    else if (
      file.endsWith(".ts") &&
      readFileSync(file, "utf8").trim().length === 0
    ) {
      console.error(`Empty Edge Function source: ${file}`);
      failed = true;
    }
  }
}
visit(join(root, "functions"));
const rlsFiles = migrations.filter((file) => file.includes("_rls"));
for (const file of rlsFiles) {
  const content = readFileSync(join(root, "migrations", file), "utf8");
  if (!/create policy/i.test(content) && file !== "00014_rls.sql") {
    console.error(`RLS domain migration has no policies: ${file}`);
    failed = true;
  }
}
const rlsFoundation = readFileSync(
  join(root, "migrations", "00014_rls.sql"),
  "utf8",
);
for (const predicate of [
  "app.is_platform_admin",
  "app.is_organisation_member",
  "app.has_organisation_permission",
  "app.can_access_facility",
  "app.can_access_academy",
  "app.can_access_competition",
]) {
  if (!rlsFoundation.includes(predicate)) {
    console.error(`Missing required RLS predicate: ${predicate}`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log(
  "Supabase backbone structure and controlled migration ordering checks passed.",
);
