/**
 * Native /posts read-operation routes.
 *
 * Registered as native Fastify handlers taking priority over the generic fixture-replay loop.
 * Serves deterministic data from the in-memory PostStore linked to UserStore.
 */
import type { FastifyInstance } from 'fastify';
import { PostStore, defaultPostStore } from './posts-store.js';
import { sendSynthetic, errorBody } from './users-routes.js';

export function registerPostRoutes(app: FastifyInstance, store: PostStore = defaultPostStore): void {
  /**
   * GET /v1/posts
   * Fetch posts by ids (comma-separated or repeated query parameters).
   * Request order is preserved; duplicates collapse; unknown, hidden or deleted ids leave no placeholder.
   * Returns: 200, { posts: Post[] }
   */
  app.get('/v1/posts', async (request, reply) => {
    const qs = request.query as Record<string, unknown>;
    const rawIds = qs.ids;
    if (!rawIds) {
      return reply.code(400).send(errorBody(400, 'IDS_REQUIRED'));
    }

    const list: string[] = [];
    if (typeof rawIds === 'string') {
      list.push(...rawIds.split(',').map(s => s.trim()).filter(Boolean));
    } else if (Array.isArray(rawIds)) {
      for (const item of rawIds) {
        if (typeof item === 'string') {
          list.push(...item.split(',').map(s => s.trim()).filter(Boolean));
        }
      }
    }

    if (list.length === 0) {
      return reply.code(400).send(errorBody(400, 'IDS_REQUIRED'));
    }

    // Contract specifies maxItems: 100 on ids array
    if (list.length > 100) {
      return reply.code(400).send(errorBody(400, 'TOO_MANY_IDS', { maxItems: 100, received: list.length }));
    }

    const posts = store.batch(list);
    return sendSynthetic(reply, 200, { posts });
  });

  /**
   * GET /v1/posts/:postId/replies
   * Direct live replies to a post, newest first, keyset-paginated on an opaque cursor.
   * Returns: 200, { replies: Post[], nextCursor: string | null }
   * NOTE: Registered before /v1/posts/:postId to prevent route shadowing.
   */
  app.get('/v1/posts/:postId/replies', async (request, reply) => {
    const { postId } = request.params as { postId: string };
    const qs = request.query as Record<string, string | undefined>;

    let limit = 50;
    if (qs.limit !== undefined) {
      const parsed = Number(qs.limit);
      if (Number.isFinite(parsed)) {
        limit = Math.min(200, Math.max(1, Math.trunc(parsed)));
      }
    }

    try {
      const result = store.getReplies(postId, { cursor: qs.cursor, limit });
      if (!result) {
        return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
      }
      return sendSynthetic(reply, 200, result);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'INVALID_CURSOR') {
        return reply.code(400).send(errorBody(400, 'INVALID_CURSOR'));
      }
      throw err;
    }
  });

  /**
   * GET /v1/posts/:postId/likers
   * Profiles who liked a post, newest first, offset-paginated.
   * Returns: 200, { likers: Profile[], hasMore: boolean }
   * NOTE: Registered before /v1/posts/:postId.
   */
  app.get('/v1/posts/:postId/likers', async (request, reply) => {
    const { postId } = request.params as { postId: string };
    const qs = request.query as Record<string, string | undefined>;

    let limit = 50;
    if (qs.limit !== undefined) {
      const parsed = Number(qs.limit);
      if (Number.isFinite(parsed)) {
        limit = Math.min(200, Math.max(1, Math.trunc(parsed)));
      }
    }

    let offset = 0;
    if (qs.offset !== undefined) {
      const parsed = Number(qs.offset);
      if (Number.isFinite(parsed)) {
        offset = Math.min(10000, Math.max(0, Math.trunc(parsed)));
      }
    }

    const result = store.getLikers(postId, { limit, offset });
    if (!result) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/posts/:postId/quotes
   * Live quotes of a post, newest first, keyset-paginated on an opaque cursor.
   * Returns: 200, { quotes: Post[], nextCursor: string | null }
   * NOTE: Registered before /v1/posts/:postId.
   */
  app.get('/v1/posts/:postId/quotes', async (request, reply) => {
    const { postId } = request.params as { postId: string };
    const qs = request.query as Record<string, string | undefined>;

    let limit = 50;
    if (qs.limit !== undefined) {
      const parsed = Number(qs.limit);
      if (Number.isFinite(parsed)) {
        limit = Math.min(200, Math.max(1, Math.trunc(parsed)));
      }
    }

    try {
      const result = store.getQuotes(postId, { cursor: qs.cursor, limit });
      if (!result) {
        return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
      }
      return sendSynthetic(reply, 200, result);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === 'INVALID_CURSOR') {
        return reply.code(400).send(errorBody(400, 'INVALID_CURSOR'));
      }
      throw err;
    }
  });

  /**
   * GET /v1/posts/:postId/reposters
   * Profiles who plain-reposted a post, newest first, offset-paginated.
   * Returns: 200, { reposters: Profile[], hasMore: boolean }
   * NOTE: Registered before /v1/posts/:postId.
   */
  app.get('/v1/posts/:postId/reposters', async (request, reply) => {
    const { postId } = request.params as { postId: string };
    const qs = request.query as Record<string, string | undefined>;

    let limit = 50;
    if (qs.limit !== undefined) {
      const parsed = Number(qs.limit);
      if (Number.isFinite(parsed)) {
        limit = Math.min(200, Math.max(1, Math.trunc(parsed)));
      }
    }

    let offset = 0;
    if (qs.offset !== undefined) {
      const parsed = Number(qs.offset);
      if (Number.isFinite(parsed)) {
        offset = Math.min(10000, Math.max(0, Math.trunc(parsed)));
      }
    }

    const result = store.getReposters(postId, { limit, offset });
    if (!result) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, result);
  });

  /**
   * GET /v1/posts/:postId
   * Fetch a single post with its one-level embeds.
   * Returns: 200 with { post: Post }, or 404 for unknown, hidden or deleted posts.
   */
  app.get('/v1/posts/:postId', async (request, reply) => {
    const { postId } = request.params as { postId: string };
    const post = store.getLivePost(postId);
    if (!post) {
      return reply.code(404).send(errorBody(404, 'NOT_FOUND'));
    }
    return sendSynthetic(reply, 200, { post });
  });
}
