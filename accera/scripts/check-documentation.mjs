import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const required = ['00-overview', '01-architecture', '02-domain', '03-database', '04-api', '05-product', '06-security', '07-operations', '08-decisions'];
const root = join(process.cwd(), 'docs');
let failed = false;
for (const section of required) {
  const directory = join(root, section);
  const files = readdirSync(directory).filter((file) => file.endsWith('.md'));
  if (files.length === 0) {
    console.error(`Missing documentation in ${section}`);
    failed = true;
  }
  for (const file of files) {
    if (readFileSync(join(directory, file), 'utf8').trim().length < 120) {
      console.error(`Incomplete documentation: ${section}/${file}`);
      failed = true;
    }
  }
}
if (failed) process.exit(1);
console.log('Documentation structure and minimum content checks passed.');
