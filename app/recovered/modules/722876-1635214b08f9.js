// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(946129),
    a = e.i(709119),
    i = e.i(524517),
    n = e.i(530501),
    l = e.i(346431);
  e.i(550675);
  var s = e.i(547562),
    o = e.i(965690);
  e.s([
    "f",
    0,
    function () {
      let e,
        c,
        d,
        m,
        u,
        f = (0, t.c)(14),
        [h, p] = (0, s.l)("feed.exploreWindow"),
        { urlWindow: x, setUrlWindow: g } = (0, a.f)(),
        { homeSort: b } = (0, r.f)(),
        [v] = (0, i.f)();
      f[0] !== v ? ((e = v.trim()), (f[0] = v), (f[1] = e)) : (e = f[1]);
      let y = "" !== e;
      f[2] !== b || f[3] !== y
        ? ((c = (0, n.n)({ sort: b, hasSearchTerm: y })),
          (f[2] = b),
          (f[3] = y),
          (f[4] = c))
        : (c = f[4]);
      let j = c;
      f[5] !== p || f[6] !== g
        ? ((d = (e) => {
            (p(e), g(e === o.O ? null : e));
          }),
          (f[5] = p),
          (f[6] = g),
          (f[7] = d))
        : (d = f[7]);
      let w = d,
        N = x ?? h;
      return (
        f[8] !== j || f[9] !== N
          ? ((m = j ? (0, l.q)(N) : N), (f[8] = j), (f[9] = N), (f[10] = m))
          : (m = f[10]),
        f[11] !== w || f[12] !== m
          ? ((u = [m, w]), (f[11] = w), (f[12] = m), (f[13] = u))
          : (u = f[13]),
        u
      );
    },
  ]);
};
