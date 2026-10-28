// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  let n = (e, t) => (e === t ? ("sol" === e ? "usdc" : "sol") : e);
  e.s([
    "c",
    0,
    ({ isPaymentRouted: e, isUsdcPayment: t, isUsdcQuote: n }) => e && t !== n,
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
      isExoticQuote: n,
      isUsdcPayment: r,
      isUsdcQuote: i,
    }) => e && ("external" === t || n || r !== i),
    "r",
    0,
    ({
      prefersUsdc: e,
      isUsdcQuote: t,
      isPumpVenue: r,
      isEstablished: i,
      isMigration: a,
      paymentRoutingDisabled: s,
      walletFailsSponsoredSigning: l = !1,
      selfAsset: o,
    }) => {
      let u = t ? "usdc" : "sol";
      return l && !s
        ? n("sol", o)
        : !i || a
          ? n(u, o)
          : s
            ? n(r ? u : "sol", o)
            : (({
                prefersUsdc: e,
                isUsdcQuote: t,
                isEstablished: r,
                isMigration: i,
                selfAsset: a,
              }) =>
                !r || i ? n(t ? "usdc" : "sol", a) : n(e ? "usdc" : "sol", a))({
                prefersUsdc: e,
                isUsdcQuote: t,
                isEstablished: i,
                isMigration: a,
                selfAsset: o,
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
