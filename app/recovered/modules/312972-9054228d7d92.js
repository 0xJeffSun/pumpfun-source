// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    t = e.i(445242),
    s = e.i(574472),
    i = e.i(466786),
    u = e.i(867175);
  e.s([
    "PrivyLivestreamUserProvider",
    0,
    (e) => {
      let o,
        n,
        a,
        l = (0, t.c)(11),
        { children: c } = e,
        { user: d, address: v, decodedJwt: f, authReady: m } = (0, s.F)(),
        h = d?.address || v || void 0;
      l[0] !== f || l[1] !== h
        ? ((o = h ? (0, i.f)(f, h) : f?.userId),
          (l[0] = f),
          (l[1] = h),
          (l[2] = o))
        : (o = l[2]);
      let p = o,
        b = d?.userId || p || void 0;
      return (
        l[3] !== h || l[4] !== b || l[5] !== d
          ? ((n = { ...d, userId: b, address: h }),
            (l[3] = h),
            (l[4] = b),
            (l[5] = d),
            (l[6] = n))
          : (n = l[6]),
        l[7] !== m || l[8] !== c || l[9] !== n
          ? ((a = (0, r.jsx)(u.F, { user: n, authReady: m, children: c })),
            (l[7] = m),
            (l[8] = c),
            (l[9] = n),
            (l[10] = a))
          : (a = l[10]),
        a
      );
    },
  ]);
};
