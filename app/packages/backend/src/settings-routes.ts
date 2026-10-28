/**
 * Native /settings read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over the generic
 * fixture-replay loop. Serves deterministic data from the in-memory SettingsStore.
 */
import type { FastifyInstance } from 'fastify';
import { SettingsStore, defaultSettingsStore } from './settings-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_SETTINGS_ROUTES = new Set<string>([
  'GET /settings/{wallet}',
  'GET /settings/{wallet}/notifications',
  'GET /settings/{wallet}/privacy',
]);

export function registerSettingsRoutes(app: FastifyInstance, store: SettingsStore = defaultSettingsStore): void {
  /**
   * GET /v1/settings/:wallet
   * Get full settings for a wallet.
   */
  app.get('/v1/settings/:wallet', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const settings = store.getSettings(wallet);
    if (!settings) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, settings);
  });

  /**
   * GET /v1/settings/:wallet/notifications
   * Get notification preferences for a wallet.
   */
  app.get('/v1/settings/:wallet/notifications', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const prefs = store.getNotificationPreferences(wallet);
    if (!prefs) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, prefs);
  });

  /**
   * GET /v1/settings/:wallet/privacy
   * Get privacy settings for a wallet.
   */
  app.get('/v1/settings/:wallet/privacy', async (request, reply) => {
    const { wallet } = request.params as { wallet: string };
    const privacy = store.getPrivacySettings(wallet);
    if (!privacy) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, privacy);
  });
}
