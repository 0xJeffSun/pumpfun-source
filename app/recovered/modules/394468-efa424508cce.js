// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(872682),
    i = e.i(958083),
    s = e.i(646908),
    a = e.i(159985);
  let r = "So11111111111111111111111111111111111111112",
    n = { 1: "pump", 2: "pump_amm", 3: "raydium_cpmm" },
    l = /^\d+$/,
    o = (e) => {
      if (!e?.raw) return "";
      let t = e.raw.startsWith("-"),
        i = t ? e.raw.slice(1) : e.raw;
      if (!l.test(i)) return "";
      let s = i.replace(/^0+/, "") || "0",
        a = t && "0" !== s ? "-" : "",
        r = Math.max(0, e.decimals);
      if (0 === r) return `${a}${s}`;
      let n = s.padStart(r + 1, "0"),
        o = n.slice(0, -r),
        c = n.slice(-r).replace(/0+$/, "");
      return `${a}${o}${c ? `.${c}` : ""}`;
    },
    c = (e, t) =>
      e
        ? String(e.blockId).padStart(12, "0") +
          String(e.txIndex).padStart(6, "0") +
          String(e.eventIndex).padStart(t ? 8 : 4, "0")
        : "",
    d = /^\d+(\.\d+)?$/,
    x = (e) => (e?.blockTime ? e.blockTime.toDate().toISOString() : void 0);
  e.s([
    "o",
    0,
    l,
    "_",
    0,
    r,
    "O",
    0,
    c,
    "n",
    0,
    (e) => (e ? `${String(e.blockId)}:${e.txIndex}:${e.eventIndex}` : ""),
    "$",
    0,
    o,
    "M",
    0,
    (e, l, h) => {
      if (e.side !== t.Side.BUY && e.side !== t.Side.SELL) return null;
      let u = l.phase ?? h,
        f = l.id?.chainId || e.coin?.chainId || "",
        b = f.startsWith("eip155:"),
        p = (0, s.L)(f) || (0, s._)(f) || (0, s.B)(f),
        m = 1 === e.venue || 2 === e.venue,
        y = l.source === t.DataSource.VENDOR,
        v =
          e.quote?.id?.address ||
          u?.tradable?.quote?.id?.address ||
          u?.quote?.id?.address ||
          (b || p || y ? "" : r),
        g = v === r,
        w = o(e.quoteAmount),
        _ = e.marketCapAfterUsd?.value ?? "",
        N = (0, a.S)(e.priceUsd?.value) ? (e.priceQuote ?? "") : "";
      return {
        slotIndexId: c(e.ordinal, b || p || !m),
        tx: e.txId,
        timestamp: x(e.ordinal) ?? x(l.block) ?? new Date().toISOString(),
        program: n[e.venue] ?? "non_launchpad",
        userAddress: e.trader?.address ?? "",
        type: e.side === t.Side.BUY ? "buy" : "sell",
        baseAmount: o(e.baseAmount),
        quoteAmount: w,
        priceUsd: e.priceUsd?.value ?? "",
        priceSol: g ? e.priceQuote : "",
        amountSol: g ? w : b || p ? "" : (e.value?.native ?? ""),
        amountUsd: e.value?.usd?.value ?? "",
        isBondingCurve: u
          ? u.phase === t.LifecyclePhase.BONDING
          : 1 === e.venue,
        mintAddress: l.id?.address ?? e.coin?.address ?? "",
        quoteMintAddress: v,
        poolAddress: e.pool?.address || (u?.tradable?.pool?.address ?? ""),
        marketCap: _,
        marketCapUsd: _ || null,
        priceBasePerQuote: N
          ? ((e) => {
              if (!d.test(e)) return "";
              let t = new i.U(e);
              return t.gt(0) ? new i.U(1).div(t).toFixed() : "";
            })(N)
          : "",
        priceQuotePerBase: N,
        creatorAddress: "",
        platform: "",
        supply: "",
        solPriceUsd: g ? (e.quotePriceUsd?.value ?? "") : "",
        lpFee: null,
        protocolFee: o(e.protocolFee) || null,
        lpFeeUsd: null,
        protocolFeeUsd: null,
        creatorFee: o(e.creatorFee) || null,
        creatorFeeUsd: null,
        baseReserves: null,
        quoteReserves: null,
        virtualSolReserves: null,
        virtualTokenReserves: null,
        platformFee: null,
        platformFeeUsd: null,
        txFee: null,
        priorityFee: null,
        relayerFee: null,
      };
    },
  ]);
};
