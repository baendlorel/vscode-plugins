import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { getPackageInfo } from './common/package-info.js';
import { build } from './build.js';

export function publish(who: string | undefined) {
  const info = getPackageInfo(who);
  build(who);

  const binPath = join(info.path, 'bin');
  mkdirSync(binPath, { recursive: true });

  const ignoreFile = join(import.meta.dirname, '..', 'configs', '.vscodeignore');
  execSync(`vsce package --ignoreFile ${ignoreFile} -o ./bin`, { stdio: 'inherit', cwd: info.path });
}
