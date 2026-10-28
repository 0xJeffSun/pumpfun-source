"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { RewardSummary } from "@/components/rewards/RewardSummary";

const TABS = ["All Rewards", "Claimed", "Unclaimed"] as const;
type Tab = (typeof TABS)[number];

type Reward = {
  token: string;
  amount: string;
  status: "Claimed" | "Unclaimed";
  date: string;
};

const REWARDS: Reward[] = [
  { token: "BONK", amount: "1,250.00", status: "Claimed", date: "2024-12-15" },
  { token: "POPCAT", amount: "890.50", status: "Unclaimed", date: "2024-12-14" },
  { token: "WIF", amount: "2,100.00", status: "Claimed", date: "2024-12-13" },
  { token: "MYRO", amount: "450.25", status: "Unclaimed", date: "2024-12-12" },
  { token: "BOME", amount: "3,200.00", status: "Claimed", date: "2024-12-11" },
  { token: "MEW", amount: "780.75", status: "Unclaimed", date: "2024-12-10" },
  { token: "SLERF", amount: "1,560.00", status: "Claimed", date: "2024-12-09" },
];

export function HolderRewardsClient() {
  const [tab, setTab] = useState<Tab>("All Rewards");

  const filtered = REWARDS.filter((r) => {
    if (tab === "All Rewards") return true;
    return r.status === tab;
  });

  return (
    <div className="mt-6 space-y-6">
      <RewardSummary />

      <FilterTabs tabs={TABS} active={tab} onChange={setTab} />

      {/* Rewards table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-border-secondary text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              <th className="pb-3 pr-4">Token</th>
              <th className="pb-3 pr-4 text-right">Amount</th>
              <th className="pb-3 pr-4 text-right">Status</th>
              <th className="hidden pb-3 pr-4 text-right sm:table-cell">Date</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={i}
                className="border-b border-border-secondary/50 text-text-secondary"
              >
                <td className="py-3 pr-4 font-semibold text-text-primary">
                  ${r.token}
                </td>
                <td className="py-3 pr-4 text-right font-mono text-xs">
                  {r.amount}
                </td>
                <td className="py-3 pr-4 text-right">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      r.status === "Claimed"
                        ? "bg-bg-success-inverse text-text-success"
                        : "bg-bg-warning-inverse text-text-warning"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="hidden py-3 pr-4 text-right text-xs text-text-muted sm:table-cell">
                  {r.date}
                </td>
                <td className="py-3 text-right">
                  {r.status === "Unclaimed" ? (
                    <button
                      type="button"
                      disabled
                      className="rounded-lg bg-bg-tertiary px-3 py-1.5 text-[11px] font-semibold text-text-muted disabled:cursor-not-allowed"
                      title="Disabled in reconstruction"
                    >
                      Claim
                    </button>
                  ) : (
                    <span className="text-xs text-text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Referral section */}
      <section className="rounded-xl border border-border-secondary bg-bg-secondary p-5">
        <h2 className="text-[14px] font-semibold text-text-primary">
          Referral Program
        </h2>
        <p className="mt-2 text-xs text-text-tertiary">
          Share your referral code and earn a percentage of your referrals&apos;
          trading fees.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-bg-primary px-4 py-3">
            <span className="text-[10px] text-text-muted">Referral Code</span>
            <p className="mt-1 font-mono text-sm font-bold text-text-accent">
              PUMP-X7K2M
            </p>
          </div>
          <div className="rounded-lg bg-bg-primary px-4 py-3">
            <span className="text-[10px] text-text-muted">Referrals</span>
            <p className="mt-1 text-sm font-bold text-text-primary">42</p>
          </div>
          <div className="rounded-lg bg-bg-primary px-4 py-3">
            <span className="text-[10px] text-text-muted">Total Earnings</span>
            <p className="mt-1 text-sm font-bold text-text-primary">
              128.50 SOL
            </p>
          </div>
        </div>
        <p className="mt-3 text-[10px] text-text-muted">
          All referral data is synthetic. No real referral program is active.
        </p>
      </section>
    </div>
  );
}
