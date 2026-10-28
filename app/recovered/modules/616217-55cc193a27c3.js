// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    n = e.i(762316);
  let i = () => () => {},
    l = () => null;
  e.s([
    "f",
    0,
    function (e, a, s) {
      let o,
        c,
        u,
        d = (0, t.c)(8),
        [m, f] = (0, r.useState)(null);
      d[0] !== e || d[1] !== a
        ? ((o = () => (0, n.X)(e, a)), (d[0] = e), (d[1] = a), (d[2] = o))
        : (o = d[2]);
      let h = o,
        p = (0, r.useSyncExternalStore)(i, h, l),
        g = m ?? p ?? s;
      d[3] !== e
        ? ((c = (t) => {
            (f(t), (0, n.F)(e, t));
          }),
          (d[3] = e),
          (d[4] = c))
        : (c = d[4]);
      let b = c;
      return (
        d[5] !== b || d[6] !== g
          ? ((u = [g, b]), (d[5] = b), (d[6] = g), (d[7] = u))
          : (u = d[7]),
        u
      );
    },
  ]);
};
