/**
 * Native /positions and /trades read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over generic fixture replay.
 * Serves deterministic data from the in-memory PortfolioStore.
 */
import type { FastifyInstance } from 'fastify';
import { PortfolioStore, defaultPortfolioStore } from './portfolio-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/**
 * Routes handled natively and therefore excluded from the generic replay loop.
 * Key: `METHOD /path` using OpenAPI template paths.
 */
export const NATIVE_PORTFOLIO_ROUTES: readonly string[] = [
  'GET /positions/{wallet}',
  'GET /positions/{wallet}/{mint}',
  'GET /positions/{wallet}/pnl',
  'GET /trades/{wallet}',
  'GET /trades/coin/{mint}',
];

export function registerPortfolioRoutes(
  app: FastifyInstance,
  store: PortfolioStore = defaultPortfolioStore,
): void {
  const asInt = (v?: string) => {
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  };

  /**
   * GET /v1/positions/:wallet/pnl
   * PnL summary for a wallet.
   * Returns: 200, PnlSummary
   * NOTE: Registered before /v1/positions/:wallet/:mint to prevent route shadowing.
   */
  app.get('/v1/positions/:wallet/pnl', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const summary = store.getPnlSummary(wallet);
    return sendSynthetic(reply, 200, summary);
  });

  /**
   * GET /v1/trades/coin/:mint
   * Trade history for a specific coin across all wallets.
   * Returns: 200, { trades: Trade[] }
   * NOTE: Registered before /v1/trades/:wallet to prevent route shadowing.
   */
  app.get('/v1/trades/coin/:mint', async (request, reply) => {
    const { mint } = request.params as { mint: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const trades = store.getTradesByMint(mint, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, { trades });
  });

  /**
   * GET /v1/positions/:wallet/:mint
   * Single position detail.
   * Returns: 200 with Position, or 404 with error body.
   * NOTE: Registered before /v1/positions/:wallet to prevent route shadowing.
   */
  app.get('/v1/positions/:wallet/:mint', async (request, reply) => {
    const { wallet, mint } = request.params as { wallet: string; mint: string };
    const position = store.getPosition(wallet, mint);
    if (!position) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, position);
  });

  /**
   * GET /v1/positions/:wallet
   * List positions for a wallet with optional sort, order, offset, limit.
   * Returns: 200, Position[]
   */
  app.get('/v1/positions/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getPositions(wallet, {
      sort: qs.sort,
      order: qs.order,
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/trades/:wallet
   * Trade history for a wallet with optional sort, order, offset, limit, and mint filter.
   * Returns: 200, { trades: Trade[] }
   */
  app.get('/v1/trades/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const trades = store.getTrades(wallet, {
      sort: qs.sort,
      order: qs.order,
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
      mint: qs.mint,
    });
    return sendSynthetic(reply, 200, { trades });
  });
}
