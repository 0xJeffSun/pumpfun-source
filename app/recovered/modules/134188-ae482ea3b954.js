// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(557392),
    i = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let r,
        s = (0, t.c)(3),
        { coin: o } = e,
        a = (0, n.F)(o.mint);
      return (
        s[0] !== o || s[1] !== a
          ? ((r = {
              mint: o.mint,
              chainId: o.chain_id,
              coin: o,
              row: a,
              fallbackMarketCap: o.usd_market_cap,
            }),
            (s[0] = o),
            (s[1] = a),
            (s[2] = r))
          : (r = s[2]),
        (0, i.P)(r) ?? null
      );
    },
  ]);
};
