import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/bin'],
    format: ['esm', 'cjs'],
    clean: true,
    dts: true,
  },
]);
