import { buildApp, type Fixture } from './app.js';
import { readFileSync } from 'node:fs';
import { startWithLocalMedia } from './local-media-runtime.js';
const fixtures: Fixture[] = process.env.FIXTURES_FILE ? JSON.parse(readFileSync(process.env.FIXTURES_FILE,'utf8')) : [];
const app = await startWithLocalMedia(process.env, async (localMedia) => {
  const app = buildApp(fixtures, { localMedia });
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
