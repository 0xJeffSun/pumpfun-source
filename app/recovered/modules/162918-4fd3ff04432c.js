// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(913719);
  let i = ({ atomic: e, decimals: i, maxDecimals: a = 4 }) => {
    let n = Math.max(0, i - a);
    if (0 === n) return (0, t.N)(e, i, i);
    let s = e < BigInt(0),
      r = s ? -e : e,
      l = BigInt(10) ** BigInt(n),
      o = (r + l / BigInt(2)) / l;
    return (0, t.N)(s ? -o : o, a, a);
  };
  e.s([
    "R",
    0,
    {
      quote: null,
      quoteSource: null,
      isFetching: !1,
      isInputSettled: !0,
      errorMessage: null,
      errorReason: null,
      quoteSyncedAt: 0,
      refreshMs: null,
    },
    "x",
    0,
    i,
    "A",
    0,
    ({ figure: e, maxDecimals: t = 4 }) =>
      `≈ ${i({ atomic: e.outputAtomic, decimals: e.outputDecimals, maxDecimals: t })} ${e.outputSymbol}`,
    "b",
    0,
    (e) => null === e.quote && !e.isFetching && null === e.errorMessage,
    "y",
    0,
    ({ value: e, decimals: i }) =>
      !Number.isFinite(e) || e <= 0
        ? BigInt(0)
        : ((0, t.v)(e.toFixed(i), i) ?? BigInt(0)),
  ]);
};
