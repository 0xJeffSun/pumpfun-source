// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(96224),
    i = e.i(782067),
    n = e.i(690877),
    r = e.i(653706);
  let l = "xProfilesBatch",
    s = (e) => [...new Set(e.filter(Boolean))].sort(),
    o = async (e, t) => {
      let a = await (0, i.H)(e, t),
        n = (0, i.V)(a),
        l = {};
      for (let e of t) l[e] = (0, r.p)(n.get(e));
      return l;
    };
  e.s([
    "W",
    0,
    (e) => e.invalidateQueries({ queryKey: [l] }),
    "U",
    0,
    (e) => {
      let i,
        r,
        c,
        d,
        m = (0, t.c)(12),
        { addresses: u, enabled: h, queryOptions: p } = e,
        { clientServerUrl: f } = (0, a.useApiClientsConfig)();
      m[0] !== u ? ((i = s(u)), (m[0] = u), (m[1] = i)) : (i = m[1]);
      let x = i,
        _ = (h ?? !0) && x.length > 0;
      return (
        (m[2] !== f || m[3] !== x
          ? ((r = () => o(f, x)), (m[2] = f), (m[3] = x), (m[4] = r))
          : (r = m[4]),
        m[5] !== x)
          ? ((c = [l, s(x)]), (m[5] = x), (m[6] = c))
          : (c = m[6]),
        m[7] !== _ || m[8] !== p || m[9] !== r || m[10] !== c
          ? ((d = {
              enabled: _,
              queryFn: r,
              queryKey: c,
              staleTime: 6e4,
              ...p,
            }),
            (m[7] = _),
            (m[8] = p),
            (m[9] = r),
            (m[10] = c),
            (m[11] = d))
          : (d = m[11]),
        (0, n.useQuery)(d)
      );
    },
  ]);
};
