// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(445242),
    t = e.i(352386),
    r = e.i(762316);
  let s = () => () => {},
    l = () => null;
  e.s([
    "f",
    0,
    function (e, i, n) {
      let o,
        d,
        u,
        c = (0, a.c)(8),
        [m, f] = (0, t.useState)(null);
      c[0] !== e || c[1] !== i
        ? ((o = () => (0, r.X)(e, i)), (c[0] = e), (c[1] = i), (c[2] = o))
        : (o = c[2]);
      let p = o,
        h = (0, t.useSyncExternalStore)(s, p, l),
        g = m ?? h ?? n;
      c[3] !== e
        ? ((d = (a) => {
            (f(a), (0, r.F)(e, a));
          }),
          (c[3] = e),
          (c[4] = d))
        : (d = c[4]);
      let x = d;
      return (
        c[5] !== x || c[6] !== g
          ? ((u = [g, x]), (c[5] = x), (c[6] = g), (c[7] = u))
          : (u = c[7]),
        u
      );
    },
  ]);
};
