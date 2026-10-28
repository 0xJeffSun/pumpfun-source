import { buildApp, type Fixture } from './app.js';
import { readFileSync } from 'node:fs';
const fixtures: Fixture[] = process.env.FIXTURES_FILE ? JSON.parse(readFileSync(process.env.FIXTURES_FILE,'utf8')) : [];
const app = buildApp(fixtures);
await app.listen({ host: process.env.HOST ?? '127.0.0.1', port: Number(process.env.PORT ?? 3001) });
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => { void app.close(); });
