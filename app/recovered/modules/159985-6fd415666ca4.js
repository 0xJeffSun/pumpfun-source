// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
    let t = Number(e);
    return Number.isFinite(t) && t > 0;
  };
  e.s([
    "S",
    0,
    t,
    "Y",
    0,
    (e, i) => {
      let { trade: r } = e,
        a = t(r.price_usd);
      return {
        slotIndexId: e.identity?.block_event_id ?? "",
        tx: e.identity?.tx_hash ?? "",
        timestamp: e.block_timestamp ?? new Date().toISOString(),
        program: "non_launchpad",
        userAddress: r.user_address ?? r.trader_address ?? "",
        type: "BUY" === r.type ? "buy" : "sell",
        baseAmount: r.base_amount ?? "",
        quoteAmount: r.quote_amount ?? "",
        priceUsd: r.price_usd ?? "",
        priceSol: "",
        amountSol: "",
        amountUsd: r.amount_usd ?? "",
        isBondingCurve: !1,
        mintAddress: i,
        quoteMintAddress: r.quote_address ?? "",
        poolAddress: r.pool_address ?? "",
        marketCap: r.market_cap_usd ?? "",
        priceBasePerQuote: a ? (r.price_base_per_quote ?? "") : "",
        priceQuotePerBase: a ? (r.price_quote_per_base ?? "") : "",
        creatorAddress: r.creator_address ?? "",
        platform: r.protocol ?? "",
        supply: "",
        solPriceUsd: "",
        lpFee: null,
        protocolFee: null,
        lpFeeUsd: null,
        protocolFeeUsd: null,
        creatorFee: null,
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
