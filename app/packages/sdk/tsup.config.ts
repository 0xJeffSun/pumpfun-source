import { defineConfig } from 'tsup';
// Reconstructed build configuration; npm tarball does not ship the original config.
export default defineConfig({ entry: { index: 'src/index.ts', 'swap/index': 'src/swap/index.ts' }, format: ['cjs', 'esm'], dts: true, clean: true, splitting: false, sourcemap: true, outExtension({ format }) { return { js: format === 'esm' ? '.mjs' : '.js' }; } });
