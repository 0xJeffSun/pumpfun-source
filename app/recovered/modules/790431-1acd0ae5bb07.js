// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  let r = (e, t) => (e === t ? ("sol" === e ? "usdc" : "sol") : e);
  e.s([
    "c",
    0,
    ({ isPaymentRouted: e, isUsdcPayment: t, isUsdcQuote: r }) => e && t !== r,
    "T",
    0,
    (e) => (e === t.X ? "sol" : (0, t.Y)(e) ? "usdc" : null),
    "b",
    0,
    (e) => !0,
    "e",
    0,
    ({
      isPaymentRouted: e,
      venueHint: t,
      isExoticQuote: r,
      isUsdcPayment: a,
      isUsdcQuote: i,
    }) => e && ("external" === t || r || a !== i),
    "r",
    0,
    ({
      prefersUsdc: e,
      isUsdcQuote: t,
      isPumpVenue: a,
      isEstablished: i,
      isMigration: l,
      paymentRoutingDisabled: n,
      walletFailsSponsoredSigning: o = !1,
      selfAsset: s,
    }) => {
      let d = t ? "usdc" : "sol";
      return o && !n
        ? r("sol", s)
        : !i || l
          ? r(d, s)
          : n
            ? r(a ? d : "sol", s)
            : (({
                prefersUsdc: e,
                isUsdcQuote: t,
                isEstablished: a,
                isMigration: i,
                selfAsset: l,
              }) =>
                !a || i ? r(t ? "usdc" : "sol", l) : r(e ? "usdc" : "sol", l))({
                prefersUsdc: e,
                isUsdcQuote: t,
                isEstablished: i,
                isMigration: l,
                selfAsset: s,
              });
    },
    "d",
    0,
    (e) =>
      (e?.program != null && "pump" !== e.program) || e?.raydium_pool
        ? "external"
        : "pump",
  ]);
};
