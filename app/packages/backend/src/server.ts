import { buildApp, type Fixture } from './app.js';
import { readFileSync } from 'node:fs';
import { loadCalloutsStore } from './callouts-store.js';
const fixtures: Fixture[] = process.env.FIXTURES_FILE ? JSON.parse(readFileSync(process.env.FIXTURES_FILE,'utf8')) : [];
const calloutsStore = process.env.CALLOUTS_FILE ? loadCalloutsStore(process.env.CALLOUTS_FILE) : undefined;
const app = buildApp(fixtures, { calloutsStore });
await app.listen({ host: process.env.HOST ?? '127.0.0.1', port: Number(process.env.PORT ?? 3001) });
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => { void app.close(); });
