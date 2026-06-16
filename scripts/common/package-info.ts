import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Version } from './version.js';

export const getPackageInfo = (who: string | undefined) => {
  if (!who) {
    console.error('getPackageInfo: No package specified.');
    process.exit(1);
  }

  const packagePath = getPackagePath(who);
  const packageJsonPath = join(packagePath, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  return {
    path: packagePath,
    jsonPath: packageJsonPath,
    version: new Version(packageJson.version),
    json: packageJson,
    name: packageJson.name as string,
    env: { ...process.env, LIB_PACKAGE_PATH: packagePath },
  };
};

export const getPackagePath = (who: string | undefined) => {
  if (!who) {
    console.log('getPackagePath: No package specified.');
    process.exit(1);
  }
  return join(import.meta.dirname, '..', '..', 'packages', who);
};

export const externalFromPeerDependencies = (packagePath: string) => {
  if (!packagePath) {
    return [];
  }

  const packageJsonPath = join(packagePath, 'package.json');
  if (!existsSync(packageJsonPath)) {
    return [];
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
    peerDependencies?: Record<string, string>;
  };

  const packages = Object.keys(packageJson.peerDependencies ?? {});
  if (packages.length === 0) {
    return [];
  }

  return (id: string) => packages.some((name) => id === name || id.startsWith(`${name}/`));
};
