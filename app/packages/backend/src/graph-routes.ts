/**
 * Native /graph and follower read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over the generic
 * fixture-replay loop. Serves deterministic data from the in-memory GraphStore.
 */
import type { FastifyInstance } from 'fastify';
import { GraphStore, defaultGraphStore } from './graph-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

/** OpenAPI-style route list for NATIVE_ROUTES exclusion in app.ts. */
export const NATIVE_GRAPH_ROUTES = new Set<string>([
  'GET /users/{id}/followers',
  'GET /users/{id}/following',
  'POST /graph/is-following',
  'POST /graph/batch-is-following',
  'GET /users/{id}/mutual-followers/{otherId}',
  'GET /groups/{groupId}/members',
]);

export function registerGraphRoutes(app: FastifyInstance, store: GraphStore = defaultGraphStore): void {
  const asInt = (v?: string) => {
    if (v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : undefined;
  };

  /**
   * GET /v1/users/:id/followers
   * Returns paginated followers list.
   */
  app.get('/v1/users/:id/followers', async (request, reply) => {
    const { id } = request.params as { id: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getFollowers(id, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/users/:id/following
   * Returns paginated following list.
   */
  app.get('/v1/users/:id/following', async (request, reply) => {
    const { id } = request.params as { id: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getFollowing(id, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * POST /v1/graph/is-following
   * Check if followerId follows followeeId.
   * Body: { followerId, followeeId }
   */
  app.post('/v1/graph/is-following', async (request, reply) => {
    const body = request.body as { followerId?: string; followeeId?: string } | null;
    if (!body || typeof body.followerId !== 'string' || typeof body.followeeId !== 'string') {
      return reply.code(400).send(errorBody(400, 'FOLLOWER_AND_FOLLOWEE_REQUIRED'));
    }
    return sendSynthetic(reply, 200, { isFollowing: store.isFollowing(body.followerId, body.followeeId) });
  });

  /**
   * POST /v1/graph/batch-is-following
   * Batch check: does viewerId follow each of targetIds?
   * Body: { viewerId, targetIds: string[] }
   */
  app.post('/v1/graph/batch-is-following', async (request, reply) => {
    const body = request.body as { viewerId?: string; targetIds?: string[] } | null;
    if (!body || typeof body.viewerId !== 'string' || !Array.isArray(body.targetIds)) {
      return reply.code(400).send(errorBody(400, 'VIEWER_AND_TARGETS_REQUIRED'));
    }
    if (body.targetIds.length > 100) {
      return reply.code(400).send(errorBody(400, 'TOO_MANY_TARGETS', { maxItems: 100, received: body.targetIds.length }));
    }
    return sendSynthetic(reply, 200, store.batchIsFollowing(body.viewerId, body.targetIds));
  });

  /**
   * GET /v1/users/:id/mutual-followers/:otherId
   * Returns mutual followers between two users.
   */
  app.get('/v1/users/:id/mutual-followers/:otherId', async (request, reply) => {
    const { id, otherId } = request.params as { id: string; otherId: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getMutualFollowers(id, otherId, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
    });
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/groups/:groupId/members
   * Returns group members with optional role filter.
   */
  app.get('/v1/groups/:groupId/members', async (request, reply) => {
    const { groupId } = request.params as { groupId: string };
    const qs = request.query as Record<string, string | undefined>;
    const offset = asInt(qs.offset);
    const limit = asInt(qs.limit);
    const result = store.getGroupMembers(groupId, {
      offset: offset === undefined ? undefined : Math.max(0, offset),
      limit: limit === undefined ? undefined : Math.max(0, limit),
      role: qs.role,
    });
    return sendSynthetic(reply, 200, result);
  });
}
