// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(872682),
    i = e.i(394468),
    s = e.i(646908),
    a = e.i(815612);
  let r = new Set(["pump", "pump_amm", "raydium_cpmm"]),
    n = (e) => (e && r.has(e) ? e : "non_launchpad"),
    l = (e) => (e ? (0, i.$)(new t.Amount(e)) : ""),
    o = (e) => (null != e && Number.isFinite(e) ? (0, a.I)(e) : "");
  e.s([
    "c",
    0,
    (e, { chainId: a }) => {
      let r,
        o = a.startsWith("eip155:"),
        c = (0, s.L)(a) || (0, s._)(a) || (0, s.B)(a),
        d = "pump" === e.venue || "pump_amm" === e.venue,
        x = e.quote?.id === i._,
        h = l(e.quoteAmount),
        u = i.o.test(e.blockId)
          ? new t.Ordinal({
              blockId: BigInt(e.blockId),
              txIndex: e.txIndex,
              eventIndex: e.eventIndex,
            })
          : void 0;
      return {
        slotIndexId: (0, i.O)(u, o || c || !d),
        tx: e.txId,
        timestamp: Number.isFinite((r = e.blockTimeMs))
          ? new Date(r).toISOString()
          : "",
        program: n(e.venue),
        userAddress: e.trader?.address ?? "",
        type: e.side,
        baseAmount: l(e.baseAmount),
        quoteAmount: h,
        priceUsd: e.priceUsd ?? "",
        priceSol: x ? (e.priceQuote ?? "") : "",
        amountSol: x ? h : o || c ? "" : (e.valueNative ?? ""),
        amountUsd: e.valueUsd ?? "",
      };
    },
    "r",
    0,
    (e, { program: t }) => {
      let { amountSol: i, baseAmount: s } = e,
        r =
          null != i &&
          null != s &&
          Number.isFinite(i) &&
          Number.isFinite(s) &&
          i > 0 &&
          s > 0
            ? (0, a.I)(i / s)
            : "";
      return {
        slotIndexId: e.slotIndexId,
        tx: e.tx,
        timestamp: e.timestamp ?? "",
        program: n(t),
        userAddress: e.walletAddress,
        type: e.isBuy ? "buy" : "sell",
        baseAmount: o(s),
        quoteAmount: o(i),
        priceUsd: o(e.priceUsd),
        priceSol: r,
        amountSol: o(i),
        amountUsd: o(e.amountUsd),
      };
    },
  ]);
};
