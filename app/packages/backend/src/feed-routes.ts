/**
 * Native /feed and /callout read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over the generic
 * fixture-replay loop. Serves deterministic data from the in-memory FeedStore.
 */
import type { FastifyInstance } from 'fastify';
import { FeedStore, defaultFeedStore } from './feed-store.js';
import { sendSynthetic } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_FEED_ROUTES = new Set<string>([
  'GET /feed/home',
  'GET /feed/coin/{mint}',
  'GET /feed/user/{userId}',
  'GET /callout/coin/{coin}',
  'GET /callouts',
]);

export function registerFeedRoutes(app: FastifyInstance, store: FeedStore = defaultFeedStore): void {
  /**
   * GET /v1/feed/home
   * Home feed with tab, cursor, and limit.
   */
  app.get('/v1/feed/home', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const limit = qs.limit ? Number(qs.limit) : undefined;
    const result = store.getHomeFeed({
      tab: qs.tab as 'for-you' | 'following' | undefined,
      viewerId: qs.viewerId,
      cursor: qs.cursor,
      limit: limit !== undefined && Number.isFinite(limit) ? Math.trunc(limit) : undefined,
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/feed/coin/:mint
   * Feed items for a specific coin.
   */
  app.get('/v1/feed/coin/:mint', async (request, reply) => {
    const { mint } = request.params as { mint: string };
    const qs = request.query as Record<string, string | undefined>;
    const limit = qs.limit ? Number(qs.limit) : undefined;
    const result = store.getCoinFeed(mint, {
      cursor: qs.cursor,
      limit: limit !== undefined && Number.isFinite(limit) ? Math.trunc(limit) : undefined,
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/feed/user/:userId
   * Feed items authored by a user.
   */
  app.get('/v1/feed/user/:userId', async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const qs = request.query as Record<string, string | undefined>;
    const limit = qs.limit ? Number(qs.limit) : undefined;
    const result = store.getUserFeed(userId, {
      cursor: qs.cursor,
      limit: limit !== undefined && Number.isFinite(limit) ? Math.trunc(limit) : undefined,
      includeReplies: qs.includeReplies === 'true',
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/callout/coin/:coin
   * Callouts for a specific coin (matches OpenAPI: get_callout_coin_by_coin).
   */
  app.get('/v1/callout/coin/:coin', async (request, reply) => {
    const { coin } = request.params as { coin: string };
    const qs = request.query as Record<string, string | undefined>;
    const limit = qs.limit ? Number(qs.limit) : undefined;
    const result = store.getCallouts({
      coinMint: coin,
      sort: qs.sort,
      cursor: qs.cursor,
      limit: limit !== undefined && Number.isFinite(limit) ? Math.trunc(limit) : undefined,
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/callouts
   * All callouts with optional sort and pagination.
   */
  app.get('/v1/callouts', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;
    const limit = qs.limit ? Number(qs.limit) : undefined;
    const result = store.getCallouts({
      sort: qs.sort,
      cursor: qs.cursor,
      limit: limit !== undefined && Number.isFinite(limit) ? Math.trunc(limit) : undefined,
    });
    return sendSynthetic(reply, 200, result);
  });
}
