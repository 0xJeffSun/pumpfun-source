"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SortDropdown } from "@/components/ui/SortDropdown";
import { SearchInput } from "@/components/ui/SearchInput";
import { Pagination } from "@/components/ui/Pagination";
import { CoinGrid } from "@/components/coins/CoinGrid";
import type { CoinCardData } from "@/components/coins/CoinCard";

const FILTER_TABS = ["All", "Tokens", "Users", "Groups"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const SORT_OPTIONS = ["Market Cap", "Volume", "Recent", "Trending"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function makeSyntheticCoins(count: number): CoinCardData[] {
  const names = [
    "BONK", "POPCAT", "PEPE", "WIF", "MYRO", "BOME", "MEW", "SLERF",
    "DUKO", "BOOK", "PUNDU", "TREMP", "MUMU", "GUMMY", "NEIRO", "PNUT",
    "GOAT", "CHILLGUY", "SPX", "FWOG",
  ];
  return Array.from({ length: count }, (_, i) => ({
    address: `${i}${"A".repeat(40)}`.slice(0, 44),
    name: names[i % names.length],
    symbol: names[i % names.length],
    marketCap: `$${(Math.random() * 900 + 100).toFixed(0)}K`,
    price: `$${(Math.random() * 0.01).toFixed(6)}`,
    change24h: Math.random() * 200 - 100,
    creator: `user${(i * 7 + 3) % 100}`,
    replyCount: Math.floor(Math.random() * 500),
  }));
}

const COINS = makeSyntheticCoins(20);

export function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [filter, setFilter] = useState<FilterTab>("All");
  const [sort, setSort] = useState<SortOption>("Market Cap");

  function onSearch(value: string) {
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.replace(`/explore?${params.toString()}`);
  }

  const filtered = query
    ? COINS.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.symbol.toLowerCase().includes(query.toLowerCase()),
      )
    : COINS;

  return (
    <div className="mt-6 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full max-w-sm">
          <SearchInput
            value={query}
            onChange={onSearch}
            placeholder="Search for coins and users..."
          />
        </div>
        <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />
      </div>

      <FilterTabs tabs={FILTER_TABS} active={filter} onChange={setFilter} />

      {query ? (
        <p className="query-summary" aria-live="polite">
          Search query: <strong>{query}</strong> — {filtered.length} results
        </p>
      ) : null}

      {filtered.length > 0 ? (
        <CoinGrid coins={filtered} />
      ) : (
        <section className="empty-state">
          <div className="empty-state-content">
            <span className="empty-mark" aria-hidden="true">?</span>
            <h2>No results found</h2>
            <p>
              Try a different search term. Only synthetic reconstruction data is
              available.
            </p>
          </div>
        </section>
      )}

      <Pagination hasMore={false} loading={false} onLoadMore={() => {}} />
    </div>
  );
}
