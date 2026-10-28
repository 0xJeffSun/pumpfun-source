// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(557392),
    i = e.i(527260),
    r = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let s,
        a = (0, t.c)(4),
        { coin: n } = e,
        o = (0, l.P)(n.mint),
        d = (0, r.m)(n);
      return (
        a[0] !== d || a[1] !== n || a[2] !== o
          ? ((s = (0, i.f)({ coin: n, row: o, basis: d })),
            (a[0] = d),
            (a[1] = n),
            (a[2] = o),
            (a[3] = s))
          : (s = a[3]),
        s
      );
    },
  ]);
};
