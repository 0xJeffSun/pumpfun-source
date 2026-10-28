// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(689943),
    i = e.i(389270),
    n = e.i(605587),
    r = e.i(26077);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        s,
        o,
        c,
        d = (0, t.c)(19),
        { mint: m, program: u, chain_id: h } = e,
        { data: p, isLoading: f, error: x, refetch: _ } = (0, a.n)(m, u, h);
      if (
        d[0] !== p?.athMarketCap ||
        d[1] !== h ||
        d[2] !== e ||
        d[3] !== m ||
        d[4] !== u
      ) {
        let t,
          o,
          c = (0, r.a)(p?.athMarketCap) ?? 0;
        (d[7] !== h || d[8] !== m
          ? ((t = (0, n.N)({ mint: m, chainId: h })),
            (d[7] = h),
            (d[8] = m),
            (d[9] = t))
          : (t = d[9]),
          (l = t),
          (s =
            m && (0, a.P)(m, u, h)
              ? l
                ? ((o = (0, r.a)(e.ath_market_cap) ?? 0),
                  e.protocol === i.G ? Math.max(c, o) : c > 0 ? c : o)
                : c
              : ((0, r.a)(e.ath_market_cap) ?? 0)),
          (d[0] = p?.athMarketCap),
          (d[1] = h),
          (d[2] = e),
          (d[3] = m),
          (d[4] = u),
          (d[5] = l),
          (d[6] = s));
      } else ((l = d[5]), (s = d[6]));
      let g = s;
      d[10] !== e.ath_market_cap || d[11] !== e.protocol || d[12] !== l
        ? ((o =
            l && e.protocol === i.G && ((0, r.a)(e.ath_market_cap) ?? 0) > 0),
          (d[10] = e.ath_market_cap),
          (d[11] = e.protocol),
          (d[12] = l),
          (d[13] = o))
        : (o = d[13]);
      let y = o,
        v = f && !y,
        b = x?.message || null;
      return (
        d[14] !== g || d[15] !== _ || d[16] !== v || d[17] !== b
          ? ((c = { athMarketCap: g, isLoading: v, error: b, refetch: _ }),
            (d[14] = g),
            (d[15] = _),
            (d[16] = v),
            (d[17] = b),
            (d[18] = c))
          : (c = d[18]),
        c
      );
    },
  ]);
};
