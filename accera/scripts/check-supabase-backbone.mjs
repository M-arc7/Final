import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'supabase');
const expectedMigrations = [
  '00001_extensions.sql', '00002_core.sql', '00003_organisations.sql', '00004_sports.sql',
  '00005_facilities.sql', '00006_academy.sql', '00007_competition.sql', '00008_finance.sql',
  '00009_commerce.sql', '00010_sponsorship.sql', '00011_performance.sql', '00012_content.sql',
  '00013_intelligence.sql', '00014_rls.sql', '00015_indexes.sql'
];
let failed = false;
for (const migration of expectedMigrations) {
  const file = join(root, 'migrations', migration);
  if (!existsSync(file) || readFileSync(file, 'utf8').trim().length < 100) {
    console.error(`Missing or incomplete migration: ${migration}`);
    failed = true;
  }
}
const migrations = readdirSync(join(root, 'migrations')).filter((file) => file.endsWith('.sql')).sort();
if (migrations.join('|') !== expectedMigrations.join('|')) {
  console.error('Migration set differs from the controlled ordered backbone. Add a new numbered migration rather than renaming an existing one.');
  failed = true;
}
const required = ['config.toml', 'types/database.ts', 'types/enums.ts', 'types/functions.ts', 'types/views.ts'];
for (const path of required) {
  const file = join(root, path);
  if (!existsSync(file) || readFileSync(file, 'utf8').trim().length === 0) {
    console.error(`Missing required Supabase artifact: ${path}`);
    failed = true;
  }
}
function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);
    if (statSync(file).isDirectory()) visit(file);
    else if (file.endsWith('.ts') && readFileSync(file, 'utf8').trim().length === 0) {
      console.error(`Empty Edge Function source: ${file}`);
      failed = true;
    }
  }
}
visit(join(root, 'functions'));
if (failed) process.exit(1);
console.log('Supabase backbone structure and controlled migration ordering checks passed.');
