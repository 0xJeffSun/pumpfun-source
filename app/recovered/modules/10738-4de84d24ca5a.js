// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386);
  function r() {}
  e.s([
    "f",
    0,
    (e, n) => {
      let a,
        o,
        s,
        l = (0, t.c)(6),
        u = n?.serverFallback ?? !1;
      l[0] !== e
        ? ((a = (t) => {
            if ("function" != typeof window.matchMedia) return r;
            let i = window.matchMedia(e);
            return (
              i.addEventListener("change", t),
              () => i.removeEventListener("change", t)
            );
          }),
          (l[0] = e),
          (l[1] = a))
        : (a = l[1]);
      let c = a;
      l[2] !== e
        ? ((o = () =>
            "function" == typeof window.matchMedia &&
            window.matchMedia(e).matches),
          (l[2] = e),
          (l[3] = o))
        : (o = l[3]);
      let d = o;
      l[4] !== u ? ((s = () => u), (l[4] = u), (l[5] = s)) : (s = l[5]);
      let f = s;
      return (0, i.useSyncExternalStore)(c, d, f);
    },
  ]);
};
