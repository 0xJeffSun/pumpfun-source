import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GO",
  description: "Campaign discovery and participation interface.",
};

const LEADERBOARD = [
  { rank: 1, user: "CryptoWhale", score: "142,580", prize: "5,000 SOL" },
  { rank: 2, user: "PumpMaster", score: "128,340", prize: "3,000 SOL" },
  { rank: 3, user: "DeFiDegen", score: "115,200", prize: "2,000 SOL" },
  { rank: 4, user: "SolanaMax", score: "98,760", prize: "1,000 SOL" },
  { rank: 5, user: "MemeTrader", score: "87,430", prize: "500 SOL" },
  { rank: 6, user: "TokenHunter", score: "76,210", prize: "500 SOL" },
  { rank: 7, user: "AlphaSeeker", score: "65,890", prize: "250 SOL" },
  { rank: 8, user: "GemFinder", score: "54,320", prize: "250 SOL" },
  { rank: 9, user: "PumpFunPro", score: "43,100", prize: "100 SOL" },
  { rank: 10, user: "BlockHead", score: "31,750", prize: "100 SOL" },
];

const RULES = [
  { step: "1", title: "Trade tokens", description: "Buy and sell tokens on pump.fun to earn points based on volume." },
  { step: "2", title: "Create tokens", description: "Launch new tokens that achieve bonding curve graduation for bonus points." },
  { step: "3", title: "Climb the board", description: "Accumulate the most points within the campaign period to win prizes." },
];

export default function GoPage() {
  return (
    <>
      {/* Hero banner */}
      <div className="overflow-hidden rounded-2xl border border-border-secondary bg-bg-secondary">
        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-accent/10 via-transparent to-transparent" />
          <div className="relative">
            <span className="inline-flex rounded-full bg-bg-accent-inverse px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-accent">
              Campaign
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              GO Season 4
            </h1>
            <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-text-tertiary">
              Compete for the top of the leaderboard by trading and creating
              tokens. Prizes distributed at the end of each campaign period.
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-6 border-t border-border-secondary px-6 py-4 sm:px-10">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
            Time remaining
          </span>
          <div className="flex gap-3">
            {[
              { value: "14", label: "days" },
              { value: "08", label: "hrs" },
              { value: "32", label: "min" },
            ].map((t) => (
              <div key={t.label} className="text-center">
                <span className="block font-mono text-lg font-bold text-text-primary">
                  {t.value}
                </span>
                <span className="text-[10px] text-text-muted">{t.label}</span>
              </div>
            ))}
          </div>
          <span className="offline-badge ml-auto">Reconstruction</span>
        </div>
      </div>

      {/* Rules */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-text-primary">How it works</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {RULES.map((rule) => (
            <div
              key={rule.step}
              className="rounded-xl border border-border-secondary bg-bg-secondary p-5"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-bg-accent-inverse text-sm font-bold text-text-accent">
                {rule.step}
              </span>
              <h3 className="mt-3 text-[14px] font-semibold text-text-primary">
                {rule.title}
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-text-tertiary">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-text-primary">Leaderboard</h2>
        <div className="ranking-list mt-4">
          {LEADERBOARD.map((entry) => (
            <li key={entry.rank} className="ranking-row">
              <span className="ranking-position">{entry.rank}</span>
              <span className="ranking-identity">
                <strong>{entry.user}</strong>
                <small>Synthetic participant</small>
              </span>
              <span className="ranking-metric">
                <strong>{entry.score}</strong>
                <small>points</small>
              </span>
              <span className="ranking-facts">
                <small className="positive">{entry.prize}</small>
              </span>
            </li>
          ))}
        </div>
      </section>

      <p className="leaderboard-disclosure">
        All data shown is synthetic reconstruction data. No real campaign is
        active in this local build.
      </p>
    </>
  );
}
