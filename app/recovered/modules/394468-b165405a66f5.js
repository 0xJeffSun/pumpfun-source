// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(872682),
    i = e.i(958083),
    r = e.i(646908),
    a = e.i(159985);
  let n = "So11111111111111111111111111111111111111112",
    l = { 1: "pump", 2: "pump_amm", 3: "raydium_cpmm" },
    o = /^\d+$/,
    s = (e) => {
      if (!e?.raw) return "";
      let t = e.raw.startsWith("-"),
        i = t ? e.raw.slice(1) : e.raw;
      if (!o.test(i)) return "";
      let r = i.replace(/^0+/, "") || "0",
        a = t && "0" !== r ? "-" : "",
        n = Math.max(0, e.decimals);
      if (0 === n) return `${a}${r}`;
      let l = r.padStart(n + 1, "0"),
        s = l.slice(0, -n),
        d = l.slice(-n).replace(/0+$/, "");
      return `${a}${s}${d ? `.${d}` : ""}`;
    },
    d = (e, t) =>
      e
        ? String(e.blockId).padStart(12, "0") +
          String(e.txIndex).padStart(6, "0") +
          String(e.eventIndex).padStart(t ? 8 : 4, "0")
        : "",
    c = /^\d+(\.\d+)?$/,
    u = (e) => (e?.blockTime ? e.blockTime.toDate().toISOString() : void 0);
  e.s([
    "o",
    0,
    o,
    "_",
    0,
    n,
    "O",
    0,
    d,
    "n",
    0,
    (e) => (e ? `${String(e.blockId)}:${e.txIndex}:${e.eventIndex}` : ""),
    "$",
    0,
    s,
    "M",
    0,
    (e, o, p) => {
      if (e.side !== t.Side.BUY && e.side !== t.Side.SELL) return null;
      let m = o.phase ?? p,
        x = o.id?.chainId || e.coin?.chainId || "",
        b = x.startsWith("eip155:"),
        f = (0, r.L)(x) || (0, r._)(x) || (0, r.B)(x),
        h = 1 === e.venue || 2 === e.venue,
        v = o.source === t.DataSource.VENDOR,
        y =
          e.quote?.id?.address ||
          m?.tradable?.quote?.id?.address ||
          m?.quote?.id?.address ||
          (b || f || v ? "" : n),
        g = y === n,
        _ = s(e.quoteAmount),
        w = e.marketCapAfterUsd?.value ?? "",
        k = (0, a.S)(e.priceUsd?.value) ? (e.priceQuote ?? "") : "";
      return {
        slotIndexId: d(e.ordinal, b || f || !h),
        tx: e.txId,
        timestamp: u(e.ordinal) ?? u(o.block) ?? new Date().toISOString(),
        program: l[e.venue] ?? "non_launchpad",
        userAddress: e.trader?.address ?? "",
        type: e.side === t.Side.BUY ? "buy" : "sell",
        baseAmount: s(e.baseAmount),
        quoteAmount: _,
        priceUsd: e.priceUsd?.value ?? "",
        priceSol: g ? e.priceQuote : "",
        amountSol: g ? _ : b || f ? "" : (e.value?.native ?? ""),
        amountUsd: e.value?.usd?.value ?? "",
        isBondingCurve: m
          ? m.phase === t.LifecyclePhase.BONDING
          : 1 === e.venue,
        mintAddress: o.id?.address ?? e.coin?.address ?? "",
        quoteMintAddress: y,
        poolAddress: e.pool?.address || (m?.tradable?.pool?.address ?? ""),
        marketCap: w,
        marketCapUsd: w || null,
        priceBasePerQuote: k
          ? ((e) => {
              if (!c.test(e)) return "";
              let t = new i.U(e);
              return t.gt(0) ? new i.U(1).div(t).toFixed() : "";
            })(k)
          : "",
        priceQuotePerBase: k,
        creatorAddress: "",
        platform: "",
        supply: "",
        solPriceUsd: g ? (e.quotePriceUsd?.value ?? "") : "",
        lpFee: null,
        protocolFee: s(e.protocolFee) || null,
        lpFeeUsd: null,
        protocolFeeUsd: null,
        creatorFee: s(e.creatorFee) || null,
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
