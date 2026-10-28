// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(557392),
    r = e.i(527260),
    a = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let i,
        s = (0, t.c)(4),
        { coin: n } = e,
        o = (0, l.P)(n.mint),
        d = (0, a.m)(n);
      return (
        s[0] !== d || s[1] !== n || s[2] !== o
          ? ((i = (0, r.f)({ coin: n, row: o, basis: d })),
            (s[0] = d),
            (s[1] = n),
            (s[2] = o),
            (s[3] = i))
          : (i = s[3]),
        i
      );
    },
  ]);
};
