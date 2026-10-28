// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(689943),
    a = e.i(389270),
    i = e.i(605587),
    s = e.i(26077);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        o,
        n,
        d,
        u = (0, t.c)(19),
        { mint: c, program: f, chain_id: m } = e,
        { data: p, isLoading: v, error: h, refetch: y } = (0, r.n)(c, f, m);
      if (
        u[0] !== p?.athMarketCap ||
        u[1] !== m ||
        u[2] !== e ||
        u[3] !== c ||
        u[4] !== f
      ) {
        let t,
          n,
          d = (0, s.a)(p?.athMarketCap) ?? 0;
        (u[7] !== m || u[8] !== c
          ? ((t = (0, i.N)({ mint: c, chainId: m })),
            (u[7] = m),
            (u[8] = c),
            (u[9] = t))
          : (t = u[9]),
          (l = t),
          (o =
            c && (0, r.P)(c, f, m)
              ? l
                ? ((n = (0, s.a)(e.ath_market_cap) ?? 0),
                  e.protocol === a.G ? Math.max(d, n) : d > 0 ? d : n)
                : d
              : ((0, s.a)(e.ath_market_cap) ?? 0)),
          (u[0] = p?.athMarketCap),
          (u[1] = m),
          (u[2] = e),
          (u[3] = c),
          (u[4] = f),
          (u[5] = l),
          (u[6] = o));
      } else ((l = u[5]), (o = u[6]));
      let x = o;
      u[10] !== e.ath_market_cap || u[11] !== e.protocol || u[12] !== l
        ? ((n =
            l && e.protocol === a.G && ((0, s.a)(e.ath_market_cap) ?? 0) > 0),
          (u[10] = e.ath_market_cap),
          (u[11] = e.protocol),
          (u[12] = l),
          (u[13] = n))
        : (n = u[13]);
      let g = n,
        w = v && !g,
        b = h?.message || null;
      return (
        u[14] !== x || u[15] !== y || u[16] !== w || u[17] !== b
          ? ((d = { athMarketCap: x, isLoading: w, error: b, refetch: y }),
            (u[14] = x),
            (u[15] = y),
            (u[16] = w),
            (u[17] = b),
            (u[18] = d))
          : (d = u[18]),
        d
      );
    },
  ]);
};
