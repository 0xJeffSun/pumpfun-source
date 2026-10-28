// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  let i = (e, t) => (e === t ? ("sol" === e ? "usdc" : "sol") : e);
  e.s([
    "c",
    0,
    ({ isPaymentRouted: e, isUsdcPayment: t, isUsdcQuote: i }) => e && t !== i,
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
      isExoticQuote: i,
      isUsdcPayment: r,
      isUsdcQuote: a,
    }) => e && ("external" === t || i || r !== a),
    "r",
    0,
    ({
      prefersUsdc: e,
      isUsdcQuote: t,
      isPumpVenue: r,
      isEstablished: a,
      isMigration: n,
      paymentRoutingDisabled: s,
      walletFailsSponsoredSigning: l = !1,
      selfAsset: o,
    }) => {
      let c = t ? "usdc" : "sol";
      return l && !s
        ? i("sol", o)
        : !a || n
          ? i(c, o)
          : s
            ? i(r ? c : "sol", o)
            : (({
                prefersUsdc: e,
                isUsdcQuote: t,
                isEstablished: r,
                isMigration: a,
                selfAsset: n,
              }) =>
                !r || a ? i(t ? "usdc" : "sol", n) : i(e ? "usdc" : "sol", n))({
                prefersUsdc: e,
                isUsdcQuote: t,
                isEstablished: a,
                isMigration: n,
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
