"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/FilterTabs";

const TABS = ["Active", "Upcoming", "Completed"] as const;
type Tab = (typeof TABS)[number];

type MayhemToken = {
  name: string;
  symbol: string;
  priceChange: number;
  volume: string;
  timeLeft: string;
};

const TOKENS: MayhemToken[] = [
  { name: "CHAOS", symbol: "CHAOS", priceChange: 342.5, volume: "$2.4M", timeLeft: "4h 12m" },
  { name: "RIOT", symbol: "RIOT", priceChange: -67.3, volume: "$1.8M", timeLeft: "4h 12m" },
  { name: "FRENZY", symbol: "FRENZY", priceChange: 128.9, volume: "$982K", timeLeft: "4h 12m" },
  { name: "HAVOC", symbol: "HAVOC", priceChange: 89.2, volume: "$756K", timeLeft: "4h 12m" },
  { name: "BLITZ", symbol: "BLITZ", priceChange: -23.1, volume: "$543K", timeLeft: "4h 12m" },
  { name: "SURGE", symbol: "SURGE", priceChange: 456.7, volume: "$2.1M", timeLeft: "4h 12m" },
];

const TOP_TRADERS = [
  { rank: 1, name: "DegenAlpha", pnl: "+$42,350" },
  { rank: 2, name: "MayhemKing", pnl: "+$38,120" },
  { rank: 3, name: "ChaosMaster", pnl: "+$29,880" },
  { rank: 4, name: "RiotTrader", pnl: "+$21,540" },
  { rank: 5, name: "BlitzRunner", pnl: "+$18,760" },
];

export function MayhemClient() {
  const [tab, setTab] = useState<Tab>("Active");

  return (
    <div className="mt-6">
      {/* Event banner */}
      <div className="rounded-xl border border-border-secondary bg-bg-secondary p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-red-950 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
              Mayhem Active
            </span>
            <h2 className="mt-2 text-lg font-bold text-text-primary">
              Friday Night Mayhem #47
            </h2>
            <p className="mt-1 text-xs text-text-tertiary">
              6 tokens competing · Ends in 4h 12m
            </p>
          </div>
          <div className="text-center">
            <span className="block font-mono text-2xl font-bold text-text-primary">
              04:12:38
            </span>
            <span className="text-[10px] text-text-muted">Time remaining</span>
          </div>
        </div>
      </div>

      <FilterTabs tabs={TABS} active={tab} onChange={setTab} />

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        {/* Token grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOKENS.map((token) => {
            const color = token.priceChange >= 0 ? "positive" : "negative";
            const prefix = token.priceChange >= 0 ? "+" : "";
            return (
              <div
                key={token.symbol}
                className="rounded-xl border border-border-secondary bg-bg-secondary p-4 transition-colors hover:bg-bg-tertiary"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-primary text-sm font-bold text-text-accent">
                    {token.symbol.slice(0, 2)}
                  </div>
                  <span className={`text-sm font-bold ${color}`}>
                    {prefix}{token.priceChange.toFixed(1)}%
                  </span>
                </div>
                <h3 className="mt-3 text-[14px] font-semibold text-text-primary">
                  {token.name}
                </h3>
                <p className="text-[11px] text-text-muted">${token.symbol}</p>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-text-tertiary">
                    Vol: {token.volume}
                  </span>
                  <span className="text-text-muted">⏱ {token.timeLeft}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard sidebar */}
        <aside className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
          <h3 className="text-sm font-semibold text-text-primary">
            Top Traders
          </h3>
          <ul className="mt-3 space-y-2">
            {TOP_TRADERS.map((t) => (
              <li
                key={t.rank}
                className="flex items-center gap-3 rounded-lg bg-bg-primary px-3 py-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-bg-tertiary text-[11px] font-bold text-text-secondary">
                  {t.rank}
                </span>
                <span className="flex-1 truncate text-[13px] font-semibold text-text-primary">
                  {t.name}
                </span>
                <span className="text-xs font-semibold positive">{t.pnl}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[10px] text-text-muted">
            Reconstruction data
          </p>
        </aside>
      </div>
    </div>
  );
}
