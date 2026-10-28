// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(557392),
    r = e.i(527260),
    i = e.i(662093);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        o = (0, t.c)(4),
        { coin: l } = e,
        s = (0, n.n)(l.mint),
        u = (0, i.m)(l);
      return (
        o[0] !== u || o[1] !== l || o[2] !== s
          ? ((a = (0, r.f)({ coin: l, row: s, basis: u })),
            (o[0] = u),
            (o[1] = l),
            (o[2] = s),
            (o[3] = a))
          : (a = o[3]),
        a
      );
    },
  ]);
};
