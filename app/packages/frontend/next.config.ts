import type { NextConfig } from 'next';
import { resolve } from 'node:path';
const config: NextConfig = {
  // Same documented Node-only SDK dependency boundary qualified by #893.
  serverExternalPackages: ['@pump-fun/agent-payments-sdk'],
  turbopack: { root: resolve(import.meta.dirname, '../..') },
  async rewrites() { return [{ source: '/api/compat/:path*', destination: `${process.env.BACKEND_URL ?? 'http://127.0.0.1:3001'}/:path*` }]; },
};
export default config;
