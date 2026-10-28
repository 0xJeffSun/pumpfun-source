// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667),
    r = e.i(246224),
    n = e.i(620268),
    i = e.i(646908);
  async function a(e) {
    let a = e.nowMs ?? Date.now(),
      o = e.captured ?? null;
    if (
      null != o &&
      "number" == typeof o.observedAtMs &&
      Number.isFinite(o.observedAtMs) &&
      o.observedAtMs > 0 &&
      a - o.observedAtMs <= 1e4
    )
      return o;
    let s =
        "number" == typeof o?.observedAtMs && o.observedAtMs > 0
          ? a - o.observedAtMs
          : null,
      l = (0, i.U)(e.chainId),
      u = {
        mint: e.mint,
        chain_id: e.chainId ?? null,
        captured_age_ms: s,
        captured_price: o?.tokenUsdPrice ?? null,
      },
      d = (e) => (
        t.y.warn("[freshSpotReference] spot_refresh_skipped", {
          ...u,
          reason: e,
        }),
        o
      );
    if (!l) return d("unsupported_chain");
    if (!(e.settlementUsdPrice > 0)) return d("no_settlement_price");
    try {
      let i = e.poolAddress ?? null;
      if (!i) {
        let t = await (0, n.W)(e.mint, e.signal);
        if (!(i = t?.poolAddress ?? null))
          return d(t ? "no_pool" : "unknown_token");
      }
      let o = await e.queryClient.fetchQuery({
          ...(0, r.H)({
            poolAddress: i,
            chain: l,
            tokenAddress: e.mint,
            sessionAddress: null,
          }),
          staleTime: 0,
          retry: !1,
        }),
        s = Number(o.price);
      if (!Number.isFinite(s) || s <= 0) return d("unpriced_pool");
      return (
        t.y.info("[freshSpotReference] spot_refreshed", {
          ...u,
          pool_address: i,
          fresh_price: s,
        }),
        {
          tokenUsdPrice: s,
          tokenDecimals: e.tokenDecimals,
          settlementUsdPrice: e.settlementUsdPrice,
          settlementDecimals: e.settlementDecimals,
          observedAtMs: a,
        }
      );
    } catch (e) {
      return (
        t.y.warn("[freshSpotReference] spot_refresh_failed", {
          ...u,
          error: e instanceof Error ? e.message : String(e),
        }),
        o
      );
    }
  }
  e.s(["f", 0, a]);
};
