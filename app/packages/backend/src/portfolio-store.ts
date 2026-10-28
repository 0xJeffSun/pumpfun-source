/**
 * In-memory portfolio store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './portfolio-seed.json' with { type: 'json' };
import type { CoinStore } from './coins-store.js';
import { defaultCoinStore } from './coins-store.js';
import { DATA_SOURCE } from './users-store.js';

export { DATA_SOURCE };

export interface Trade {
  signature: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: string;
  slot: number;
}

export interface Position {
  wallet: string;
  mint: string;
  symbol: string;
  name: string;
  amount: number;
  averageBuyPrice: number;
  currentPrice: number;
  unrealizedPnl: number;
  realizedPnl: number;
  totalBought: number;
  totalSold: number;
  firstBuyTimestamp: string;
  lastTradeTimestamp: string;
  trades: Trade[];
}

export interface PnlSummary {
  wallet: string;
  totalUnrealizedPnl: number;
  totalRealizedPnl: number;
  totalPnl: number;
  positionCount: number;
  winCount: number;
  lossCount: number;
}

export interface PositionListOptions {
  sort?: string;
  order?: string;
  offset?: number;
  limit?: number;
}

export interface TradeListOptions {
  sort?: string;
  order?: string;
  offset?: number;
  limit?: number;
  mint?: string;
}

/**
 * The seed is HAND-AUTHORED SYNTHETIC DATA, not captured production traffic.
 * See users-store.ts for provenance statement.
 */
const positions: Position[] = seedData as Position[];
export const SYNTHETIC_PORTFOLIO_SEED: readonly Position[] = positions;

/**
 * Valid sort keys for positions.
 * Unrecognized sort values fall back to insertion order (documented assumption).
 */
type PositionSortKey = 'unrealizedPnl' | 'realizedPnl' | 'amount' | 'currentPrice' | 'lastTradeTimestamp' | 'name' | 'symbol';
const POSITION_SORT_KEYS = new Set<string>([
  'unrealizedPnl', 'realizedPnl', 'amount', 'currentPrice',
  'lastTradeTimestamp', 'name', 'symbol',
]);

type TradeSortKey = 'timestamp' | 'amount' | 'price' | 'slot';
const TRADE_SORT_KEYS = new Set<string>(['timestamp', 'amount', 'price', 'slot']);

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

export class PortfolioStore {
  private positions: Position[];
  private byWallet: Map<string, Position[]>;
  private byWalletMint: Map<string, Position>;
  private byMint: Map<string, Position[]>;
  private coinStore: CoinStore;

  constructor(seed?: Position[], coinStore?: CoinStore) {
    this.positions = seed ?? positions;
    this.coinStore = coinStore ?? defaultCoinStore;

    this.byWallet = new Map();
    this.byWalletMint = new Map();
    this.byMint = new Map();

    for (const p of this.positions) {
      // Index by wallet.
      const walletList = this.byWallet.get(p.wallet);
      if (walletList) {
        walletList.push(p);
      } else {
        this.byWallet.set(p.wallet, [p]);
      }

      // Composite key: wallet|mint.
      this.byWalletMint.set(`${p.wallet}|${p.mint}`, p);

      // Index by mint (all positions for this token across wallets).
      const mintList = this.byMint.get(p.mint);
      if (mintList) {
        mintList.push(p);
      } else {
        this.byMint.set(p.mint, [p]);
      }
    }
  }

  /** List positions for a wallet with optional sort, order, offset, limit. */
  getPositions(wallet: string, opts: PositionListOptions): Position[] {
    let result = [...(this.byWallet.get(wallet) ?? [])];

    if (opts.sort && POSITION_SORT_KEYS.has(opts.sort)) {
      const key = opts.sort as PositionSortKey;
      const order: 'asc' | 'desc' = opts.order === 'desc' ? 'desc' : 'asc';
      result.sort((a, b) => comparePrimitive(
        a[key] as string | number,
        b[key] as string | number,
        order,
      ));
    }

    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? result.length;
    return result.slice(offset, offset + limit);
  }

  /** Get a single position by wallet + mint. Returns undefined on miss. */
  getPosition(wallet: string, mint: string): Position | undefined {
    return this.byWalletMint.get(`${wallet}|${mint}`);
  }

  /** List trades for a wallet with optional sort, order, offset, limit, and mint filter. */
  getTrades(wallet: string, opts: TradeListOptions): Trade[] {
    const walletPositions = this.byWallet.get(wallet) ?? [];
    let trades: Trade[] = [];

    for (const pos of walletPositions) {
      if (opts.mint && pos.mint !== opts.mint) continue;
      trades.push(...pos.trades);
    }

    // Default sort: newest first.
    if (opts.sort && TRADE_SORT_KEYS.has(opts.sort)) {
      const key = opts.sort as TradeSortKey;
      const order: 'asc' | 'desc' = opts.order === 'desc' ? 'desc' : 'asc';
      trades.sort((a, b) => comparePrimitive(
        a[key] as string | number,
        b[key] as string | number,
        order,
      ));
    } else {
      trades.sort((a, b) => {
        const tA = new Date(a.timestamp).getTime();
        const tB = new Date(b.timestamp).getTime();
        return tB - tA;
      });
    }

    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? 50;
    return trades.slice(offset, offset + limit);
  }

  /** List all trades for a specific coin mint across all wallets. */
  getTradesByMint(mint: string, opts: { offset?: number; limit?: number }): Trade[] {
    const mintPositions = this.byMint.get(mint) ?? [];
    let trades: Trade[] = [];

    for (const pos of mintPositions) {
      trades.push(...pos.trades);
    }

    // Newest first.
    trades.sort((a, b) => {
      const tA = new Date(a.timestamp).getTime();
      const tB = new Date(b.timestamp).getTime();
      return tB - tA;
    });

    const offset = opts.offset ?? 0;
    const limit = opts.limit ?? 50;
    return trades.slice(offset, offset + limit);
  }

  /** Compute PnL summary for a wallet. */
  getPnlSummary(wallet: string): PnlSummary {
    const walletPositions = this.byWallet.get(wallet) ?? [];
    let totalUnrealizedPnl = 0;
    let totalRealizedPnl = 0;
    let winCount = 0;
    let lossCount = 0;

    for (const pos of walletPositions) {
      totalUnrealizedPnl += pos.unrealizedPnl;
      totalRealizedPnl += pos.realizedPnl;
      const netPnl = pos.unrealizedPnl + pos.realizedPnl;
      if (netPnl > 0) winCount++;
      else if (netPnl < 0) lossCount++;
    }

    return {
      wallet,
      totalUnrealizedPnl,
      totalRealizedPnl,
      totalPnl: totalUnrealizedPnl + totalRealizedPnl,
      positionCount: walletPositions.length,
      winCount,
      lossCount,
    };
  }
}

/** Singleton store for the application. */
export const defaultPortfolioStore = new PortfolioStore();
