// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(557392),
    l = e.i(527260),
    r = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        s = (0, t.c)(4),
        { coin: n } = e,
        o = (0, i.P)(n.mint),
        d = (0, r.m)(n);
      return (
        s[0] !== d || s[1] !== n || s[2] !== o
          ? ((a = (0, l.f)({ coin: n, row: o, basis: d })),
            (s[0] = d),
            (s[1] = n),
            (s[2] = o),
            (s[3] = a))
          : (a = s[3]),
        a
      );
    },
  ]);
};
