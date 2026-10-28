import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fees",
  description: "Fee schedule and trading fee documentation.",
};

const TRADING_FEES = [
  { operation: "Buy (bonding curve)", fee: "1%", description: "Applied to all purchases on the bonding curve" },
  { operation: "Sell (bonding curve)", fee: "1%", description: "Applied to all sales on the bonding curve" },
  { operation: "Raydium migration", fee: "6 SOL", description: "Charged when a token graduates to Raydium" },
  { operation: "Raydium trading", fee: "0.25%", description: "Standard Raydium AMM fee after graduation" },
];

const CREATOR_FEES = [
  { operation: "Token creation", fee: "0.02 SOL", description: "Gas and program deployment cost" },
  { operation: "Creator rewards", fee: "0.5%", description: "Earned on trading volume of created tokens" },
];

export default function FeesPage() {
  return (
    <>
      <p className="eyebrow">Documentation</p>
      <h1>Fees</h1>
      <p className="description">
        Fee schedule for trading, token creation, and associated operations.
        Captured from public documentation for reconstruction reference.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-text-primary">Trading Fees</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border-secondary text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                <th className="pb-3 pr-6">Operation</th>
                <th className="pb-3 pr-6">Fee</th>
                <th className="pb-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {TRADING_FEES.map((row) => (
                <tr key={row.operation} className="border-b border-border-secondary/50">
                  <td className="py-3 pr-6 font-semibold text-text-primary">
                    {row.operation}
                  </td>
                  <td className="py-3 pr-6 font-mono text-xs text-text-accent">
                    {row.fee}
                  </td>
                  <td className="py-3 text-xs text-text-tertiary">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-text-primary">Creator Fees</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-border-secondary text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                <th className="pb-3 pr-6">Operation</th>
                <th className="pb-3 pr-6">Fee</th>
                <th className="pb-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {CREATOR_FEES.map((row) => (
                <tr key={row.operation} className="border-b border-border-secondary/50">
                  <td className="py-3 pr-6 font-semibold text-text-primary">
                    {row.operation}
                  </td>
                  <td className="py-3 pr-6 font-mono text-xs text-text-accent">
                    {row.fee}
                  </td>
                  <td className="py-3 text-xs text-text-tertiary">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-border-secondary bg-bg-secondary p-5">
        <h2 className="text-[14px] font-semibold text-text-primary">
          Bonding Curve
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-text-tertiary">
          Each token launches on a bonding curve that holds approximately 800M
          tokens (80% of supply). When the curve reaches approximately 85 SOL in
          market cap, liquidity is automatically migrated to Raydium and the
          curve is burned.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-bg-primary px-4 py-3">
            <span className="text-[10px] text-text-muted">Initial Supply</span>
            <p className="mt-1 font-mono text-sm font-semibold text-text-primary">
              1,000,000,000
            </p>
          </div>
          <div className="rounded-lg bg-bg-primary px-4 py-3">
            <span className="text-[10px] text-text-muted">
              Curve Allocation
            </span>
            <p className="mt-1 font-mono text-sm font-semibold text-text-primary">
              800,000,000 (80%)
            </p>
          </div>
          <div className="rounded-lg bg-bg-primary px-4 py-3">
            <span className="text-[10px] text-text-muted">
              Graduation Target
            </span>
            <p className="mt-1 font-mono text-sm font-semibold text-text-accent">
              ~85 SOL
            </p>
          </div>
        </div>
      </section>

      <p className="leaderboard-disclosure">
        Fee structures are captured from public documentation and may change.
        This page is reference material for the local reconstruction only.
      </p>
    </>
  );
}
