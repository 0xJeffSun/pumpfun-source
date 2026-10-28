// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(935258),
    l = e.i(79631),
    a = e.i(384886);
  function i(e) {
    return {
      queryKey: l.F.batch(e.userId, e.mints),
      queryFn: () => (0, a.m)({ userId: e.userId, mints: e.mints }),
      staleTime: 3e4,
      placeholderData: (t, r) => (r?.queryKey[1] === e.userId ? t : void 0),
    };
  }
  function n(e, t) {
    return e.userId < t.userId ? -1 : 1;
  }
  function s(e) {
    let [t, r] = e;
    return { userId: t, mints: [...r].sort() };
  }
  e.s([
    "f",
    0,
    function (e) {
      let l,
        o,
        d,
        c,
        u,
        m,
        f = (0, t.c)(13);
      if (f[0] !== e) {
        let t = new Map();
        for (let r of e) {
          if (!r.userId || !r.mint) continue;
          let e = t.get(r.userId) ?? new Set();
          (e.add(r.mint), t.set(r.userId, e));
        }
        ((l = [...t.entries()].map(s).sort(n)), (f[0] = e), (f[1] = l));
      } else l = f[1];
      let p = l;
      (f[2] !== p ? ((o = p.map(i)), (f[2] = p), (f[3] = o)) : (o = f[3]),
        f[4] !== o
          ? ((d = { queries: o }), (f[4] = o), (f[5] = d))
          : (d = f[5]));
      let h = (0, r.f)(d);
      f[6] !== p || f[7] !== h
        ? ((c = new Map()),
          p.forEach((e, t) => {
            let r = h[t];
            c.set(e.userId, {
              byMint: (0, a.u)(r?.data ?? []),
              isLoading: r?.isLoading ?? !1,
            });
          }),
          (f[6] = p),
          (f[7] = h),
          (f[8] = c))
        : (c = f[8]);
      let v = c;
      f[9] !== v
        ? ((u = (e, t) => {
            let r = e ? v.get(e) : void 0;
            return {
              position: r ? (0, a.l)(r.byMint, t) : void 0,
              isLoading: r?.isLoading ?? !1,
            };
          }),
          (f[9] = v),
          (f[10] = u))
        : (u = f[10]);
      let b = u;
      return (
        f[11] !== b
          ? ((m = { readFor: b }), (f[11] = b), (f[12] = m))
          : (m = f[12]),
        m
      );
    },
  ]);
};
