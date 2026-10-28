/**
 * Native /competitions read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over generic fixture replay.
 * Serves deterministic data from in-memory CompetitionStore linked to UserStore.
 */
import type { FastifyInstance } from 'fastify';
import { CompetitionStore, defaultCompetitionStore } from './competitions-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

export function registerCompetitionRoutes(
  app: FastifyInstance,
  store: CompetitionStore = defaultCompetitionStore,
): void {
  /**
   * GET /v1/competitions
   * Every competition in three viewer-independent buckets: upcoming, live, and past.
   * Returns: 200, { upcoming: Competition[], live: Competition[], past: Competition[] }
   */
  app.get('/v1/competitions', async (_request, reply) => {
    const buckets = store.listBuckets();
    return sendSynthetic(reply, 200, buckets);
  });

  /**
   * GET /v1/competitions/:id/entries/:entryId/highlights
   * One entry's highlight reel: its top tokens by PnL during the competition window.
   * Returns: 200, { entryId: string, tokens: EntryHighlightToken[] }
   * NOTE: Registered before /v1/competitions/:id/entries/:entryId to avoid route shadowing.
   */
  app.get('/v1/competitions/:id/entries/:entryId/highlights', async (request, reply) => {
    const { id, entryId } = request.params as { id: string; entryId: string };
    const qs = request.query as Record<string, string | undefined>;

    let limit = 10;
    if (qs.limit !== undefined) {
      const parsed = Number(qs.limit);
      if (Number.isFinite(parsed)) {
        limit = Math.min(10, Math.max(1, Math.trunc(parsed)));
      }
    }

    const result = store.getEntryHighlights(id, entryId, { limit });
    if (!result) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }

    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/competitions/:id/entries/:entryId
   * One entry with its snapshot roster and each member's counted legs, pnlUsd descending.
   * Returns: 200, { entry: LeaderboardRow, members: Member[] }
   */
  app.get('/v1/competitions/:id/entries/:entryId', async (request, reply) => {
    const { id, entryId } = request.params as { id: string; entryId: string };

    const result = store.getEntryDetail(id, entryId);
    if (!result) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }

    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/competitions/:id/highlights
   * The competition's biggest winning legs across every ranked entry.
   * Returns: 200, { competitionId: string, builtAtMs: number, isFinal: boolean, rows: HighlightRow[] }
   * NOTE: Registered before /v1/competitions/:idOrSlug.
   */
  app.get('/v1/competitions/:id/highlights', async (request, reply) => {
    const { id } = request.params as { id: string };
    const qs = request.query as Record<string, string | undefined>;

    let limit = 20;
    if (qs.limit !== undefined) {
      const parsed = Number(qs.limit);
      if (Number.isFinite(parsed)) {
        limit = Math.min(20, Math.max(1, Math.trunc(parsed)));
      }
    }

    let perMemberLimit = 1;
    if (qs.perMemberLimit !== undefined) {
      const parsed = Number(qs.perMemberLimit);
      if (Number.isFinite(parsed)) {
        perMemberLimit = Math.min(10, Math.max(1, Math.trunc(parsed)));
      }
    }

    const result = store.getCompetitionHighlights(id, { limit, perMemberLimit });
    if (!result) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }

    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/competitions/:idOrSlug
   * One competition by id or slug with its ranked board.
   * Query params: limit (default 100, max 100), positionsLimit (default 3, max 5).
   * Returns: 200, { competition: Competition, leaderboard: Leaderboard }
   */
  app.get('/v1/competitions/:idOrSlug', async (request, reply) => {
    const { idOrSlug } = request.params as { idOrSlug: string };
    const qs = request.query as Record<string, string | undefined>;

    let limit = 100;
    if (qs.limit !== undefined) {
      const parsed = Number(qs.limit);
      if (Number.isFinite(parsed)) {
        limit = Math.min(100, Math.max(0, Math.trunc(parsed)));
      }
    }

    let positionsLimit = 3;
    if (qs.positionsLimit !== undefined) {
      const parsed = Number(qs.positionsLimit);
      if (Number.isFinite(parsed)) {
        positionsLimit = Math.min(5, Math.max(0, Math.trunc(parsed)));
      }
    }

    const result = store.getByIdOrSlug(idOrSlug, { limit, positionsLimit });
    if (!result) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }

    return sendSynthetic(reply, 200, result);
  });
}
