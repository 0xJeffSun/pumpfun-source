// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(96224),
    a = e.i(782067),
    n = e.i(690877),
    r = e.i(653706);
  let s = "xProfilesBatch",
    l = (e) => [...new Set(e.filter(Boolean))].sort(),
    o = async (e, t) => {
      let i = await (0, a.H)(e, t),
        n = (0, a.V)(i),
        s = {};
      for (let e of t) s[e] = (0, r.p)(n.get(e));
      return s;
    };
  e.s([
    "W",
    0,
    (e) => e.invalidateQueries({ queryKey: [s] }),
    "U",
    0,
    (e) => {
      let a,
        r,
        c,
        d,
        m = (0, t.c)(12),
        { addresses: u, enabled: p, queryOptions: f } = e,
        { clientServerUrl: x } = (0, i.useApiClientsConfig)();
      m[0] !== u ? ((a = l(u)), (m[0] = u), (m[1] = a)) : (a = m[1]);
      let g = a,
        h = (p ?? !0) && g.length > 0;
      return (
        (m[2] !== x || m[3] !== g
          ? ((r = () => o(x, g)), (m[2] = x), (m[3] = g), (m[4] = r))
          : (r = m[4]),
        m[5] !== g)
          ? ((c = [s, l(g)]), (m[5] = g), (m[6] = c))
          : (c = m[6]),
        m[7] !== h || m[8] !== f || m[9] !== r || m[10] !== c
          ? ((d = {
              enabled: h,
              queryFn: r,
              queryKey: c,
              staleTime: 6e4,
              ...f,
            }),
            (m[7] = h),
            (m[8] = f),
            (m[9] = r),
            (m[10] = c),
            (m[11] = d))
          : (d = m[11]),
        (0, n.useQuery)(d)
      );
    },
  ]);
};
