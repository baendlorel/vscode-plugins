import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getPackageInfo } from './common/package-info.js';

export function build(who: string | undefined, isTestBuild = false) {
  const info = getPackageInfo(who);

  console.log(info.name, info.path);
  if (existsSync(join(info.path, 'build.ts'))) {
    execSync('pnpm exec tsx build.ts', { stdio: 'inherit', cwd: info.path, env: info.env });
    return;
  }

  const viteConfig = join(import.meta.dirname, '..', 'vite.config.ts');

  execSync(`vite build --config ${viteConfig} ${info.path} ${isTestBuild ? '--mode development' : ''}`, {
    stdio: 'inherit',
    env: info.env,
  });
}
