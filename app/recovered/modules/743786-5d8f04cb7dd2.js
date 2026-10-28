// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(231332);
  let r = [];
  e.s([
    "_",
    0,
    (e) => {
      let t = !1,
        a = () => {
          t || ((t = !0), e());
        };
      return (
        (r = [...r, a]),
        () => {
          r.includes(a) && ((r = r.filter((e) => e !== a)), a());
        }
      );
    },
    "S",
    0,
    (e) => {
      let a,
        i = ((a = r), (r = []), a),
        n = () => {
          try {
            e();
          } finally {
            for (let e of i) e();
          }
        };
      !("u" < typeof document) &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? document.startViewTransition(() => {
            (0, t.flushSync)(n);
          })
        : n();
    },
  ]);
};
