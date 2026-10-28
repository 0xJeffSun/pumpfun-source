/**
 * In-memory notifications store seeded from a JSON file.
 * Cursor-based pagination with base64url-encoded JSON cursors.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './notifications-seed.json' with { type: 'json' };
import { UserStore, defaultStore } from './users-store.js';

export interface Notification {
  id: string;
  recipientWallet: string;
  type: 'follow' | 'like' | 'reply' | 'mention' | 'reward' | 'trade' | 'system';
  actorWallet: string | null;
  content: string;
  coinMint: string | null;
  postId: string | null;
  read: boolean;
  createdAt: string;
}

export interface EnrichedNotification extends Notification {
  actor: { address: string; username: string | null; profile_image: string | null } | null;
}

const notifications: Notification[] = seedData as Notification[];

/** Encode a cursor from an offset. */
function encodeCursor(offset: number): string {
  return Buffer.from(JSON.stringify({ o: offset })).toString('base64url');
}

/** Decode a cursor to an offset. Returns 0 on invalid input. */
function decodeCursor(cursor: string): number {
  try {
    const parsed = JSON.parse(Buffer.from(cursor, 'base64url').toString()) as { o?: unknown };
    const o = parsed.o;
    return typeof o === 'number' && Number.isFinite(o) ? Math.max(0, Math.trunc(o)) : 0;
  } catch {
    return 0;
  }
}

export class NotificationStore {
  private byWallet: Map<string, Notification[]>;
  private userStore: UserStore;

  constructor(seed?: Notification[], userStore?: UserStore) {
    const data = seed ?? notifications;
    this.userStore = userStore ?? defaultStore;
    this.byWallet = new Map();
    for (const n of data) {
      const list = this.byWallet.get(n.recipientWallet) ?? [];
      list.push(n);
      this.byWallet.set(n.recipientWallet, list);
    }
    // Sort each wallet's notifications newest-first.
    for (const [, list] of this.byWallet) {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  /** Enrich a notification with actor profile data. */
  private enrich(n: Notification): EnrichedNotification {
    let actor: EnrichedNotification['actor'] = null;
    if (n.actorWallet) {
      const u = this.userStore.getById(n.actorWallet);
      actor = u
        ? { address: u.address, username: u.username, profile_image: u.profile_image }
        : { address: n.actorWallet, username: null, profile_image: null };
    }
    return { ...n, actor };
  }

  /**
   * Get notifications for a wallet with optional filters and cursor pagination.
   * Returns enriched notifications, nextCursor, and total unread count.
   */
  getNotifications(
    wallet: string,
    opts: { type?: string; unreadOnly?: boolean; cursor?: string; limit?: number } = {},
  ): { notifications: EnrichedNotification[]; nextCursor: string | null; unreadCount: number } {
    let list = this.byWallet.get(wallet) ?? [];
    const unreadCount = list.filter(n => !n.read).length;

    if (opts.type) {
      list = list.filter(n => n.type === opts.type);
    }
    if (opts.unreadOnly) {
      list = list.filter(n => !n.read);
    }

    const offset = opts.cursor ? decodeCursor(opts.cursor) : 0;
    const limit = Math.max(1, Math.min(opts.limit ?? 20, 100));
    const page = list.slice(offset, offset + limit);
    const nextOffset = offset + limit;
    return {
      notifications: page.map(n => this.enrich(n)),
      nextCursor: nextOffset < list.length ? encodeCursor(nextOffset) : null,
      unreadCount,
    };
  }

  /** Get the count of unread notifications for a wallet. */
  getUnreadCount(wallet: string): number {
    return (this.byWallet.get(wallet) ?? []).filter(n => !n.read).length;
  }
}

/** Singleton store for the application. */
export const defaultNotificationStore = new NotificationStore();
