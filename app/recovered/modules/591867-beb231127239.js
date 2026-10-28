// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(538661),
    r = e.i(148003);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        n = (0, i.c)(5),
        { message: o, onPress: s, flush: d } = e,
        { density: u, insetClassName: c } = (0, l.n)(),
        m =
          void 0 !== d && d ? "-mx-3 w-[calc(100%+1.5rem)] rounded-lg px-3" : c;
      return (
        n[0] !== u || n[1] !== o || n[2] !== s || n[3] !== m
          ? ((a = (0, t.jsx)(r.f, {
              density: u,
              onPress: s,
              className: m,
              children: o,
            })),
            (n[0] = u),
            (n[1] = o),
            (n[2] = s),
            (n[3] = m),
            (n[4] = a))
          : (a = n[4]),
        a
      );
    },
  ]);
};
