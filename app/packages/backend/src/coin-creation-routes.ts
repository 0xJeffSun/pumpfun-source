/**
 * Native /coin-creation read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over generic fixture replay.
 * Serves deterministic data from the in-memory CoinCreationStore.
 */
import type { FastifyInstance } from 'fastify';
import { CoinCreationStore, defaultCoinCreationStore } from './coin-creation-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_COIN_CREATION_ROUTES = new Set<string>([
  'GET /coin-creation/drafts/{wallet}',
  'GET /coin-creation/draft/{draftId}',
  'GET /coin-creation/record/{mint}',
  'POST /coin-creation/validate',
]);

export function registerCoinCreationRoutes(
  app: FastifyInstance,
  store: CoinCreationStore = defaultCoinCreationStore,
): void {
  const asInt = (v?: string) => {
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  };

  /**
   * GET /v1/coin-creation/drafts/:wallet
   * List coin creation drafts by creator wallet.
   */
  app.get('/v1/coin-creation/drafts/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getDraftsByCreator(wallet, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/coin-creation/draft/:draftId
   * Get a single draft.
   */
  app.get('/v1/coin-creation/draft/:draftId', async (request, reply) => {
    const { draftId } = request.params as { draftId: string };
    const draft = store.getDraft(draftId);
    if (!draft) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, draft);
  });

  /**
   * GET /v1/coin-creation/record/:mint
   * Get creation record for a confirmed coin.
   */
  app.get('/v1/coin-creation/record/:mint', async (request, reply) => {
    const { mint } = request.params as { mint: string };
    const record = store.getCreationRecord(mint);
    if (!record) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, record);
  });

  /**
   * POST /v1/coin-creation/validate
   * Validate a coin creation draft without saving.
   */
  app.post('/v1/coin-creation/validate', async (request, reply) => {
    const body = request.body as Record<string, unknown> | null;
    if (!body) {
      return reply.code(400).send(errorBody(400, 'BODY_REQUIRED'));
    }
    const result = store.validateDraft(body as any);
    return sendSynthetic(reply, 200, result);
  });
}
