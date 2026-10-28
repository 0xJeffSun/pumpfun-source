// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    ({
      isClosedPosition: e,
      pnlPct: t,
      costBasisUsd: i,
      avgEntryMcapUsd: l,
      athMarketCapUsd: a,
    }) => {
      let s = l > 0 && a > 0 && i > 0,
        n = s ? a / l : 0,
        r = s ? i * (n - 1) : 0;
      return {
        qualifies: e && s && t < 100 && n >= 3 && r > 0,
        couldHaveMadeUsd: r,
        athMultiple: n,
      };
    },
  ]);
};
