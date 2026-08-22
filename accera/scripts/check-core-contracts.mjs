import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'packages/core');
let failed = false;
function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);
    if (statSync(file).isDirectory()) visit(file);
    else if (entry.endsWith('.ts')) {
      const content = readFileSync(file, 'utf8').trim();
      if (!content) { console.error(`Empty core file: ${file}`); failed = true; }
      if (entry === 'index.ts' && !content.split('\n').every((line) => !line.trim() || line.trim().startsWith('//') || line.trim().startsWith('export '))) { console.error(`Index contains implementation logic: ${file}`); failed = true; }
      if (entry.endsWith('.repository.ts') && /from ['"](?:@supabase|supabase-js|react|expo)/.test(content)) { console.error(`Repository imports a platform/UI adapter: ${file}`); failed = true; }
      if (entry.endsWith('.entity.ts') && /\b(fetch|createClient|from\s+['"]@supabase)/.test(content)) { console.error(`Entity contains infrastructure access: ${file}`); failed = true; }
    }
  }
}
visit(root);
if (failed) process.exit(1);
console.log('Core file-layer contract checks passed.');
