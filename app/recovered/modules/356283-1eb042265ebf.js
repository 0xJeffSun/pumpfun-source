// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => null != e && Number.isFinite(e) && e > 0,
    r = ({
      payUsd: e,
      receiveUsdAtSpot: r,
      routerImpactPercent: n,
      transferFeeBps: i,
    }) => {
      if (!t(e) || !t(r)) return null;
      let l = (1 - r / e) * 100,
        a = null != n && Number.isFinite(n) ? Math.abs(n) : 0,
        s = t(i) ? i / 100 : 0;
      if (s >= 100) return null;
      let o = Math.max(0, (1 - r / (1 - s / 100) / e) * 100 - a);
      return {
        payUsd: e,
        receiveUsdAtSpot: r,
        valueLostPercent: l,
        transferFeePercent: s,
        poolFeePercent: o,
        poolFeeUsd: (e * o) / 100,
      };
    };
  e.s([
    "R",
    0,
    ({ venue: e, tradeDirection: t, ...n }) => {
      if ("jupiter" !== e || "buy" !== t) return null;
      let i = r(n);
      return null === i || i.poolFeePercent < 15 ? null : i;
    },
    "y",
    0,
    (e) => `${Math.round(e)}%`,
    "C",
    0,
    t,
    "D",
    0,
    (e) => null !== e && e.poolFeePercent >= 30,
    "u",
    0,
    r,
  ]);
};
