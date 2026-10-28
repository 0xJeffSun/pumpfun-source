// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(689943),
    a = e.i(389270),
    s = e.i(605587),
    n = e.i(26077);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        r,
        c,
        o,
        d = (0, t.c)(19),
        { mint: h, program: x, chain_id: f } = e,
        { data: m, isLoading: u, error: b, refetch: p } = (0, i.n)(h, x, f);
      if (
        d[0] !== m?.athMarketCap ||
        d[1] !== f ||
        d[2] !== e ||
        d[3] !== h ||
        d[4] !== x
      ) {
        let t,
          c,
          o = (0, n.a)(m?.athMarketCap) ?? 0;
        (d[7] !== f || d[8] !== h
          ? ((t = (0, s.N)({ mint: h, chainId: f })),
            (d[7] = f),
            (d[8] = h),
            (d[9] = t))
          : (t = d[9]),
          (l = t),
          (r =
            h && (0, i.P)(h, x, f)
              ? l
                ? ((c = (0, n.a)(e.ath_market_cap) ?? 0),
                  e.protocol === a.G ? Math.max(o, c) : o > 0 ? o : c)
                : o
              : ((0, n.a)(e.ath_market_cap) ?? 0)),
          (d[0] = m?.athMarketCap),
          (d[1] = f),
          (d[2] = e),
          (d[3] = h),
          (d[4] = x),
          (d[5] = l),
          (d[6] = r));
      } else ((l = d[5]), (r = d[6]));
      let _ = r;
      d[10] !== e.ath_market_cap || d[11] !== e.protocol || d[12] !== l
        ? ((c =
            l && e.protocol === a.G && ((0, n.a)(e.ath_market_cap) ?? 0) > 0),
          (d[10] = e.ath_market_cap),
          (d[11] = e.protocol),
          (d[12] = l),
          (d[13] = c))
        : (c = d[13]);
      let g = c,
        y = u && !g,
        v = b?.message || null;
      return (
        d[14] !== _ || d[15] !== p || d[16] !== y || d[17] !== v
          ? ((o = { athMarketCap: _, isLoading: y, error: v, refetch: p }),
            (d[14] = _),
            (d[15] = p),
            (d[16] = y),
            (d[17] = v),
            (d[18] = o))
          : (o = d[18]),
        o
      );
    },
  ]);
};
