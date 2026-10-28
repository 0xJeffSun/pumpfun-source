/**
 * In-memory coins store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './coins-seed.json' with { type: 'json' };
import { DATA_SOURCE } from './users-store.js';

export { DATA_SOURCE };

export interface CoinTrade {
  signature: string;
  type: 'buy' | 'sell';
  solAmount: number;
  tokenAmount: number;
  maker: string;
  timestamp: string;
  slot: number;
}

export interface CoinHolder {
  address: string;
  amount: number;
  percentage: number;
}

export interface Coin {
  mint: string;
  name: string;
  symbol: string;
  description: string | null;
  image_uri: string | null;
  metadata_uri: string | null;
  creator: string;
  created_timestamp: string;
  market_cap: number;
  usd_market_cap: number;
  reply_count: number;
  last_reply: string | null;
  is_currently_live: boolean;
  nsfw: boolean;
  raydium_pool: string | null;
  complete: boolean;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  total_supply: number;
  king_of_the_hill_timestamp: string | null;
  associated_bonding_curve: string;
  website: string | null;
  twitter: string | null;
  telegram: string | null;
  trades?: CoinTrade[];
  holders?: CoinHolder[];
}

export interface CoinSearchOptions {
  searchTerm?: string;
  sort?: string;
  order?: string;
  offset?: number;
  limit?: number;
  includeNsfw?: boolean;
}

export interface TrendingOptions {
  timeframe?: string;
  offset?: number;
  limit?: number;
}

/**
 * The seed is HAND-AUTHORED SYNTHETIC DATA, not captured production traffic.
 * See users-store.ts for provenance statement.
 */
const coins: Coin[] = seedData as Coin[];
export const SYNTHETIC_COINS_SEED: readonly Coin[] = coins;

/**
 * Valid sort keys for coin lists.
 * Unrecognized sort values fall back to insertion order (documented assumption).
 */
type SortKey = 'market_cap' | 'usd_market_cap' | 'created_timestamp' | 'reply_count' | 'name' | 'symbol';
const SORT_KEYS = new Set<string>(['market_cap', 'usd_market_cap', 'created_timestamp', 'reply_count', 'name', 'symbol']);

function comparePrimitive(a: string | number | null, b: string | number | null, order: 'asc' | 'desc'): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  let cmp: number;
  if (typeof a === 'string' && typeof b === 'string') {
    cmp = a.localeCompare(b);
  } else {
    cmp = (a as number) - (b as number);
  }
  return order === 'desc' ? -cmp : cmp;
}

export class CoinStore {
  private coins: Coin[];
  private byMint: Map<string, Coin>;
  private byCreator: Map<string, Coin[]>;

  constructor(seed?: Coin[]) {
    this.coins = seed ?? coins;
    this.byMint = new Map(this.coins.map(c => [c.mint, c]));

    this.byCreator = new Map();
    for (const c of this.coins) {
      const existing = this.byCreator.get(c.creator);
      if (existing) {
        existing.push(c);
      } else {
        this.byCreator.set(c.creator, [c]);
      }
    }
  }

  /** Get a single coin by mint address. Returns undefined for misses. */
  getByMint(mint: string): Coin | undefined {
    return this.byMint.get(mint);
  }

  /** Search coins with query filters, sorting, and pagination. */
  search(opts: CoinSearchOptions): Coin[] {
    let result = [...this.coins];

    // Filter out NSFW unless explicitly included.
    if (!opts.includeNsfw) {
      result = result.filter(c => !c.nsfw);
    }

    // Filter by searchTerm if provided.
    if (opts.searchTerm && opts.searchTerm.trim() !== '') {
      const term = opts.searchTerm.trim().toLowerCase();
      result = result.filter(c => {
        if (c.name.toLowerCase().includes(term)) return true;
        if (c.symbol.toLowerCase().includes(term)) return true;
        if (c.description && c.description.toLowerCase().includes(term)) return true;
        if (c.mint.toLowerCase().includes(term)) return true;
        return false;
      });
    }

    // Sort if a recognized key is provided; otherwise keep insertion order.
    if (opts.sort && SORT_KEYS.has(opts.sort)) {
      const key = opts.sort as SortKey;
      const order: 'asc' | 'desc' = opts.order === 'desc' ? 'desc' : 'asc';
      result.sort((a, b) => comparePrimitive(
        a[key] as string | number | null,
        b[key] as string | number | null,
        order,
      ));
    }

    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? result.length;
    return result.slice(offset, offset + limit);
  }

  /**
   * List trending coins sorted by reply_count descending within a timeframe.
   * Timeframe filter is a documented approximation: '1h', '6h', '24h' filter by
   * last_reply recency; unrecognized values return all coins (documented assumption).
   */
  listTrending(opts: TrendingOptions): Coin[] {
    let result = this.coins.filter(c => !c.nsfw && c.is_currently_live);

    if (opts.timeframe) {
      const hours: Record<string, number> = { '1h': 1, '6h': 6, '24h': 24 };
      const h = hours[opts.timeframe];
      if (h !== undefined) {
        const cutoff = new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
        result = result.filter(c => c.last_reply !== null && c.last_reply >= cutoff);
      }
    }

    result.sort((a, b) => b.reply_count - a.reply_count);

    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? 20;
    return result.slice(offset, offset + limit);
  }

  /** List newest coins by created_timestamp descending. */
  listNew(opts: { offset?: number; limit?: number }): Coin[] {
    const result = this.coins
      .filter(c => !c.nsfw)
      .sort((a, b) => {
        const tA = new Date(a.created_timestamp).getTime();
        const tB = new Date(b.created_timestamp).getTime();
        return tB - tA;
      });

    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? 20;
    return result.slice(offset, offset + limit);
  }

  /** List top coins by usd_market_cap descending. */
  listTopMarketCap(opts: { offset?: number; limit?: number }): Coin[] {
    const result = this.coins
      .filter(c => !c.nsfw && c.is_currently_live)
      .sort((a, b) => b.usd_market_cap - a.usd_market_cap);

    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? 20;
    return result.slice(offset, offset + limit);
  }

  /** List coins created by a specific wallet address. */
  listByCreator(creator: string, opts: { offset?: number; limit?: number }): Coin[] {
    const result = this.byCreator.get(creator) ?? [];
    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? result.length;
    return result.slice(offset, offset + limit);
  }

  /** Batch-fetch coins by mint addresses. Missing entries are omitted. */
  batch(mints: string[]): Coin[] {
    const result: Coin[] = [];
    const seen = new Set<string>();
    for (const mint of mints) {
      if (seen.has(mint)) continue;
      seen.add(mint);
      const c = this.byMint.get(mint);
      if (c) result.push(c);
    }
    return result;
  }

  /** Get trades for a coin. Returns undefined for unknown mints. */
  getTrades(mint: string, opts: { offset?: number; limit?: number }): CoinTrade[] | undefined {
    const coin = this.byMint.get(mint);
    if (!coin) return undefined;
    const trades = coin.trades ?? [];
    const sorted = [...trades].sort((a, b) => {
      const tA = new Date(a.timestamp).getTime();
      const tB = new Date(b.timestamp).getTime();
      return tB - tA;
    });
    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? 50;
    return sorted.slice(offset, offset + limit);
  }

  /** Get holders for a coin. Returns undefined for unknown mints. */
  getHolders(mint: string, opts: { offset?: number; limit?: number }): CoinHolder[] | undefined {
    const coin = this.byMint.get(mint);
    if (!coin) return undefined;
    const holders = coin.holders ?? [];
    const sorted = [...holders].sort((a, b) => b.amount - a.amount);
    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? 50;
    return sorted.slice(offset, offset + limit);
  }

  /**
   * Synthetic SOL price. Fixed value — no live feed.
   * The price is hand-authored to support frontend rendering and is not evidence.
   */
  getSolPrice(): { price: number; source: string; timestamp: string } {
    return {
      price: 150.0,
      source: DATA_SOURCE,
      timestamp: '2024-06-10T18:00:00.000Z',
    };
  }

  /** Get price data for a single coin. Returns undefined for unknown mints. */
  getCoinPrice(mint: string): { price: number; marketCap: number } | undefined {
    const coin = this.byMint.get(mint);
    if (!coin) return undefined;
    const price = coin.total_supply > 0
      ? coin.usd_market_cap / coin.total_supply
      : 0;
    return { price, marketCap: coin.usd_market_cap };
  }
}

/** Singleton store for the application. */
export const defaultCoinStore = new CoinStore();
