/**
 * Native /notifications read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over the generic
 * fixture-replay loop. Serves deterministic data from the in-memory NotificationStore.
 */
import type { FastifyInstance } from 'fastify';
import { NotificationStore, defaultNotificationStore } from './notifications-store.js';
import { sendSynthetic } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_NOTIFICATION_ROUTES = new Set<string>([
  'GET /notifications/{wallet}',
  'GET /notifications/{wallet}/unread-count',
]);

export function registerNotificationRoutes(app: FastifyInstance, store: NotificationStore = defaultNotificationStore): void {
  /**
   * GET /v1/notifications/:wallet
   * Get notifications for a wallet with optional filters and cursor pagination.
   */
  app.get('/v1/notifications/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const qs = request.query as Record<string, string | undefined>;
    const limit = qs.limit ? Number(qs.limit) : undefined;
    const result = store.getNotifications(wallet, {
      type: qs.type,
      unreadOnly: qs.unreadOnly === 'true',
      cursor: qs.cursor,
      limit: limit !== undefined && Number.isFinite(limit) ? Math.trunc(limit) : undefined,
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/notifications/:wallet/unread-count
   * Get the unread notification count for a wallet.
   */
  app.get('/v1/notifications/:wallet/unread-count', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    return sendSynthetic(reply, 200, { unreadCount: store.getUnreadCount(wallet) });
  });
}
