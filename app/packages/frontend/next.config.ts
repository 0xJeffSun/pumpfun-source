import type { NextConfig } from 'next';
import { resolve } from 'node:path';
const config: NextConfig = {
  turbopack: { root: resolve(import.meta.dirname, '../..') },
  async rewrites() { return [{ source: '/api/compat/:path*', destination: `${process.env.BACKEND_URL ?? 'http://127.0.0.1:3001'}/:path*` }]; },
};
export default config;
