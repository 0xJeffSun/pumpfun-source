/**
 * Shared type definitions derived from the captured developer OpenAPI contract.
 * These match the documented response shapes; no fields are invented.
 */

/** GET /pnl-leaderboard */
export type PnlPeriod = 'daily' | 'weekly' | 'monthly';
export type PnlSort = 'realized' | 'unrealized' | 'combined';

export interface PnlLeaderboardEntry {
  address: string;
  pnl: number;
  realizedPnl: number;
  unrealizedPnl: number;
  volume: number;
  rank: number;
  displayName?: string;
  avatarUrl?: string;
}

export interface PnlLeaderboardResponse {
  entries: PnlLeaderboardEntry[];
  period: PnlPeriod;
  sort: PnlSort;
  updatedAt?: string;
}

/** GET /pnl-leaderboard/groups */
export interface PnlGroup {
  id: string;
  name: string;
  memberCount: number;
  totalPnl: number;
  rank: number;
}

export interface PnlGroupsResponse {
  groups: PnlGroup[];
  period: PnlPeriod;
}

/** GET /pnl-leaderboard/positions */
export type PositionsPeriod = 'daily' | 'weekly';

export interface Position {
  mint: string;
  symbol: string;
  name: string;
  imageUrl?: string;
  pnl: number;
  holdersCount: number;
}

export interface PositionsResponse {
  positions: Position[];
  period: PositionsPeriod;
}

/** GET /payouts/leaderboard */
export type PayoutPeriod = '1d' | '1w' | '1m';

export interface PayoutEntry {
  address: string;
  displayName?: string;
  avatarUrl?: string;
  totalPayout: number;
  rank: number;
}

export interface PayoutsLeaderboardResponse {
  entries: PayoutEntry[];
  page: number;
  pageSize: number;
  period?: PayoutPeriod;
}

/** GET /competitions */
export interface Competition {
  id: string;
  slug: string;
  name: string;
  description?: string;
  startsAt: string;
  endsAt: string;
  status: 'upcoming' | 'active' | 'ended';
  entryCount: number;
}

export interface CompetitionsResponse {
  competitions: Competition[];
}

/** GET /competitions/{idOrSlug} */
export interface CompetitionDetail extends Competition {
  entries: CompetitionEntry[];
  highlights?: CompetitionHighlight[];
}

export interface CompetitionEntry {
  id: string;
  address: string;
  displayName?: string;
  pnl: number;
  rank: number;
}

export interface CompetitionHighlight {
  id: string;
  type: string;
  description: string;
  value: number;
  address: string;
}

/** GET /mayhem/{mint}/top-traders */
export interface MayhemTrader {
  address: string;
  displayName?: string;
  pnl: number;
  volume: number;
  rank: number;
}

export interface MayhemTopTradersResponse {
  traders: MayhemTrader[];
  mint: string;
}

/** GET /pnl-leaderboard/top-trader-trades/{mint} */
export interface TopTraderTrade {
  signature: string;
  mint: string;
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: number;
}

export interface TopTraderTradesResponse {
  trades: TopTraderTrade[];
  cursor?: string;
}

/** Backend error envelope */
export interface ApiErrorBody {
  error: string;
  method?: string;
  path?: string;
}
