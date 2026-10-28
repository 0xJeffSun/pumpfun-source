// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["gold", "silver", "bronze"],
    r = (e) => {
      let t = e?.maxMultiplier ?? e?.multiple;
      return "number" == typeof t && Number.isFinite(t) ? t : null;
    },
    l = {
      lastRound: "last_round",
      daily: "daily",
      weekly: "weekly",
      monthly: "monthly",
    };
  e.s([
    "B",
    0,
    "lastRound",
    "s",
    0,
    20,
    "j",
    0,
    ["multiplier", "recency"],
    "g",
    0,
    { lastRound: 1, daily: 1, weekly: 7, monthly: 30 },
    "Q",
    0,
    {
      lastRound: "callouts.history.timeframe_last_round",
      daily: "callouts.history.timeframe_today",
    },
    "X",
    0,
    ["lastRound", "daily", "weekly", "monthly"],
    "W",
    0,
    { weekly: "1W", monthly: "1M" },
    "k",
    0,
    "recency",
    "b",
    0,
    (e) => {
      if (e <= 1) return null;
      if (e < 2) {
        let t = Math.floor(10 * e) / 10;
        return `${t.toFixed(1)}x`;
      }
      return `${Math.round(e)}x`;
    },
    "a",
    0,
    (e) => `${e.toFixed(1)}x`,
    "l",
    0,
    (e) => l[e],
    "N",
    0,
    (e, r) => ("multiplier" !== e ? null : (t[r] ?? null)),
    "m",
    0,
    (e) =>
      "multiplier" === e
        ? { sortBy: "MULTIPLE", sortOrder: "DESC" }
        : { sortBy: "TIMESTAMP", sortOrder: "DESC" },
    "p",
    0,
    (e, t) => e?.[t],
    "c",
    0,
    (e) => {
      if (0 !== e.totalCallouts && 0 !== e.distribution.length)
        return (
          (100 *
            e.distribution
              .filter((e) => e.min >= 10)
              .reduce((e, t) => e + t.count, 0)) /
          e.totalCallouts
        );
    },
    "F",
    0,
    (e) => (e?.daily?.totalCallouts ?? 0) > 60,
    "t",
    0,
    (e) => {
      let t = e?.allTime?.totalCallouts;
      return void 0 === t || t > 0;
    },
    "C",
    0,
    (e) => {
      let t = r(e),
        l = e.marketCap;
      return null === t || !Number.isFinite(l) || l <= 0 ? null : l * t;
    },
    "q",
    0,
    r,
  ]);
};
