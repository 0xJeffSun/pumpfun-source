// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(311282),
    a = e.i(986071),
    i = e.i(965690);
  e.s([
    "f",
    0,
    function () {
      let e,
        n,
        l = (0, t.c)(4);
      l[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, r.b)(i.D)), (l[0] = e))
        : (e = l[0]);
      let [s, o] = (0, r.o)(a.f.HOME.WINDOW, e);
      return (
        l[1] !== o || l[2] !== s
          ? ((n = { urlWindow: s, setUrlWindow: o }),
            (l[1] = o),
            (l[2] = s),
            (l[3] = n))
          : (n = l[3]),
        n
      );
    },
  ]);
};
