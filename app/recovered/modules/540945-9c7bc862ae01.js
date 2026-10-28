// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(557392),
    r = e.i(527260),
    n = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let i,
        a = (0, t.c)(4),
        { coin: s } = e,
        o = (0, l.n)(s.mint),
        c = (0, n.m)(s);
      return (
        a[0] !== c || a[1] !== s || a[2] !== o
          ? ((i = (0, r.f)({ coin: s, row: o, basis: c })),
            (a[0] = c),
            (a[1] = s),
            (a[2] = o),
            (a[3] = i))
          : (i = a[3]),
        i
      );
    },
  ]);
};
