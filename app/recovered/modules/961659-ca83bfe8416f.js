// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(78436),
    n = e.i(466931);
  let i = (e) => "number" == typeof e && Number.isFinite(e) && e > 0,
    l = (0, r.$)((e, t) => ({
      request: null,
      resolve: null,
      ask: (r) =>
        t().resolve
          ? Promise.resolve(!1)
          : new Promise((t) => {
              e({ request: r, resolve: t });
            }),
      settle: (r) => {
        let { resolve: n } = t();
        (e({ request: null, resolve: null }), n?.(r));
      },
    }));
  e.s([
    "W",
    0,
    class extends Error {
      constructor() {
        super("USD sell confirmation declined");
      }
    },
    "X",
    0,
    function ({
      intent: e,
      atomicAmount: t,
      tokenDecimals: r,
      quote: n,
      quotedSellValueUsd: l,
      settlementDecimals: a,
    }) {
      let s = Number(n.toAmount),
        o =
          i(e.settlementUsdPrice) && Number.isFinite(s) && s > 0
            ? (s / 10 ** a) * e.settlementUsdPrice
            : null,
        u = i(l) ? l : null,
        d = [u, o].filter(i),
        c = d.length > 0 && i(e.typedUsd) ? Math.max(...d) / e.typedUsd : null;
      return {
        reason:
          null !== c && c > 1.1
            ? "oversized"
            : e.snappedToSellAll
              ? "sell_all"
              : null,
        typedUsd: e.typedUsd,
        atomicAmount: t,
        tokenDecimals: r,
        quotedSellValueUsd: u,
        proceedsUsd: o,
        overshootRatio: c,
        snappedToSellAll: e.snappedToSellAll,
      };
    },
    "h",
    0,
    (e, r, i, l) => {
      let a = {
        reason: r.reason,
        typed_usd: r.typedUsd,
        quoted_sell_value_usd: r.quotedSellValueUsd,
        proceeds_usd: r.proceedsUsd,
        overshoot_ratio: r.overshootRatio,
        snapped_to_sell_all: r.snappedToSellAll,
        sizing_token_usd_price: i.sizingTokenUsdPrice,
        sizing_observed_at_ms: i.sizingObservedAtMs,
        spot_reference_age_ms: l.spotReferenceAgeMs,
        mint: l.mint,
        chain_id: l.chainId,
      };
      (t.y.warn(`[${e}] relay_usd_sell_guard`, a),
        "oversized" === r.reason &&
          (0, n.l)({
            error: Error("relay_usd_sell_oversized"),
            feature: "trade",
            operation: "usd-sell-sizing",
            context: {
              route: "relay",
              tradeDirection: "sell",
              mint: l.mint,
              chainId: l.chainId,
              typedUsd: r.typedUsd,
              quotedSellValueUsd: r.quotedSellValueUsd,
              proceedsUsd: r.proceedsUsd,
              overshootRatio: r.overshootRatio,
              sizingTokenUsdPrice: i.sizingTokenUsdPrice,
              sizingObservedAtMs: i.sizingObservedAtMs,
              spotReferenceAgeMs: l.spotReferenceAgeMs,
            },
          }));
    },
    "f",
    0,
    (e) => {
      if (null == e.fromAmountUsd) return null;
      let t = Number(e.fromAmountUsd);
      return i(t) ? t : null;
    },
    "Y",
    0,
    l,
  ]);
};
