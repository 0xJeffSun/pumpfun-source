// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    i = e.i(38279),
    a = e.i(636882),
    n = e.i(997627),
    s = e.i(693908);
  e.s([
    "f",
    0,
    (e, l, o, c) => {
      let m,
        d,
        u,
        h,
        x,
        f,
        b,
        p,
        y,
        v,
        g = (0, t.c)(35);
      g[0] !== l
        ? ((m = null != l && Number.isFinite(l) && l > 0 && (0, s.a)(l)),
          (g[0] = l),
          (g[1] = m))
        : (m = g[1]);
      let w = m;
      if (
        g[2] !== l ||
        g[3] !== e ||
        g[4] !== c?.chainId ||
        g[5] !== c?.timeframe ||
        g[6] !== w ||
        g[7] !== o
      ) {
        let t,
          n =
            null != l && Number.isFinite(l) && l > 0
              ? (0, s.Y)(l)
              : {
                  timeframe: i.v.COIN_LINE_CHART.TIMEFRAME,
                  width: i.v.COIN_LINE_CHART.WIDTH,
                },
          m = w ? (0, s.S)(l) : null;
        ((f = c?.timeframe ?? n.timeframe), (u = o ?? n.width));
        let b = c?.chainId;
        (g[13] !== l || g[14] !== e || g[15] !== b
          ? ((t = (0, a.f)({
              coinAddress: e,
              coinCreatedTimestamp: l,
              chainId: b,
            })),
            (g[13] = l),
            (g[14] = e),
            (g[15] = b),
            (g[16] = t))
          : (t = g[16]),
          (d = t),
          (x = r.useQuery),
          (h = w
            ? [
                ...i.Q.COIN_CANDLES({
                  coinAddress: e,
                  coinCreatedTimestamp: l ?? 0,
                  interval: m.interval,
                  limit: m.limit,
                }),
                "sparklineCandlesticks",
                c?.chainId ?? null,
              ]
            : [
                ...i.Q.COIN_LINE_CHART({
                  coinAddress: e,
                  coinCreatedTimestamp: l ?? 0,
                  timeframe: f,
                  width: u,
                }),
                "sparklineCandlesticks",
                c?.chainId ?? null,
              ]),
          (g[2] = l),
          (g[3] = e),
          (g[4] = c?.chainId),
          (g[5] = c?.timeframe),
          (g[6] = w),
          (g[7] = o),
          (g[8] = d),
          (g[9] = u),
          (g[10] = h),
          (g[11] = x),
          (g[12] = f));
      } else ((d = g[8]), (u = g[9]), (h = g[10]), (x = g[11]), (f = g[12]));
      g[17] !== l ||
      g[18] !== e ||
      g[19] !== c?.chainId ||
      g[20] !== u ||
      g[21] !== f
        ? ((b = () =>
            (0, n.u)({
              coinAddress: e,
              coinCreatedTimestamp: l ?? 0,
              chainId: c?.chainId,
              timeframe: f,
              width: u,
            })),
          (g[17] = l),
          (g[18] = e),
          (g[19] = c?.chainId),
          (g[20] = u),
          (g[21] = f),
          (g[22] = b))
        : (b = g[22]);
      let k = c?.staleTime ?? (w ? 15e3 : 3e5),
        N = c?.refetchInterval;
      g[23] !== d || g[24] !== h || g[25] !== b || g[26] !== k || g[27] !== N
        ? ((p = {
            queryKey: h,
            queryFn: b,
            enabled: d,
            staleTime: k,
            gcTime: 6e5,
            retry: 1,
            retryDelay: 2e3,
            refetchInterval: N,
          }),
          (g[23] = d),
          (g[24] = h),
          (g[25] = b),
          (g[26] = k),
          (g[27] = N),
          (g[28] = p))
        : (p = g[28]);
      let { data: j, isLoading: _, error: C } = x(p);
      return (
        g[29] !== j ? ((y = j || []), (g[29] = j), (g[30] = y)) : (y = g[30]),
        g[31] !== _ || g[32] !== y || g[33] !== C
          ? ((v = { candlesticks: y, isLoading: _, error: C }),
            (g[31] = _),
            (g[32] = y),
            (g[33] = C),
            (g[34] = v))
          : (v = g[34]),
        v
      );
    },
  ]);
};
