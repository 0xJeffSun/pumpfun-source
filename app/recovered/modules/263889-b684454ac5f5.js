// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(689943),
    r = e.i(389270),
    a = e.i(605587),
    n = e.i(26077);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        o,
        s,
        c,
        d = (0, t.c)(19),
        { mint: m, program: x, chain_id: u } = e,
        { data: p, isLoading: b, error: f, refetch: h } = (0, i.n)(m, x, u);
      if (
        d[0] !== p?.athMarketCap ||
        d[1] !== u ||
        d[2] !== e ||
        d[3] !== m ||
        d[4] !== x
      ) {
        let t,
          s,
          c = (0, n.a)(p?.athMarketCap) ?? 0;
        (d[7] !== u || d[8] !== m
          ? ((t = (0, a.N)({ mint: m, chainId: u })),
            (d[7] = u),
            (d[8] = m),
            (d[9] = t))
          : (t = d[9]),
          (l = t),
          (o =
            m && (0, i.P)(m, x, u)
              ? l
                ? ((s = (0, n.a)(e.ath_market_cap) ?? 0),
                  e.protocol === r.G ? Math.max(c, s) : c > 0 ? c : s)
                : c
              : ((0, n.a)(e.ath_market_cap) ?? 0)),
          (d[0] = p?.athMarketCap),
          (d[1] = u),
          (d[2] = e),
          (d[3] = m),
          (d[4] = x),
          (d[5] = l),
          (d[6] = o));
      } else ((l = d[5]), (o = d[6]));
      let g = o;
      d[10] !== e.ath_market_cap || d[11] !== e.protocol || d[12] !== l
        ? ((s =
            l && e.protocol === r.G && ((0, n.a)(e.ath_market_cap) ?? 0) > 0),
          (d[10] = e.ath_market_cap),
          (d[11] = e.protocol),
          (d[12] = l),
          (d[13] = s))
        : (s = d[13]);
      let y = s,
        v = b && !y,
        _ = f?.message || null;
      return (
        d[14] !== g || d[15] !== h || d[16] !== v || d[17] !== _
          ? ((c = { athMarketCap: g, isLoading: v, error: _, refetch: h }),
            (d[14] = g),
            (d[15] = h),
            (d[16] = v),
            (d[17] = _),
            (d[18] = c))
          : (c = d[18]),
        c
      );
    },
  ]);
};
