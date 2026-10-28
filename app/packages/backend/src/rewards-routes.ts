/**
 * Native /rewards and /fees read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over the generic
 * fixture-replay loop. Serves deterministic data from the in-memory RewardStore.
 */
import type { FastifyInstance } from 'fastify';
import { RewardStore, defaultRewardStore } from './rewards-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_REWARD_ROUTES = new Set<string>([
  'GET /rewards/{wallet}',
  'GET /rewards/{wallet}/summary',
  'GET /rewards/{wallet}/holder',
  'GET /rewards/{wallet}/creator-payouts',
  'GET /rewards/{wallet}/referral',
  'GET /fees/schedule',
]);

export function registerRewardRoutes(app: FastifyInstance, store: RewardStore = defaultRewardStore): void {
  const asInt = (v?: string) => {
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  };

  /**
   * GET /v1/rewards/:wallet
   * Get all rewards for a wallet with optional type filter.
   */
  app.get('/v1/rewards/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getRewards(wallet, {
      type: qs.type,
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/rewards/:wallet/summary
   * Get aggregated reward summary.
   */
  app.get('/v1/rewards/:wallet/summary', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    return sendSynthetic(reply, 200, store.getRewardSummary(wallet));
  });

  /**
   * GET /v1/rewards/:wallet/holder
   * Get holder-type rewards.
   */
  app.get('/v1/rewards/:wallet/holder', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    return sendSynthetic(reply, 200, store.getHolderRewards(wallet, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    }));
  });

  /**
   * GET /v1/rewards/:wallet/creator-payouts
   * Get creator-type payouts.
   */
  app.get('/v1/rewards/:wallet/creator-payouts', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    return sendSynthetic(reply, 200, store.getCreatorPayouts(wallet, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    }));
  });

  /**
   * GET /v1/rewards/:wallet/referral
   * Get referral info.
   */
  app.get('/v1/rewards/:wallet/referral', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    return sendSynthetic(reply, 200, store.getReferralInfo(wallet));
  });

  /**
   * GET /v1/fees/schedule
   * Get the current fee schedule.
   */
  app.get('/v1/fees/schedule', async (_request, reply) => {
    return sendSynthetic(reply, 200, store.getFeeSchedule());
  });
}
