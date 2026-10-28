// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(872682),
    i = e.i(394468),
    r = e.i(646908),
    a = e.i(815612);
  let n = new Set(["pump", "pump_amm", "raydium_cpmm"]),
    l = (e) => (e && n.has(e) ? e : "non_launchpad"),
    o = (e) => (e ? (0, i.$)(new t.Amount(e)) : ""),
    s = (e) => (null != e && Number.isFinite(e) ? (0, a.I)(e) : "");
  e.s([
    "c",
    0,
    (e, { chainId: a }) => {
      let n,
        s = a.startsWith("eip155:"),
        d = (0, r.L)(a) || (0, r._)(a) || (0, r.B)(a),
        c = "pump" === e.venue || "pump_amm" === e.venue,
        u = e.quote?.id === i._,
        p = o(e.quoteAmount),
        m = i.o.test(e.blockId)
          ? new t.Ordinal({
              blockId: BigInt(e.blockId),
              txIndex: e.txIndex,
              eventIndex: e.eventIndex,
            })
          : void 0;
      return {
        slotIndexId: (0, i.O)(m, s || d || !c),
        tx: e.txId,
        timestamp: Number.isFinite((n = e.blockTimeMs))
          ? new Date(n).toISOString()
          : "",
        program: l(e.venue),
        userAddress: e.trader?.address ?? "",
        type: e.side,
        baseAmount: o(e.baseAmount),
        quoteAmount: p,
        priceUsd: e.priceUsd ?? "",
        priceSol: u ? (e.priceQuote ?? "") : "",
        amountSol: u ? p : s || d ? "" : (e.valueNative ?? ""),
        amountUsd: e.valueUsd ?? "",
      };
    },
    "r",
    0,
    (e, { program: t }) => {
      let { amountSol: i, baseAmount: r } = e,
        n =
          null != i &&
          null != r &&
          Number.isFinite(i) &&
          Number.isFinite(r) &&
          i > 0 &&
          r > 0
            ? (0, a.I)(i / r)
            : "";
      return {
        slotIndexId: e.slotIndexId,
        tx: e.tx,
        timestamp: e.timestamp ?? "",
        program: l(t),
        userAddress: e.walletAddress,
        type: e.isBuy ? "buy" : "sell",
        baseAmount: s(r),
        quoteAmount: s(i),
        priceUsd: s(e.priceUsd),
        priceSol: n,
        amountSol: s(i),
        amountUsd: s(e.amountUsd),
      };
    },
  ]);
};
