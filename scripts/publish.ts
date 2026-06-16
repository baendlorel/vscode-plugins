import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

import { getPackageInfo } from './common/package-info.js';
import { build } from './build.js';

export function publish(who: string | undefined) {
  const info = getPackageInfo(who);
  build(who);

  const binPath = join(info.path, 'bin');
  mkdirSync(binPath, { recursive: true });

  const nm0 = join(info.path, 'node_modules');
  const nm1 = join(info.path, 'hidden_node_modules');
  if (existsSync(nm0)) {
    renameSync(nm0, nm1);
  }

  const ignoreFile = join(import.meta.dirname, '..', 'configs', '.vscodeignore');
  execSync(`vsce package --ignoreFile ${ignoreFile} -o ${binPath}`, {
    stdio: 'inherit',
    cwd: info.path,
  });

  if (existsSync(nm1)) {
    renameSync(nm1, nm0);
  }
}
