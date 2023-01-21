import { defineConfig } from 'vitest/config';
import { name } from '../package.json';
import { join, resolve } from 'path';

const config = defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress}.config.*'
    ],
    watchExclude: ['**/node_modules/**', '**/dist/**'],
    cache: false,
    name,
    typecheck: {
      tsconfig: join(resolve('./'), '.config', 'tsconfig', 'tsconfig.spec.json')
    },
    // reporters: ['html', 'json']
    logHeapUsage: true
  }
});

export default config;
