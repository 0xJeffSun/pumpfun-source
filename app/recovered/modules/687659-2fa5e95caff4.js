// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.holderStatsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z
      .number()
      .nullable()
      .describe(
        "Percent of total supply, 0-100; null when the source is unavailable",
      );
  r.holderStatsRoutes = (0, n.defineRoutes)({
    "GET /coins/holder-stats/{mint}": {
      summary:
        "A mint's holder-distribution stats for the coin About tab: holder count, top-10 / dev / sniper / bundler share of supply and lifetime fees",
      params: o.z.object({ mint: o.z.string() }),
      response: o.z.object({
        mint: o.z.string(),
        totalHolders: o.z
          .number()
          .nullable()
          .describe(
            "Total holders per the top-holders chain; null when it is degraded",
          ),
        top10HoldersPercent: s,
        devHoldingsPercent: s,
        snipersHoldingsPercent: s,
        bundlersHoldingsPercent: s,
        totalFeesSol: o.z
          .number()
          .nullable()
          .describe(
            "Lifetime fees paid on the coin in SOL (swap-api); null when unavailable",
          ),
        asOf: o.z
          .number()
          .describe(
            "Milliseconds since epoch at which the stats were computed",
          ),
      }),
    },
  });
};
