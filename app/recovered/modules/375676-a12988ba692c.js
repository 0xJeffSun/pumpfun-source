// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(690877),
    r = e.i(38279),
    a = e.i(636882),
    n = e.i(997627),
    s = e.i(693908);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        o,
        c,
        m,
        u,
        d,
        f,
        p,
        h = (0, t.c)(31),
        {
          coinAddress: x,
          coinCreatedTimestamp: v,
          chainId: g,
          timeframe: b,
          width: y,
          queryOptions: _,
          youngCoinSource: j,
        } = e,
        N = void 0 === j ? "candles" : j;
      h[0] !== v || h[1] !== N
        ? ((l = "candles" === N && (0, s.a)(v)),
          (h[0] = v),
          (h[1] = N),
          (h[2] = l))
        : (l = h[2]);
      let w = l;
      if (
        h[3] !== g ||
        h[4] !== x ||
        h[5] !== v ||
        h[6] !== _ ||
        h[7] !== b ||
        h[8] !== w ||
        h[9] !== y ||
        h[10] !== N
      ) {
        let e,
          t,
          l = (0, s.Y)(v),
          p = w ? (0, s.S)(v) : null,
          j = b ?? l.timeframe,
          k = y ?? l.width;
        (h[17] !== g || h[18] !== x || h[19] !== v
          ? ((e = (0, a.f)({
              coinAddress: x,
              coinCreatedTimestamp: v,
              chainId: g,
            })),
            (h[17] = g),
            (h[18] = x),
            (h[19] = v),
            (h[20] = e))
          : (e = h[20]),
          (c = e),
          h[21] !== _ ? ((t = _ ?? {}), (h[21] = _), (h[22] = t)) : (t = h[22]),
          h[23] !== t
            ? (({ enabled: o, ...m } = t),
              (h[23] = t),
              (h[24] = o),
              (h[25] = m))
            : ((o = h[24]), (m = h[25])),
          (f = i.useQuery),
          (u = () =>
            (0, n.B)({
              coinAddress: x,
              coinCreatedTimestamp: v,
              chainId: g,
              timeframe: j,
              width: k,
              youngCoinSource: N,
            })),
          (d = w
            ? [
                ...r.Q.COIN_CANDLES({
                  coinAddress: x,
                  coinCreatedTimestamp: v,
                  interval: p.interval,
                  limit: p.limit,
                }),
                "sparklineLineChartPoints",
                g ?? null,
              ]
            : [
                ...r.Q.COIN_LINE_CHART({
                  coinAddress: x,
                  coinCreatedTimestamp: v,
                  timeframe: j,
                  width: k,
                }),
                "sparklineLineChartPoints",
                g ?? null,
              ]),
          (h[3] = g),
          (h[4] = x),
          (h[5] = v),
          (h[6] = _),
          (h[7] = b),
          (h[8] = w),
          (h[9] = y),
          (h[10] = N),
          (h[11] = o),
          (h[12] = c),
          (h[13] = m),
          (h[14] = u),
          (h[15] = d),
          (h[16] = f));
      } else
        ((o = h[11]),
          (c = h[12]),
          (m = h[13]),
          (u = h[14]),
          (d = h[15]),
          (f = h[16]));
      let k = c && (o ?? !0);
      return (
        h[26] !== m || h[27] !== u || h[28] !== d || h[29] !== k
          ? ((p = { queryFn: u, queryKey: d, ...m, enabled: k }),
            (h[26] = m),
            (h[27] = u),
            (h[28] = d),
            (h[29] = k),
            (h[30] = p))
          : (p = h[30]),
        f(p)
      );
    },
  ]);
};
