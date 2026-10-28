// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(557392),
    i = e.i(527260),
    l = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        n = (0, t.c)(4),
        { coin: o } = e,
        s = (0, r.n)(o.mint),
        c = (0, l.m)(o);
      return (
        n[0] !== c || n[1] !== o || n[2] !== s
          ? ((a = (0, i.f)({ coin: o, row: s, basis: c })),
            (n[0] = c),
            (n[1] = o),
            (n[2] = s),
            (n[3] = a))
          : (a = n[3]),
        a
      );
    },
  ]);
};
