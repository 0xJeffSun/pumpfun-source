// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(732486),
    t = e.i(445242),
    r = e.i(538661),
    s = e.i(148003);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        i = (0, t.c)(5),
        { message: n, onPress: o, flush: d } = e,
        { density: u, insetClassName: c } = (0, r.n)(),
        m =
          void 0 !== d && d ? "-mx-3 w-[calc(100%+1.5rem)] rounded-lg px-3" : c;
      return (
        i[0] !== u || i[1] !== n || i[2] !== o || i[3] !== m
          ? ((l = (0, a.jsx)(s.f, {
              density: u,
              onPress: o,
              className: m,
              children: n,
            })),
            (i[0] = u),
            (i[1] = n),
            (i[2] = o),
            (i[3] = m),
            (i[4] = l))
          : (l = i[4]),
        l
      );
    },
  ]);
};
