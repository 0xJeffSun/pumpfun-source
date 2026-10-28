// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242),
    n = e.i(117330);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        r = (0, s.c)(5),
        { column: i, onSetBoard: a, onSetTrending: o } = e,
        c = n.Y[i.type];
      if (!c) return null;
      let { Component: d } = c;
      return (
        r[0] !== d || r[1] !== i || r[2] !== a || r[3] !== o
          ? ((l = (0, t.jsx)(d, {
              column: i,
              onSetBoard: a,
              onSetTrending: o,
            })),
            (r[0] = d),
            (r[1] = i),
            (r[2] = a),
            (r[3] = o),
            (r[4] = l))
          : (l = r[4]),
        l
      );
    },
  ]);
};
