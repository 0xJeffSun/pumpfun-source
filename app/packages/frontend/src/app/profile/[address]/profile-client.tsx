"use client";

import { useState } from "react";
import { ProfileHeader, type ProfileData } from "@/components/profile/ProfileHeader";
import { PositionsTable, type PositionRow } from "@/components/profile/PositionsTable";
import { FeedList } from "@/components/feed/FeedList";
import { CoinGrid } from "@/components/coins/CoinGrid";
import { FilterTabs } from "@/components/ui/FilterTabs";
import type { FeedItemData } from "@/components/feed/FeedItem";
import type { CoinCardData } from "@/components/coins/CoinCard";

const TABS = ["Posts", "Coins Created", "Portfolio", "Achievements"] as const;
type Tab = (typeof TABS)[number];

function makeProfile(address: string): ProfileData {
  return {
    address,
    name: `user_${address.slice(0, 6)}`,
    bio: "Active pump.fun trader and token creator. Not financial advice.",
    followers: 1248,
    following: 342,
    coinsCreated: 7,
  };
}

const POSTS: FeedItemData[] = [
  { id: "p1", author: { address: "abc123", name: "user_abc123" }, content: "Just launched a new token — check it out!", timestamp: "2h ago", likes: 42, reposts: 8, replies: 15 },
  { id: "p2", author: { address: "abc123", name: "user_abc123" }, content: "This market is wild. Up 300% on $BONK position.", timestamp: "5h ago", likes: 128, reposts: 34, replies: 47, isCallout: true },
  { id: "p3", author: { address: "abc123", name: "user_abc123" }, content: "New week, new gems. Looking at low-cap launches today.", timestamp: "1d ago", likes: 67, reposts: 12, replies: 23 },
];

const COINS: CoinCardData[] = [
  { address: "coin1aaaa", name: "MoonDog", symbol: "MDOG", marketCap: "$450K", price: "$0.000045", change24h: 125.3, creator: "user_abc123", replyCount: 234 },
  { address: "coin2bbbb", name: "SolCat", symbol: "SCAT", marketCap: "$280K", price: "$0.000028", change24h: -34.2, creator: "user_abc123", replyCount: 156 },
  { address: "coin3cccc", name: "PumpIt", symbol: "PUMP", marketCap: "$890K", price: "$0.000089", change24h: 67.8, creator: "user_abc123", replyCount: 412 },
];

const POSITIONS: PositionRow[] = [
  { token: "BONK", symbol: "BONK", amount: "12,500,000", avgBuy: "$0.000018", current: "$0.000032", pnl: "+$175.00", pnlPercent: 77.8 },
  { token: "POPCAT", symbol: "POPCAT", amount: "50,000", avgBuy: "$0.85", current: "$1.24", pnl: "+$19,500", pnlPercent: 45.9 },
  { token: "WIF", symbol: "WIF", amount: "2,000", avgBuy: "$2.10", current: "$1.65", pnl: "-$900.00", pnlPercent: -21.4 },
];

export function ProfileClient({ address }: { address: string }) {
  const [tab, setTab] = useState<Tab>("Posts");
  const profile = makeProfile(address);

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />

      <div className="rounded-lg border border-border-secondary bg-bg-secondary px-2 py-1 text-[10px] text-text-muted">
        Reconstruction profile — all data is synthetic.
      </div>

      <FilterTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "Posts" && <FeedList items={POSTS} />}
      {tab === "Coins Created" && <CoinGrid coins={COINS} />}
      {tab === "Portfolio" && <PositionsTable rows={POSITIONS} />}
      {tab === "Achievements" && (
        <section className="empty-state">
          <div className="empty-state-content">
            <span className="empty-mark" aria-hidden="true">🏆</span>
            <h2>Achievements not available</h2>
            <p>Achievement tracking has not been reconstructed.</p>
          </div>
        </section>
      )}
    </div>
  );
}
