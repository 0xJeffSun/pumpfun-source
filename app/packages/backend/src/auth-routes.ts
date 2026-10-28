/**
 * Native /auth read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over generic fixture replay.
 * Serves deterministic data from the in-memory AuthStore.
 */
import type { FastifyInstance } from 'fastify';
import { AuthStore, defaultAuthStore } from './auth-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_AUTH_ROUTES = new Set<string>([
  'GET /auth/session/{sessionId}',
  'GET /auth/sessions/{wallet}',
  'POST /auth/validate-key',
  'GET /auth/account/{wallet}',
  'GET /auth/linked-accounts/{wallet}',
  'GET /auth/api-keys/{wallet}',
]);

export function registerAuthRoutes(app: FastifyInstance, store: AuthStore = defaultAuthStore): void {
  /**
   * GET /v1/auth/session/:sessionId
   * Get a session by ID.
   */
  app.get('/v1/auth/session/:sessionId', async (request, reply) => {
    const { sessionId } = request.params as { sessionId: string };
    const session = store.getSession(sessionId);
    if (!session) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, session);
  });

  /**
   * GET /v1/auth/sessions/:wallet
   * Get all sessions for a wallet.
   */
  app.get('/v1/auth/sessions/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    return sendSynthetic(reply, 200, store.getSessionsByWallet(wallet));
  });

  /**
   * POST /v1/auth/validate-key
   * Validate an API key prefix.
   * Body: { apiKey: string }
   */
  app.post('/v1/auth/validate-key', async (request, reply) => {
    const body = request.body as { apiKey?: string } | null;
    if (!body || typeof body.apiKey !== 'string') {
      return reply.code(400).send(errorBody(400, 'API_KEY_REQUIRED'));
    }
    return sendSynthetic(reply, 200, store.validateApiKey(body.apiKey));
  });

  /**
   * GET /v1/auth/account/:wallet
   * Get account info for a wallet.
   */
  app.get('/v1/auth/account/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const account = store.getAccount(wallet);
    if (!account) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, account);
  });

  /**
   * GET /v1/auth/linked-accounts/:wallet
   * Get linked accounts for a wallet.
   */
  app.get('/v1/auth/linked-accounts/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    return sendSynthetic(reply, 200, store.getLinkedAccounts(wallet));
  });

  /**
   * GET /v1/auth/api-keys/:wallet
   * Get API keys for a wallet.
   */
  app.get('/v1/auth/api-keys/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    return sendSynthetic(reply, 200, store.getApiKeys(wallet));
  });
}
