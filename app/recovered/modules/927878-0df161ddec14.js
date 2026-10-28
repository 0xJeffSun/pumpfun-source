// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(557392),
    r = e.i(527260),
    l = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        n = (0, t.c)(4),
        { coin: s } = e,
        o = (0, i.P)(s.mint),
        d = (0, l.m)(s);
      return (
        n[0] !== d || n[1] !== s || n[2] !== o
          ? ((a = (0, r.f)({ coin: s, row: o, basis: d })),
            (n[0] = d),
            (n[1] = s),
            (n[2] = o),
            (n[3] = a))
          : (a = n[3]),
        a
      );
    },
  ]);
};
