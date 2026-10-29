/**
 * Native /pnl-leaderboard read-operation route.
 *
 * Registered as a native Fastify handler taking priority over generic fixture
 * replay. Serves deterministic synthetic data from LeaderboardStore, with
 * profile fields hydrated from the shared UserStore.
 */
import type { FastifyInstance } from 'fastify';
import {
  LeaderboardStore,
  defaultLeaderboardStore,
  isPeriod,
  isSort,
} from './leaderboard-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

export function registerLeaderboardRoutes(
  app: FastifyInstance,
  store: LeaderboardStore = defaultLeaderboardStore,
): void {
  /**
   * GET /v1/pnl-leaderboard
   * The PnL board for a required period window, ranked by the chosen measure
   * (combined by default), descending.
   * Returns: 200, { entries, periodType, periodLabel, windowStartSec }.
   *
   * `period` is a required enum; a missing or unknown value is a 400 rather than
   * a silent default. `sort`, `positionsLimit` and `limit` default leniently,
   * matching the other native routes.
   */
  app.get('/v1/pnl-leaderboard', async (request, reply) => {
    const qs = request.query as Record<string, string | undefined>;

    if (qs.period === undefined) {
      return reply.code(400).send(errorBody(400, 'PERIOD_REQUIRED', {
        allowed: ['daily', 'weekly', 'monthly'],
      }));
    }
    if (!isPeriod(qs.period)) {
      return reply.code(400).send(errorBody(400, 'INVALID_PERIOD', {
        allowed: ['daily', 'weekly', 'monthly'],
        received: qs.period,
      }));
    }

    const asInt = (value?: string) => {
      if (value === undefined) return undefined;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? Math.trunc(parsed) : undefined;
    };

    const board = store.getBoard({
      period: qs.period,
      // An unknown sort falls back to the default measure instead of failing.
      sort: isSort(qs.sort) ? qs.sort : undefined,
      positionsLimit: asInt(qs.positionsLimit),
      limit: asInt(qs.limit),
    });

    return sendSynthetic(reply, 200, board);
  });
}
