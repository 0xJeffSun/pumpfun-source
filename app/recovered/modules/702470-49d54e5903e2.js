// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(254667),
    n = e.i(690877),
    l = e.i(85324),
    i = e.i(181254),
    a = e.i(361308),
    s = e.i(76991);
  let o = new Map();
  e.s([
    "f",
    0,
    (e) => {
      let u,
        d,
        c,
        m = (0, t.c)(9),
        { coin: f, enabled: p } = e,
        h = (void 0 === p || p) && f.length > 0,
        b = (0, l.q)(5e3, h);
      return (
        m[0] !== f ? ((u = a.f.market(f)), (m[0] = f), (m[1] = u)) : (u = m[1]),
        m[2] !== f
          ? ((d = async (e) => {
              let { signal: t } = e,
                n = await (0, s.w)({ coin: f, signal: t });
              return (
                ((e, t = Date.now()) => {
                  null === e || "delayed" !== (0, i.h)(e, t)
                    ? o.delete(e?.coin ?? "")
                    : t - (o.get(e.coin) ?? 0) < 3e5 ||
                      (o.set(e.coin, t),
                      r.y.warn("[usePerpMarketDetail] feed delayed", {
                        coin: e.coin,
                        markPx: e.markPx,
                        markAsOf: e.markAsOf,
                        nextFundingAt: e.nextFundingAt,
                      }));
                })(n),
                n
              );
            }),
            (m[2] = f),
            (m[3] = d))
          : (d = m[3]),
        m[4] !== h || m[5] !== b || m[6] !== u || m[7] !== d
          ? ((c = {
              queryKey: u,
              queryFn: d,
              enabled: h,
              staleTime: 5e3,
              refetchInterval: b,
              refetchIntervalInBackground: !1,
            }),
            (m[4] = h),
            (m[5] = b),
            (m[6] = u),
            (m[7] = d),
            (m[8] = c))
          : (c = m[8]),
        (0, n.useQuery)(c)
      );
    },
  ]);
};
