import { readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import replace from '@rollup/plugin-replace';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const libPath = process.env.LIB_PACKAGE_PATH as string;
  const srcDir = path.join(libPath, 'src');
  const json = readFileSync(path.join(libPath, 'package.json'), 'utf-8');

  console.log('isDev', isDev);
  return {
    build: {
      emptyOutDir: true,
      lib: {
        entry: path.resolve(srcDir, 'extension.ts'),
        fileName: () => 'extension.js',
        formats: ['cjs'],
      },
      minify: isDev ? false : 'esbuild',
      outDir: 'out',
      rollupOptions: {
        external: ['vscode', /^node:/],
        output: {
          exports: 'named',
          inlineDynamicImports: true,
        },
        plugins: [
          replace({
            preventAssignment: true,
            __IS_DEV__: JSON.stringify(isDev),
            __VERSION__: JSON.parse(json).version,
          }),
        ],
      },
      sourcemap: false,
    },
    resolve: {
      alias: {
        '@/': `${srcDir}/`,
        '@shared/': path.join(import.meta.dirname, '..', 'plugins', '_shared', '/'),
      },
    },
  };
});
