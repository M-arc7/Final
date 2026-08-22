import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const packageRoot = join(process.cwd(), 'packages');
const foundation = new Set(['core', 'utils', 'design-system']);
const infrastructure = new Set(['auth', 'database', 'payments', 'notifications', 'analytics', 'api', 'ui']);
const domains = new Set(['sports', 'facilities', 'academy', 'competition', 'commerce', 'finance', 'sponsorship', 'performance', 'content']);
const intelligence = new Set(['intelligence']);
const allPackages = [...foundation, ...infrastructure, ...domains, ...intelligence];
const names = new Map(allPackages.map((directory) => [directory, `@accera/${directory}`]));
let failed = false;

function report(message) {
  console.error(message);
  failed = true;
}

function allowedDependencies(directory) {
  if (foundation.has(directory)) return new Set();
  // API transport composes authentication guards, but it still must not depend on a
  // domain package. Domain services are wired at an application/service composition
  // root through explicit operation contracts.
  if (directory === 'api') return new Set([...foundation, 'auth']);
  if (infrastructure.has(directory)) return new Set(foundation);
  if (domains.has(directory)) return new Set([...foundation, ...infrastructure]);
  return new Set([...foundation, ...infrastructure]);
}

function visit(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) visit(path);
    else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) inspectSource(path);
  }
}

function inspectSource(path) {
  const owner = relative(packageRoot, path).split('/')[0];
  const manifest = manifests.get(owner);
  if (!manifest) return;
  const source = readFileSync(path, 'utf8');
  for (const match of source.matchAll(/(?:from\s*|import\s*)["'](@accera\/[^"']+)["']/g)) {
    const imported = match[1].split('/')[1];
    if (!imported || !names.has(imported)) continue;
    const dependencyName = names.get(imported);
    if (!(dependencyName in (manifest.dependencies ?? {}) || dependencyName in (manifest.peerDependencies ?? {}))) {
      report(`${relative(process.cwd(), path)} imports ${dependencyName} without declaring it.`);
    }
    if (!allowedDependencies(owner).has(imported)) {
      report(`${relative(process.cwd(), path)} violates the package dependency direction: ${owner} -> ${imported}.`);
    }
  }
}

const manifests = new Map();
for (const directory of allPackages) {
  const root = join(packageRoot, directory);
  const manifestPath = join(root, 'package.json');
  const entryPoint = join(root, 'index.ts');
  const tsconfigPath = join(root, 'tsconfig.json');
  if (!existsSync(root)) { report(`Missing required package directory: packages/${directory}`); continue; }
  if (!existsSync(manifestPath)) { report(`Missing package manifest: packages/${directory}/package.json`); continue; }
  if (!existsSync(entryPoint)) report(`Missing public entry point: packages/${directory}/index.ts`);
  if (!existsSync(tsconfigPath)) report(`Missing TypeScript configuration: packages/${directory}/tsconfig.json`);
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifests.set(directory, manifest);
  if (manifest.name !== names.get(directory)) report(`packages/${directory} must be named ${names.get(directory)}.`);
  if (manifest.private !== true || manifest.type !== 'module') report(`packages/${directory} must be a private ESM workspace package.`);
  if (manifest.exports?.['.'] !== './index.ts') report(`packages/${directory} must export its public entry point.`);
  for (const dependencyName of Object.keys(manifest.dependencies ?? {})) {
    if (!dependencyName.startsWith('@accera/')) continue;
    const target = [...names.entries()].find(([, name]) => name === dependencyName)?.[0];
    if (!target) report(`packages/${directory} declares unknown workspace dependency ${dependencyName}.`);
    else if (!allowedDependencies(directory).has(target)) report(`packages/${directory} violates the package dependency direction: ${directory} -> ${target}.`);
  }
}

for (const directory of allPackages) {
  const root = join(packageRoot, directory);
  if (existsSync(root)) visit(root);
}

if (failed) process.exit(1);
console.log('Package architecture boundary checks passed.');
