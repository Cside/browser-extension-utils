import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/bin'],
    format: ['esm'],
    clean: true,
    dts: true,
    treeshake: true,
  },
]);
