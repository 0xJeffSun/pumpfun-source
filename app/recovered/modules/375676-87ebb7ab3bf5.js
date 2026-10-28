// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    a = e.i(38279),
    i = e.i(636882),
    n = e.i(997627),
    l = e.i(693908);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        o,
        c,
        d,
        m,
        u,
        f,
        h,
        p = (0, t.c)(31),
        {
          coinAddress: x,
          coinCreatedTimestamp: g,
          chainId: b,
          timeframe: v,
          width: y,
          queryOptions: j,
          youngCoinSource: w,
        } = e,
        N = void 0 === w ? "candles" : w;
      p[0] !== g || p[1] !== N
        ? ((s = "candles" === N && (0, l.a)(g)),
          (p[0] = g),
          (p[1] = N),
          (p[2] = s))
        : (s = p[2]);
      let _ = s;
      if (
        p[3] !== b ||
        p[4] !== x ||
        p[5] !== g ||
        p[6] !== j ||
        p[7] !== v ||
        p[8] !== _ ||
        p[9] !== y ||
        p[10] !== N
      ) {
        let e,
          t,
          s = (0, l.Y)(g),
          h = _ ? (0, l.S)(g) : null,
          w = v ?? s.timeframe,
          k = y ?? s.width;
        (p[17] !== b || p[18] !== x || p[19] !== g
          ? ((e = (0, i.f)({
              coinAddress: x,
              coinCreatedTimestamp: g,
              chainId: b,
            })),
            (p[17] = b),
            (p[18] = x),
            (p[19] = g),
            (p[20] = e))
          : (e = p[20]),
          (c = e),
          p[21] !== j ? ((t = j ?? {}), (p[21] = j), (p[22] = t)) : (t = p[22]),
          p[23] !== t
            ? (({ enabled: o, ...d } = t),
              (p[23] = t),
              (p[24] = o),
              (p[25] = d))
            : ((o = p[24]), (d = p[25])),
          (f = r.useQuery),
          (m = () =>
            (0, n.B)({
              coinAddress: x,
              coinCreatedTimestamp: g,
              chainId: b,
              timeframe: w,
              width: k,
              youngCoinSource: N,
            })),
          (u = _
            ? [
                ...a.Q.COIN_CANDLES({
                  coinAddress: x,
                  coinCreatedTimestamp: g,
                  interval: h.interval,
                  limit: h.limit,
                }),
                "sparklineLineChartPoints",
                b ?? null,
              ]
            : [
                ...a.Q.COIN_LINE_CHART({
                  coinAddress: x,
                  coinCreatedTimestamp: g,
                  timeframe: w,
                  width: k,
                }),
                "sparklineLineChartPoints",
                b ?? null,
              ]),
          (p[3] = b),
          (p[4] = x),
          (p[5] = g),
          (p[6] = j),
          (p[7] = v),
          (p[8] = _),
          (p[9] = y),
          (p[10] = N),
          (p[11] = o),
          (p[12] = c),
          (p[13] = d),
          (p[14] = m),
          (p[15] = u),
          (p[16] = f));
      } else
        ((o = p[11]),
          (c = p[12]),
          (d = p[13]),
          (m = p[14]),
          (u = p[15]),
          (f = p[16]));
      let k = c && (o ?? !0);
      return (
        p[26] !== d || p[27] !== m || p[28] !== u || p[29] !== k
          ? ((h = { queryFn: m, queryKey: u, ...d, enabled: k }),
            (p[26] = d),
            (p[27] = m),
            (p[28] = u),
            (p[29] = k),
            (p[30] = h))
          : (h = p[30]),
        f(h)
      );
    },
  ]);
};
