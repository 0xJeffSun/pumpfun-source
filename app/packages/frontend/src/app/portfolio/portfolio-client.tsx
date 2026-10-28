"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SortDropdown } from "@/components/ui/SortDropdown";
import { PositionsTable, type PositionRow } from "@/components/profile/PositionsTable";

const TABS = ["Positions", "Trade History"] as const;
type Tab = (typeof TABS)[number];

const SORT_OPTIONS = ["Value", "PnL", "Recent"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const POSITIONS: PositionRow[] = [
  { token: "BONK", symbol: "BONK", amount: "52,000,000", avgBuy: "$0.000015", current: "$0.000032", pnl: "+$884.00", pnlPercent: 113.3 },
  { token: "POPCAT", symbol: "POPCAT", amount: "125,000", avgBuy: "$0.62", current: "$1.24", pnl: "+$77,500", pnlPercent: 100.0 },
  { token: "WIF", symbol: "WIF", amount: "5,200", avgBuy: "$2.10", current: "$1.65", pnl: "-$2,340", pnlPercent: -21.4 },
  { token: "MYRO", symbol: "MYRO", amount: "890,000", avgBuy: "$0.00042", current: "$0.00089", pnl: "+$418.60", pnlPercent: 111.9 },
  { token: "BOME", symbol: "BOME", amount: "2,400,000", avgBuy: "$0.0082", current: "$0.0125", pnl: "+$10,320", pnlPercent: 52.4 },
  { token: "MEW", symbol: "MEW", amount: "340,000", avgBuy: "$0.0045", current: "$0.0031", pnl: "-$476.00", pnlPercent: -31.1 },
];

type Trade = { token: string; side: "Buy" | "Sell"; amount: string; price: string; time: string; pnl?: string };

const TRADES: Trade[] = [
  { token: "BONK", side: "Buy", amount: "10,000,000", price: "$0.000018", time: "2h ago" },
  { token: "POPCAT", side: "Sell", amount: "25,000", price: "$1.24", time: "4h ago", pnl: "+$15,500" },
  { token: "WIF", side: "Buy", amount: "1,200", price: "$1.65", time: "6h ago" },
  { token: "MYRO", side: "Buy", amount: "500,000", price: "$0.00089", time: "1d ago" },
  { token: "BOME", side: "Sell", amount: "600,000", price: "$0.0125", time: "1d ago", pnl: "+$2,580" },
  { token: "MEW", side: "Buy", amount: "340,000", price: "$0.0045", time: "3d ago" },
];

export function PortfolioClient() {
  const [tab, setTab] = useState<Tab>("Positions");
  const [sort, setSort] = useState<SortOption>("Value");

  const totalValue = "$92,430.60";
  const pnl24h = { value: "+$4,280.50", percent: "+4.8%", positive: true };
  const pnl7d = { value: "+$18,640.20", percent: "+25.3%", positive: true };

  return (
    <div className="mt-6 space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Total Value
          </span>
          <p className="mt-1 text-xl font-bold text-text-primary">
            {totalValue}
          </p>
        </div>
        <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            PnL (24h)
          </span>
          <p className={`mt-1 text-xl font-bold ${pnl24h.positive ? "positive" : "negative"}`}>
            {pnl24h.value}
          </p>
          <p className={`text-xs ${pnl24h.positive ? "positive" : "negative"}`}>
            {pnl24h.percent}
          </p>
        </div>
        <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            PnL (7d)
          </span>
          <p className={`mt-1 text-xl font-bold ${pnl7d.positive ? "positive" : "negative"}`}>
            {pnl7d.value}
          </p>
          <p className={`text-xs ${pnl7d.positive ? "positive" : "negative"}`}>
            {pnl7d.percent}
          </p>
        </div>
        <div className="rounded-xl border border-border-secondary bg-bg-secondary p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Positions
          </span>
          <p className="mt-1 text-xl font-bold text-text-primary">
            {POSITIONS.length}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <FilterTabs tabs={TABS} active={tab} onChange={setTab} />
        {tab === "Positions" && (
          <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />
        )}
      </div>

      {tab === "Positions" && <PositionsTable rows={POSITIONS} />}

      {tab === "Trade History" && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border-secondary text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                <th className="pb-3 pr-4">Token</th>
                <th className="pb-3 pr-4">Side</th>
                <th className="pb-3 pr-4 text-right">Amount</th>
                <th className="pb-3 pr-4 text-right">Price</th>
                <th className="hidden pb-3 pr-4 text-right sm:table-cell">PnL</th>
                <th className="pb-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {TRADES.map((t, i) => (
                <tr
                  key={i}
                  className="border-b border-border-secondary/50 text-text-secondary"
                >
                  <td className="py-3 pr-4 font-semibold text-text-primary">
                    ${t.token}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`text-xs font-semibold ${t.side === "Buy" ? "positive" : "negative"}`}
                    >
                      {t.side}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-xs">
                    {t.amount}
                  </td>
                  <td className="py-3 pr-4 text-right font-mono text-xs">
                    {t.price}
                  </td>
                  <td className="hidden py-3 pr-4 text-right font-mono text-xs positive sm:table-cell">
                    {t.pnl ?? "—"}
                  </td>
                  <td className="py-3 text-right text-xs text-text-muted">
                    {t.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[10px] text-text-muted">
        All portfolio data is synthetic. No real wallet connection or position
        tracking is active.
      </p>
    </div>
  );
}
