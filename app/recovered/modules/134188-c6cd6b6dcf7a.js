// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(557392),
    r = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let i,
        a = (0, t.c)(3),
        { coin: o } = e,
        l = (0, n.F)(o.mint);
      return (
        a[0] !== o || a[1] !== l
          ? ((i = {
              mint: o.mint,
              chainId: o.chain_id,
              coin: o,
              row: l,
              fallbackMarketCap: o.usd_market_cap,
            }),
            (a[0] = o),
            (a[1] = l),
            (a[2] = i))
          : (i = a[2]),
        (0, r.P)(i) ?? null
      );
    },
  ]);
};
