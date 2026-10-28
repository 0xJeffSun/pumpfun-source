/**
 * In-memory feed store seeded from a JSON file.
 * Cursor-based pagination with base64url-encoded JSON cursors.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './feed-seed.json' with { type: 'json' };
import { UserStore, defaultStore } from './users-store.js';

export interface RawFeedItem {
  id: string;
  type: 'post' | 'callout' | 'trade' | 'coin_creation' | 'achievement';
  authorId: string;
  coinMint: string | null;
  content: string;
  mediaUrls: string[];
  createdAt: string;
  reactions: { likes: number; reposts: number; replies: number };
  pinnedBy: string | null;
}

export interface FeedItem extends RawFeedItem {
  author: {
    address: string;
    username: string | null;
    profile_image: string | null;
  } | null;
}

const items: RawFeedItem[] = seedData as RawFeedItem[];

/** Sort items reverse-chronologically (newest first). */
const sorted = [...items].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

/** Encode a cursor from an offset. */
function encodeCursor(offset: number): string {
  return Buffer.from(JSON.stringify({ o: offset })).toString('base64url');
}

/** Decode a cursor to an offset. Returns 0 on invalid input. */
export function decodeCursor(cursor: string): number {
  try {
    const parsed = JSON.parse(Buffer.from(cursor, 'base64url').toString()) as { o?: unknown };
    const o = parsed.o;
    return typeof o === 'number' && Number.isFinite(o) ? Math.max(0, Math.trunc(o)) : 0;
  } catch {
    return 0;
  }
}

export class FeedStore {
  private items: RawFeedItem[];
  private sorted: RawFeedItem[];
  private byCoin: Map<string, RawFeedItem[]>;
  private byAuthor: Map<string, RawFeedItem[]>;
  private userStore: UserStore;

  constructor(seed?: RawFeedItem[], userStore?: UserStore) {
    const data = seed ?? items;
    this.userStore = userStore ?? defaultStore;
    this.items = data;
    this.sorted = [...data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    this.byCoin = new Map();
    this.byAuthor = new Map();
    for (const item of this.sorted) {
      if (item.coinMint) {
        const list = this.byCoin.get(item.coinMint) ?? [];
        list.push(item);
        this.byCoin.set(item.coinMint, list);
      }
      const authorList = this.byAuthor.get(item.authorId) ?? [];
      authorList.push(item);
      this.byAuthor.set(item.authorId, authorList);
    }
  }

  /** Enrich a raw feed item with author profile. */
  private enrich(raw: RawFeedItem): FeedItem {
    const u = this.userStore.getById(raw.authorId);
    return {
      ...raw,
      author: u ? { address: u.address, username: u.username, profile_image: u.profile_image } : null,
    };
  }

  /** Paginate a pre-sorted list with cursor-based pagination. */
  private paginate(list: RawFeedItem[], cursor?: string, limit = 20): { items: FeedItem[]; nextCursor: string | null } {
    const offset = cursor ? decodeCursor(cursor) : 0;
    const clamped = Math.max(1, Math.min(limit, 100));
    const page = list.slice(offset, offset + clamped);
    const nextOffset = offset + clamped;
    return {
      items: page.map(i => this.enrich(i)),
      nextCursor: nextOffset < list.length ? encodeCursor(nextOffset) : null,
    };
  }

  /**
   * Get the home feed.
   * tab=for-you returns everything; tab=following is a stub that also returns everything
   * (a real graph dependency would be needed for filtering).
   */
  getHomeFeed(opts: { tab?: string; viewerId?: string; cursor?: string; limit?: number }): { items: FeedItem[]; nextCursor: string | null } {
    return this.paginate(this.sorted, opts.cursor, opts.limit);
  }

  /** Get feed items for a specific coin. */
  getCoinFeed(mint: string, opts: { cursor?: string; limit?: number } = {}): { items: FeedItem[]; nextCursor: string | null } {
    const list = this.byCoin.get(mint) ?? [];
    return this.paginate(list, opts.cursor, opts.limit);
  }

  /** Get feed items authored by a specific user. */
  getUserFeed(userId: string, opts: { cursor?: string; limit?: number; includeReplies?: boolean } = {}): { items: FeedItem[]; nextCursor: string | null } {
    const list = this.byAuthor.get(userId) ?? [];
    return this.paginate(list, opts.cursor, opts.limit);
  }

  /** Get callouts with optional coin filter. */
  getCallouts(opts: { coinMint?: string; sort?: string; cursor?: string; limit?: number } = {}): { callouts: FeedItem[]; nextCursor: string | null } {
    let callouts = this.sorted.filter(i => i.type === 'callout');
    if (opts.coinMint) {
      callouts = callouts.filter(i => i.coinMint === opts.coinMint);
    }
    if (opts.sort === 'likes') {
      callouts = [...callouts].sort((a, b) => b.reactions.likes - a.reactions.likes);
    }
    const offset = opts.cursor ? decodeCursor(opts.cursor) : 0;
    const limit = Math.max(1, Math.min(opts.limit ?? 20, 100));
    const page = callouts.slice(offset, offset + limit);
    const nextOffset = offset + limit;
    return {
      callouts: page.map(i => this.enrich(i)),
      nextCursor: nextOffset < callouts.length ? encodeCursor(nextOffset) : null,
    };
  }
}

/** Singleton store for the application. */
export const defaultFeedStore = new FeedStore();
