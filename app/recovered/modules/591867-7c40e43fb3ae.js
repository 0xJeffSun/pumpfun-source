// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(538661),
    l = e.i(148003);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        i = (0, r.c)(5),
        { message: n, onPress: o, flush: d } = e,
        { density: u, insetClassName: c } = (0, a.n)(),
        f =
          void 0 !== d && d ? "-mx-3 w-[calc(100%+1.5rem)] rounded-lg px-3" : c;
      return (
        i[0] !== u || i[1] !== n || i[2] !== o || i[3] !== f
          ? ((s = (0, t.jsx)(l.f, {
              density: u,
              onPress: o,
              className: f,
              children: n,
            })),
            (i[0] = u),
            (i[1] = n),
            (i[2] = o),
            (i[3] = f),
            (i[4] = s))
          : (s = i[4]),
        s
      );
    },
  ]);
};
