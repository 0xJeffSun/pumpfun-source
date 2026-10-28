// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(311282),
    a = e.i(986071),
    i = e.i(637172),
    n = e.i(541710);
  let l = ["all", ...e.i(583448).D];
  e.s([
    "f",
    0,
    function () {
      let e,
        s,
        o,
        c = (0, t.c)(7);
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, r.b)(l).withDefault("all")), (c[0] = e))
        : (e = c[0]);
      let [d, m] = (0, r.o)(a.f.HOME.CHAIN, e),
        u = (0, n.l)();
      c[1] !== u || c[2] !== d
        ? ((s = "all" !== d && 0 === (0, i.W)([d], u).length ? "all" : d),
          (c[1] = u),
          (c[2] = d),
          (c[3] = s))
        : (s = c[3]);
      let f = s;
      return (
        c[4] !== f || c[5] !== m
          ? ((o = { homeChain: f, setHomeChain: m }),
            (c[4] = f),
            (c[5] = m),
            (c[6] = o))
          : (o = c[6]),
        o
      );
    },
  ]);
};
