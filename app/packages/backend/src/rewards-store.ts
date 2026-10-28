/**
 * In-memory rewards / fees / referrals store seeded from a JSON file.
 * All data is deterministic and read-only at runtime.
 */
import seedData from './rewards-seed.json' with { type: 'json' };

export interface Reward {
  wallet: string;
  type: 'holder' | 'creator' | 'referral';
  tokenMint: string;
  amount: number;
  claimedAmount: number;
  unclaimedAmount: number;
  lastClaimTimestamp: number;
  referralCode?: string;
  referredBy?: string | null;
  referralCount?: number;
}

export interface HolderReward {
  tokenMint: string;
  amount: number;
  claimedAmount: number;
  unclaimedAmount: number;
  lastClaimTimestamp: number;
}

export interface CreatorPayout {
  tokenMint: string;
  amount: number;
  claimedAmount: number;
  unclaimedAmount: number;
  lastClaimTimestamp: number;
}

export interface RewardSummary {
  totalEarned: number;
  totalClaimed: number;
  totalUnclaimed: number;
  byType: Record<string, number>;
}

export interface ReferralInfo {
  code: string | null;
  referralCount: number;
  totalEarned: number;
}

export interface FeeSchedule {
  tradingFeeBps: number;
  creatorFeeBps: number;
  referralFeeBps: number;
  bondingCurveFeeBps: number;
  graduationFeeSOL: number;
}

const rewards: Reward[] = seedData as Reward[];

/** Index by wallet for O(1) lookup. */
const byWallet = new Map<string, Reward[]>();
for (const r of rewards) {
  const list = byWallet.get(r.wallet) ?? [];
  list.push(r);
  byWallet.set(r.wallet, list);
}

/**
 * Synthetic fee schedule. Not captured from production;
 * values approximate publicly documented pump.fun fees.
 */
const DEFAULT_FEE_SCHEDULE: FeeSchedule = {
  tradingFeeBps: 100,
  creatorFeeBps: 50,
  referralFeeBps: 25,
  bondingCurveFeeBps: 100,
  graduationFeeSOL: 1.5,
};

export class RewardStore {
  private byWallet: Map<string, Reward[]>;
  private feeSchedule: FeeSchedule;

  constructor(seed?: Reward[], feeSchedule?: FeeSchedule) {
    const data = seed ?? rewards;
    this.byWallet = new Map();
    for (const r of data) {
      const list = this.byWallet.get(r.wallet) ?? [];
      list.push(r);
      this.byWallet.set(r.wallet, list);
    }
    this.feeSchedule = feeSchedule ?? DEFAULT_FEE_SCHEDULE;
  }

  /** Get rewards for a wallet with optional type filter and pagination. */
  getRewards(wallet: string, opts: { type?: string; offset?: number; limit?: number } = {}): Reward[] {
    let result = this.byWallet.get(wallet) ?? [];
    if (opts.type) {
      result = result.filter(r => r.type === opts.type);
    }
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? result.length);
    return result.slice(offset, offset + limit);
  }

  /** Get aggregated reward summary for a wallet. */
  getRewardSummary(wallet: string): RewardSummary {
    const all = this.byWallet.get(wallet) ?? [];
    const byType: Record<string, number> = {};
    let totalEarned = 0;
    let totalClaimed = 0;
    let totalUnclaimed = 0;
    for (const r of all) {
      totalEarned += r.amount;
      totalClaimed += r.claimedAmount;
      totalUnclaimed += r.unclaimedAmount;
      byType[r.type] = (byType[r.type] ?? 0) + r.amount;
    }
    return { totalEarned, totalClaimed, totalUnclaimed, byType };
  }

  /** Get holder-type rewards for a wallet. */
  getHolderRewards(wallet: string, opts: { offset?: number; limit?: number } = {}): HolderReward[] {
    const holders = (this.byWallet.get(wallet) ?? []).filter(r => r.type === 'holder');
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? holders.length);
    return holders.slice(offset, offset + limit).map(r => ({
      tokenMint: r.tokenMint,
      amount: r.amount,
      claimedAmount: r.claimedAmount,
      unclaimedAmount: r.unclaimedAmount,
      lastClaimTimestamp: r.lastClaimTimestamp,
    }));
  }

  /** Get creator-type payouts for a wallet. */
  getCreatorPayouts(wallet: string, opts: { offset?: number; limit?: number } = {}): CreatorPayout[] {
    const creators = (this.byWallet.get(wallet) ?? []).filter(r => r.type === 'creator');
    const offset = Math.max(0, opts.offset ?? 0);
    const limit = Math.max(0, opts.limit ?? creators.length);
    return creators.slice(offset, offset + limit).map(r => ({
      tokenMint: r.tokenMint,
      amount: r.amount,
      claimedAmount: r.claimedAmount,
      unclaimedAmount: r.unclaimedAmount,
      lastClaimTimestamp: r.lastClaimTimestamp,
    }));
  }

  /** Get referral info for a wallet. */
  getReferralInfo(wallet: string): ReferralInfo {
    const referrals = (this.byWallet.get(wallet) ?? []).filter(r => r.type === 'referral');
    if (referrals.length === 0) {
      return { code: null, referralCount: 0, totalEarned: 0 };
    }
    const code = referrals[0].referralCode ?? null;
    const referralCount = referrals.reduce((sum, r) => sum + (r.referralCount ?? 0), 0);
    const totalEarned = referrals.reduce((sum, r) => sum + r.amount, 0);
    return { code, referralCount, totalEarned };
  }

  /** Get the current fee schedule. */
  getFeeSchedule(): FeeSchedule {
    return { ...this.feeSchedule };
  }
}

/** Singleton store for the application. */
export const defaultRewardStore = new RewardStore();
