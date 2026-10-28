// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(938277);
  e.s([
    "f",
    0,
    function (e) {
      if (!e)
        return {
          lastUpdatedTs: null,
          nativeBalance: 0,
          nativeLamports: 0,
          solPrice: 0,
          tokenCount: 0,
          totalValue: 0,
          portfolioPnL: {
            totalCostBasisUsd: 0,
            totalUnrealizedUsd: 0,
            totalPercentage: 0,
          },
        };
      let r = (0, t.I)(e.native_lamports),
        n = (0, t.I)(e.native_balance),
        i =
          void 0 !== e.native_balance && null !== e.native_balance
            ? n
            : r / 1e9,
        s = (0, t.I)(e.total_value),
        o = (0, t.I)(e.sol_price),
        a = Math.max(0, Math.floor((0, t.I)(e.token_count))),
        l = (0, t.I)(e.last_update_ts),
        u = e.portfolioPnL ?? null;
      return {
        lastUpdatedTs: l > 0 ? 1e3 * l : null,
        nativeBalance: i,
        nativeLamports: r,
        solPrice: o,
        tokenCount: a,
        totalValue: s,
        portfolioPnL: {
          totalCostBasisUsd: (0, t.I)(u?.total_cost_basis_usd),
          totalUnrealizedUsd: (0, t.I)(u?.total_unrealized_usd),
          totalPercentage: (0, t.I)(u?.total_percentage),
        },
      };
    },
  ]);
};
