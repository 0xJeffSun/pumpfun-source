// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(322315),
    n = e.i(254010),
    i = e.i(574472),
    a = e.i(608295),
    l = e.i(544514),
    s = e.i(574588);
  e.s([
    "f",
    0,
    () => {
      let e,
        o,
        c = (0, t.c)(5),
        { address: u } = (0, i.F)(),
        d = (0, n.k)(r.D.WEB_DIRECT_MESSAGES),
        f = (0, l.f)(),
        m = d && !!u,
        p = m && f;
      c[0] !== p ? ((e = { enabled: p }), (c[0] = p), (c[1] = e)) : (e = c[1]);
      let { entries: h } = (0, a.f)(e);
      return (
        c[2] !== h || c[3] !== m
          ? ((o = m ? (0, s.w)(h) : 0), (c[2] = h), (c[3] = m), (c[4] = o))
          : (o = c[4]),
        o
      );
    },
  ]);
};
