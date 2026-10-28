"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SortDropdown } from "@/components/ui/SortDropdown";
import { StreamCard, type StreamCardData } from "@/components/stream/StreamCard";

const FILTER_TABS = ["Live Now", "Scheduled", "Recent"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const SORT_OPTIONS = ["Viewers", "Recent", "Trending"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const STREAMS: StreamCardData[] = [
  { id: "s1", title: "Calling the next 100x gem", host: { name: "CryptoWhale" }, viewers: 2841, duration: "1:24:05", coinTag: "BONK", isLive: true },
  { id: "s2", title: "New launch analysis", host: { name: "PumpTrader" }, viewers: 1205, duration: "45:12", coinTag: "POPCAT", isLive: true },
  { id: "s3", title: "Portfolio review session", host: { name: "DeFiDegen" }, viewers: 873, duration: "2:10:33", isLive: true },
  { id: "s4", title: "Market open watch party", host: { name: "SolanaMax" }, viewers: 654, duration: "32:18", coinTag: "WIF", isLive: true },
  { id: "s5", title: "AMA with the dev team", host: { name: "TokenDev" }, viewers: 0, duration: "Starts in 2h", isLive: false },
  { id: "s6", title: "Meme coin showdown", host: { name: "MemeKing" }, viewers: 0, duration: "Starts in 5h", isLive: false },
  { id: "s7", title: "SOL ecosystem deep dive", host: { name: "BlockHead" }, viewers: 3201, duration: "1:55:00", isLive: false },
  { id: "s8", title: "Trading signals workshop", host: { name: "AlphaHunter" }, viewers: 1844, duration: "1:12:30", isLive: false },
];

export function LiveClient() {
  const [filter, setFilter] = useState<FilterTab>("Live Now");
  const [sort, setSort] = useState<SortOption>("Viewers");

  const filtered = STREAMS.filter((s) => {
    if (filter === "Live Now") return s.isLive;
    if (filter === "Scheduled") return !s.isLive && s.viewers === 0;
    return !s.isLive && s.viewers > 0;
  });

  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <FilterTabs tabs={FILTER_TABS} active={filter} onChange={setFilter} />
        <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <div className="empty-state-content">
            <span className="empty-mark" aria-hidden="true">📺</span>
            <h2>No streams in this category</h2>
            <p>Try a different filter. Stream data is synthetic.</p>
          </div>
        </section>
      )}
    </div>
  );
}
