// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = (0, t.i(78436).$)((t) => ({
    pair: { kind: "sol" },
    setPair: (e) => t({ pair: e, isQuoteMintEnabled: "usdc" === e.kind }),
    isQuoteMintEnabled: !1,
    setIsQuoteMintEnabled: (e) =>
      t({ pair: { kind: e ? "usdc" : "sol" }, isQuoteMintEnabled: e }),
  }));
  t.s([
    "Q",
    0,
    (t) => "stock" === t.kind || "pump" === t.kind,
    "_",
    0,
    (t) =>
      "stock" === t.kind
        ? t.stock
        : "pump" === t.kind
          ? { mint: t.coin.mint, symbol: t.coin.symbol }
          : void 0,
    "g",
    0,
    e,
  ]);
};
