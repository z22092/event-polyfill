import { defineConfig } from 'tsup';
import glob from 'glob';
import { resolve, join } from 'path';

const basePath = resolve('./');
console.log(basePath);
const entryPoints = glob.sync(join(basePath, 'src', '**', '*.ts'), {
  ignore: [join(basePath, 'src', '**', '*.spec.ts')]
});

export default defineConfig({
  entry: entryPoints,
  splitting: false,
  sourcemap: true,
  clean: true,
  platform: 'node',
  outDir: join(basePath, 'dist'),
  tsconfig: join(basePath, '.config', 'tsconfig', 'tsconfig.build.json'),
  format: ['esm', 'cjs'],
  dts: true,
  outExtension({ format }) {
    console.log(format);
    return {
      js: `.${format}.js`
    };
  }
});
