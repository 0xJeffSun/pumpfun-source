// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(445242),
    t = e.i(689943),
    r = e.i(389270),
    s = e.i(605587),
    l = e.i(26077);
  e.s([
    "f",
    0,
    (e) => {
      let i,
        n,
        o,
        d,
        u = (0, a.c)(19),
        { mint: c, program: m, chain_id: f } = e,
        { data: p, isLoading: h, error: g, refetch: x } = (0, t.n)(c, m, f);
      if (
        u[0] !== p?.athMarketCap ||
        u[1] !== f ||
        u[2] !== e ||
        u[3] !== c ||
        u[4] !== m
      ) {
        let a,
          o,
          d = (0, l.a)(p?.athMarketCap) ?? 0;
        (u[7] !== f || u[8] !== c
          ? ((a = (0, s.N)({ mint: c, chainId: f })),
            (u[7] = f),
            (u[8] = c),
            (u[9] = a))
          : (a = u[9]),
          (i = a),
          (n =
            c && (0, t.P)(c, m, f)
              ? i
                ? ((o = (0, l.a)(e.ath_market_cap) ?? 0),
                  e.protocol === r.G ? Math.max(d, o) : d > 0 ? d : o)
                : d
              : ((0, l.a)(e.ath_market_cap) ?? 0)),
          (u[0] = p?.athMarketCap),
          (u[1] = f),
          (u[2] = e),
          (u[3] = c),
          (u[4] = m),
          (u[5] = i),
          (u[6] = n));
      } else ((i = u[5]), (n = u[6]));
      let v = n;
      u[10] !== e.ath_market_cap || u[11] !== e.protocol || u[12] !== i
        ? ((o =
            i && e.protocol === r.G && ((0, l.a)(e.ath_market_cap) ?? 0) > 0),
          (u[10] = e.ath_market_cap),
          (u[11] = e.protocol),
          (u[12] = i),
          (u[13] = o))
        : (o = u[13]);
      let w = o,
        y = h && !w,
        b = g?.message || null;
      return (
        u[14] !== v || u[15] !== x || u[16] !== y || u[17] !== b
          ? ((d = { athMarketCap: v, isLoading: y, error: b, refetch: x }),
            (u[14] = v),
            (u[15] = x),
            (u[16] = y),
            (u[17] = b),
            (u[18] = d))
          : (d = u[18]),
        d
      );
    },
  ]);
};
