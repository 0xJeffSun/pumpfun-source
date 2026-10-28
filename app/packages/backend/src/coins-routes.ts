/**
 * Native /coins read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over generic fixture replay.
 * Serves deterministic data from the in-memory CoinStore.
 */
import type { FastifyInstance } from 'fastify';
import { CoinStore, defaultCoinStore } from './coins-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/**
 * Routes handled natively and therefore excluded from the generic replay loop.
 * Key: `METHOD /path` using OpenAPI template paths.
 */
export const NATIVE_COIN_ROUTES: readonly string[] = [
  'GET /coins',
  'GET /coins/trending',
  'GET /coins/new',
  'GET /coins/top',
  'GET /coins/search',
  'GET /coins/{mint}',
  'POST /coins/batch',
  'GET /coins/{mint}/trades',
  'GET /coins/{mint}/holders',
];

export function registerCoinRoutes(app: FastifyInstance, store: CoinStore = defaultCoinStore): void {
  const asInt = (v?: string) => {
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  };

  /**
   * GET /v1/coins/trending
   * Trending coins by activity within a timeframe.
   * Returns: 200, Coin[]
   * NOTE: Registered before /v1/coins/:mint to prevent route shadowing.
   */
  app.get('/v1/coins/trending', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.listTrending({
      timeframe: qs.timeframe,
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/coins/new
   * Newest coins by creation timestamp.
   * Returns: 200, Coin[]
   * NOTE: Registered before /v1/coins/:mint.
   */
  app.get('/v1/coins/new', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.listNew({
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/coins/top
   * Top coins by USD market cap.
   * Returns: 200, Coin[]
   * NOTE: Registered before /v1/coins/:mint.
   */
  app.get('/v1/coins/top', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.listTopMarketCap({
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/coins/search
   * Search coins by name, symbol, or description.
   * Returns: 200, Coin[]
   * NOTE: Registered before /v1/coins/:mint.
   */
  app.get('/v1/coins/search', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const includeNsfw = qs.includeNsfw === 'true' || qs.includeNsfw === '1';
    const result = store.search({
      searchTerm: qs.searchTerm,
      sort: qs.sort,
      order: qs.order,
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
      includeNsfw,
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * POST /v1/coins/batch
   * Batch fetch coins by mint addresses.
   * Request body: { mints: string[] }
   * Returns: 200, Coin[]
   * NOTE: Registered before /v1/coins/:mint.
   */
  app.post('/v1/coins/batch', async (request, reply) => {
    const body = request.body as { mints?: string[] } | null;
    if (!body || !Array.isArray(body.mints)) {
      return reply.code(400).send(errorBody(400, 'MINTS_REQUIRED'));
    }
    // Contract declares maxItems: 100 on mints. Reject rather than silently truncate.
    if (body.mints.length > 100) {
      return reply.code(400).send(errorBody(400, 'TOO_MANY_MINTS', { maxItems: 100, received: body.mints.length }));
    }
    const result = store.batch(body.mints);
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/coins/:mint/trades
   * Recent trades for a coin.
   * Returns: 200, { trades: CoinTrade[] }, or 404 for unknown mints.
   * NOTE: Registered before /v1/coins/:mint.
   */
  app.get('/v1/coins/:mint/trades', async (request, reply) => {
    const { mint } = request.params as { mint: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const trades = store.getTrades(mint, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    if (!trades) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, { trades });
  });

  /**
   * GET /v1/coins/:mint/holders
   * Token holders for a coin sorted by amount descending.
   * Returns: 200, { holders: CoinHolder[] }, or 404 for unknown mints.
   * NOTE: Registered before /v1/coins/:mint.
   */
  app.get('/v1/coins/:mint/holders', async (request, reply) => {
    const { mint } = request.params as { mint: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const holders = store.getHolders(mint, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    if (!holders) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, { holders });
  });

  /**
   * GET /v1/coins/:mint
   * Get a single coin by mint address.
   * Returns: 200 with Coin, or 404 with error body.
   */
  app.get('/v1/coins/:mint', async (request, reply) => {
    const { mint } = request.params as { mint: string };
    const coin = store.getByMint(mint);
    if (!coin) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, coin);
  });

  /**
   * GET /v1/coins
   * List coins with optional sort, filter, and pagination.
   * Returns: 200, Coin[]
   */
  app.get('/v1/coins', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const includeNsfw = qs.includeNsfw === 'true' || qs.includeNsfw === '1';
    const result = store.search({
      sort: qs.sort,
      order: qs.order,
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
      includeNsfw,
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /services/frontend/sol-price
   * SOL price endpoint. No API key gate (different prefix).
   * Returns: 200, { price: number, source: string, timestamp: string }
   *
   * NOTE: This is registered on the parent app instance via the returned function
   * so it can bypass the API key preHandler. Callers should register this route
   * outside the API-key-gated plugin scope.
   */
}

/**
 * Register the sol-price route that bypasses the API key gate.
 * Call this directly on the top-level app instance, not inside the gated plugin.
 */
export function registerSolPriceRoute(app: FastifyInstance, store: CoinStore = defaultCoinStore): void {
  app.get('/services/frontend/sol-price', async (_request, reply) => {
    return sendSynthetic(reply, 200, store.getSolPrice());
  });
}
