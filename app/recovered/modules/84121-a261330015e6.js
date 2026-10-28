// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t;
  var n = e.i(445242),
    i = e.i(311282),
    r = e.i(940721),
    a = e.i(986071),
    s = e.i(400648);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        o,
        c,
        d,
        u = (0, n.c)(12),
        m = void 0 === e ? r.s : e;
      u[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = t ??=
            (0, i.k)({ parse: s.B, serialize: s.O }).withDefault(s.H)),
          (u[0] = l))
        : (l = u[0]);
      let [f, p] = (0, i.o)(a.f.HOME.PAGE, l);
      u[1] !== f || u[2] !== m
        ? ((o = (0, s.n)({ page: f, pageSize: m })),
          (u[1] = f),
          (u[2] = m),
          (u[3] = o))
        : (o = u[3]);
      let h = o;
      u[4] !== m || u[5] !== p
        ? ((c = (e) => {
            p(Math.floor(Math.max(0, e) / m) + 1);
          }),
          (u[4] = m),
          (u[5] = p),
          (u[6] = c))
        : (c = u[6]);
      let g = c;
      return (
        u[7] !== h || u[8] !== f || u[9] !== g || u[10] !== p
          ? ((d = {
              homePage: f,
              setHomePage: p,
              homeOffset: h,
              setHomeOffset: g,
            }),
            (u[7] = h),
            (u[8] = f),
            (u[9] = g),
            (u[10] = p),
            (u[11] = d))
          : (d = u[11]),
        d
      );
    },
  ]);
};
