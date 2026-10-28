// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    {
      root: ["perps"],
      builderFee: ["perps", "builderFee"],
      markets: (e) => ["perps", "markets", e],
      spotCounterpart: (e) => ["perps", "spotCounterpart", e],
      market: (e) => ["perps", "market", e],
      tape: (e) => ["perps", "tape", e],
      fundingHistory: (e, t) => ["perps", "funding-history", e, t],
      positionsOf: (e) => ["perps", "positions", e],
      positions: (e, t) => [
        "perps",
        "positions",
        e,
        "all" === t ? "*" : [...t].sort().join(","),
      ],
      closedPositions: (e) => ["perps", "closedPositions", e],
      account: (e) => ["perps", "account", e],
      orders: (e) => ["perps", "orders", e],
      sweepQuote: (e, t, r, a = "relay") => ["perps", "sweepQuote", e, t, r, a],
      openPreview: (e) => [
        "perps",
        "openPreview",
        e.evmWallet,
        e.coin,
        e.side,
        e.leverage,
        e.amountAtomic,
        e.denomination,
        e.tpPx ?? "",
        e.slPx ?? "",
        e.rail ?? "",
      ],
      withdrawQuote: (e, t, r, a) => [
        "perps",
        "withdrawQuote",
        e,
        t,
        r,
        ...(void 0 === a ? [] : ["bridge", a.payoutCents, a.notionalCents]),
      ],
    },
  ]);
};
