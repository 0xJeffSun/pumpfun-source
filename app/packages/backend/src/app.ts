import Fastify from 'fastify';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export type Fixture = { method: string; path: string; query?: Record<string, string>; status: number; headers?: Record<string, string>; body: unknown; source: string };
export function fixtureKey(method: string, path: string, query: Record<string, string> = {}) {
  return `${method.toUpperCase()} ${path}?${new URLSearchParams(Object.entries(query).sort(([a],[b])=>a.localeCompare(b))).toString()}`;
}
export function buildApp(fixtures: Fixture[] = []) {
  if (fixtures.some(f => !['GET','HEAD'].includes(f.method.toUpperCase()))) throw new Error('Only read-only public fixtures are supported');
  const fixtureMap = new Map<string, Fixture>();
  for (const fixture of fixtures) {
    const key = fixtureKey(fixture.method, fixture.path, fixture.query);
    if (fixtureMap.has(key)) throw new Error(`Duplicate fixture key: ${key}`);
    fixtureMap.set(key, fixture);
  }
  const app = Fastify({ logger: false });
  const specPath = fileURLToPath(new URL('../../../contracts/developer.openapi.json', import.meta.url));
  const specification = readFileSync(specPath,'utf8');
  const spec = JSON.parse(specification) as { paths: Record<string, Record<string, unknown>> };
  app.get('/health', async () => ({ status: 'ok', mode: 'reconstruction', compatibility: 'unqualified' }));
  app.get('/__reconstruction/openapi.json', async (_,reply) => reply.type('application/json').send(specification));
  app.get('/__reconstruction/status', async () => ({ fixtureCount: fixtures.length, specificationSha256: createHash('sha256').update(specification).digest('hex'), compatibility: 'unqualified' }));
  // Routing recognizes documented paths; no fabricated domain responses or live proxy fallback.
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const method of Object.keys(item).filter(m=>['get','post','put','patch','delete','head','options'].includes(m))) {
      app.route({ method: method.toUpperCase() as 'GET', url: '/v1'+path.replace(/\{([^}]+)\}/g, ':$1'), handler: replay });
    }
  }
  app.all('/*', replay);
  function replay(request: { method: string; url: string }, reply: any) {
    // URL normalizes dot segments; fixture paths must match the raw request target.
    const separator = request.url.indexOf('?');
    const pathname = separator < 0 ? request.url : request.url.slice(0, separator);
    const entries = [...new URLSearchParams(separator < 0 ? '' : request.url.slice(separator + 1)).entries()];
    // The initial fixture format cannot represent duplicate query keys: fail explicitly.
    if (new Set(entries.map(([key])=>key)).size !== entries.length) return reply.code(501).send({ error: 'DUPLICATE_QUERY_KEYS_UNIMPLEMENTED' });
    const fixture=fixtureMap.get(fixtureKey(request.method,pathname,Object.fromEntries(entries)));
    if (!fixture) return reply.code(501).send({ error: 'COMPATIBILITY_NOT_IMPLEMENTED', method: request.method, path: pathname });
    if (fixture.headers) reply.headers(fixture.headers);
    // Fastify sends strings verbatim and null as an empty payload, even for JSON.
    const contentType = reply.getHeader('content-type');
    if ((fixture.body === null || typeof fixture.body === 'string') && typeof contentType === 'string' && /^application\/(?:[^;\s]+\+)?json(?:\s*;|$)/i.test(contentType)) {
      return reply.code(fixture.status).send(JSON.stringify(fixture.body));
    }
    return reply.code(fixture.status).send(fixture.body);
  }
  return app;
}
