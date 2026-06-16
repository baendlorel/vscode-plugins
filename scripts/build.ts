import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getPackageInfo } from './common/package-info.js';

export function build(who: string | undefined) {
  const info = getPackageInfo(who);

  console.log(info.name, info.path);
  if (existsSync(join(info.path, 'build.ts'))) {
    execSync('pnpm exec tsx build.ts', { stdio: 'inherit', cwd: info.path, env: info.env });
    return;
  }

  const viteConfig = join(import.meta.dirname, '..', 'configs', 'vite.config.ts');

  execSync(`vite build --config ${viteConfig} ${info.path}`, { stdio: 'inherit', env: info.env });
}
