// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(38279),
    i = e.i(402992),
    a = e.i(605587);
  e.s([
    "f",
    0,
    (e) => {
      let o,
        l,
        s,
        u,
        d,
        c,
        f = (0, t.c)(16),
        { mint: h, chainId: m, enabled: g } = e;
      (f[0] !== m || f[1] !== h
        ? ((o = ((e, t) => {
            if (!(0, a.N)({ mint: e, chainId: t })) return;
            let n = Number((0, a.w)(t));
            return Number.isInteger(n) && n > 0 ? n : void 0;
          })(h, m)),
          (s = n.useQuery),
          (l = r.Q.TOP_TRADER_TRADES(h, o)),
          (f[0] = m),
          (f[1] = h),
          (f[2] = o),
          (f[3] = l),
          (f[4] = s))
        : ((o = f[2]), (l = f[3]), (s = f[4])),
        f[5] !== o || f[6] !== h
          ? ((u = (e) => {
              let { signal: t } = e;
              return (0, i.Z)({ mint: h, chainId: o, signal: t });
            }),
            (f[5] = o),
            (f[6] = h),
            (f[7] = u))
          : (u = f[7]));
      let p = g && h.length > 0;
      f[8] !== l || f[9] !== u || f[10] !== p
        ? ((d = { queryKey: l, queryFn: u, enabled: p, staleTime: 3e4 }),
          (f[8] = l),
          (f[9] = u),
          (f[10] = p),
          (f[11] = d))
        : (d = f[11]);
      let b = s(d);
      if (!g) {
        let e;
        return (
          f[12] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = { data: i.c, loading: !1 }), (f[12] = e))
            : (e = f[12]),
          e
        );
      }
      let w = b.data ?? i.c;
      return (
        f[13] !== b.isPending || f[14] !== w
          ? ((c = { data: w, loading: b.isPending }),
            (f[13] = b.isPending),
            (f[14] = w),
            (f[15] = c))
          : (c = f[15]),
        c
      );
    },
  ]);
};
