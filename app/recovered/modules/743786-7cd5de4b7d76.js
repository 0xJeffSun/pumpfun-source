// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(231332);
  let a = [];
  e.s([
    "_",
    0,
    (e) => {
      let t = !1,
        i = () => {
          t || ((t = !0), e());
        };
      return (
        (a = [...a, i]),
        () => {
          a.includes(i) && ((a = a.filter((e) => e !== i)), i());
        }
      );
    },
    "S",
    0,
    (e) => {
      let i,
        l = ((i = a), (a = []), i),
        r = () => {
          try {
            e();
          } finally {
            for (let e of l) e();
          }
        };
      !("u" < typeof document) &&
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? document.startViewTransition(() => {
            (0, t.flushSync)(r);
          })
        : r();
    },
  ]);
};
