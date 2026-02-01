/**
 * auto-version.mjs
 *
 * Pre-commit hook script that bumps the minor version of package.json
 * if and only if the version was not manually changed since the last commit.
 *
 * Usage: node scripts/auto-version.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

try {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  const currentVersion = pkg.version;

  // Get version from last commit
  let headVersion;
  try {
    const headPkg = execSync('git show HEAD:package.json', {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    headVersion = JSON.parse(headPkg).version;
  } catch {
    // First commit — no HEAD exists yet, skip auto-bump
    process.exit(0);
  }

  // If version was manually changed, don't auto-bump
  if (currentVersion !== headVersion) {
    process.exit(0);
  }

  // Parse semver and bump minor, reset patch
  const parts = currentVersion.split('.').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    console.error(`auto-version: could not parse version "${currentVersion}"`);
    process.exit(0);
  }

  const [major, minor] = parts;
  const newVersion = `${major}.${minor + 1}.0`;

  pkg.version = newVersion;
  writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
  execSync('git add package.json');

  console.log(`auto-version: ${currentVersion} → ${newVersion}`);
} catch (err) {
  // Don't block the commit on failure
  console.error('auto-version: failed —', err instanceof Error ? err.message : err);
  process.exit(0);
}
