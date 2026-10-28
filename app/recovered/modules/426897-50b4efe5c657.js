// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
    if (null == e || "" === e) return !1;
    let t = Number(e);
    return Number.isFinite(t) && t > 0;
  };
  e.s([
    "k",
    0,
    t,
    "V",
    0,
    (e) =>
      t(e.amountUSD) ||
      t(e.amountUsd) ||
      t(e.amountSOL) ||
      t(e.amountSol) ||
      t(e.baseAmount) ||
      t(e.quoteAmount),
  ]);
};
