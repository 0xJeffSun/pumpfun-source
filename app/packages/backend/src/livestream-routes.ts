/**
 * Native /livestreams read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over generic fixture replay.
 * Serves deterministic data from the in-memory LivestreamStore.
 */
import type { FastifyInstance } from 'fastify';
import { LivestreamStore, defaultLivestreamStore } from './livestream-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_LIVESTREAM_ROUTES = new Set<string>([
  'GET /livestreams',
  'GET /livestreams/scheduled',
  'GET /livestreams/{streamId}',
  'GET /livestreams/host/{wallet}',
  'GET /livestreams/coin/{mint}',
]);

export function registerLivestreamRoutes(app: FastifyInstance, store: LivestreamStore = defaultLivestreamStore): void {
  const asInt = (v?: string) => {
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  };

  /**
   * GET /v1/livestreams/scheduled
   * Upcoming scheduled streams.
   * NOTE: Registered before /v1/livestreams/:streamId.
   */
  app.get('/v1/livestreams/scheduled', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getScheduledStreams({
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/livestreams/host/:wallet
   * Streams by host wallet.
   * NOTE: Registered before /v1/livestreams/:streamId.
   */
  app.get('/v1/livestreams/host/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getStreamsByHost(wallet, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/livestreams/coin/:mint
   * Get the live stream for a coin.
   * NOTE: Registered before /v1/livestreams/:streamId.
   */
  app.get('/v1/livestreams/coin/:mint', async (request, reply) => {
    const { mint } = request.params as { mint: string };
    const stream = store.getStreamByCoin(mint);
    if (!stream) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, stream);
  });

  /**
   * GET /v1/livestreams/:streamId
   * Single stream detail.
   */
  app.get('/v1/livestreams/:streamId', async (request, reply) => {
    const { streamId } = request.params as { streamId: string };
    const stream = store.getStream(streamId);
    if (!stream) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, stream);
  });

  /**
   * GET /v1/livestreams
   * List streams with optional status filter and pagination.
   */
  app.get('/v1/livestreams', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getLiveStreams({
      status: qs.status,
      sort: qs.sort,
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });
}
