import { buildApp, type Fixture } from './app.js';
import { readFileSync } from 'node:fs';
import { loadCalloutsStore } from './callouts-store.js';
import { loadPositionsStore } from './positions-store.js';
import { startWithLocalMedia } from './local-media-runtime.js';
const fixtures: Fixture[] = process.env.FIXTURES_FILE ? JSON.parse(readFileSync(process.env.FIXTURES_FILE,'utf8')) : [];
const calloutsStore = process.env.CALLOUTS_FILE ? loadCalloutsStore(process.env.CALLOUTS_FILE) : undefined;
const positionsStore = process.env.POSITIONS_FILE ? loadPositionsStore(process.env.POSITIONS_FILE) : undefined;
const app = await startWithLocalMedia(process.env, async (localMedia) => {
  const app = buildApp(fixtures, { calloutsStore, positionsStore, localMedia });
  try {
    await app.listen({ host: process.env.HOST ?? '127.0.0.1', port: Number(process.env.PORT ?? 3001) });
  } catch (startupError) {
    try { await app.close(); }
    catch (cleanupError) { throw new AggregateError([startupError, cleanupError], 'Server startup and cleanup both failed.'); }
    throw startupError;
  }
  return app;
});
for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => { void app.close(); });
