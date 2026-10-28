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
      let { trade: s } = e,
        a = t(s.price_usd);
      return {
        slotIndexId: e.identity?.block_event_id ?? "",
        tx: e.identity?.tx_hash ?? "",
        timestamp: e.block_timestamp ?? new Date().toISOString(),
        program: "non_launchpad",
        userAddress: s.user_address ?? s.trader_address ?? "",
        type: "BUY" === s.type ? "buy" : "sell",
        baseAmount: s.base_amount ?? "",
        quoteAmount: s.quote_amount ?? "",
        priceUsd: s.price_usd ?? "",
        priceSol: "",
        amountSol: "",
        amountUsd: s.amount_usd ?? "",
        isBondingCurve: !1,
        mintAddress: i,
        quoteMintAddress: s.quote_address ?? "",
        poolAddress: s.pool_address ?? "",
        marketCap: s.market_cap_usd ?? "",
        priceBasePerQuote: a ? (s.price_base_per_quote ?? "") : "",
        priceQuotePerBase: a ? (s.price_quote_per_base ?? "") : "",
        creatorAddress: s.creator_address ?? "",
        platform: s.protocol ?? "",
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
