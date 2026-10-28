// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = !e.i(641947).A,
    n = Math.floor((t ? 0.002 : 0.02) * 1e9),
    r = Math.floor((t ? 0.5 : 8.5) * 1e9);
  e.s([
    "v",
    0,
    "BwWK17cbHxwWBKZkUYvzxLcNQ1YVyaFezduWbtm2de6s",
    "R",
    0,
    5,
    "w",
    0,
    864e5,
    "x",
    0,
    0.06,
    "V",
    0,
    n,
    "J",
    0,
    2e9,
    "y",
    0,
    0.05,
    "p",
    0,
    [
      {
        id: "active",
        label: "Active",
        summary: "Agent is online — trades may fire at any time.",
        detail:
          "Agent is online and either executing transactions automatically or manually by the coin creator. The agent can trade at any time over the next 24 hours.",
        pillClassName: "bg-green-500/15 text-green-400",
        dotClassName: "bg-green-400",
      },
      {
        id: "paused",
        label: "Paused",
        summary: "Coin dropped below the trading floor.",
        detail:
          "Mayhem paused as the coin dropped below the minimum market cap required for trading. Buy 0.05 SOL to reactivate the agent.",
        pillClassName: "bg-amber-500/15 text-amber-400",
        dotClassName: "bg-amber-400",
      },
      {
        id: "complete",
        label: "Complete",
        summary: "24h window over or reserves depleted.",
        detail:
          "Mayhem mode has ended, either the 24-hour window expired or the SOL reserves were depleted. You can relaunch with the same details.",
        pillClassName: "bg-red-500/15 text-red-400",
        dotClassName: "bg-red-400",
      },
    ],
    "s",
    0,
    r,
    "z",
    0,
    (e) => null != e.mayhem_state || e.mayhem?.state != null,
    "_",
    0,
    (e, t) =>
      null == e || "completed" === e || null === t
        ? e
        : Date.now() - t >= 864e5
          ? "completed"
          : e,
  ]);
};
