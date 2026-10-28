// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(352386);
  e.s([
    "f",
    0,
    (e, { beforePaint: a = !1 } = {}) => {
      let [i, l] = (0, t.useState)(0);
      return (
        (a ? t.useLayoutEffect : t.useEffect)(() => {
          let t = e.current;
          if (!t) return;
          let i = () => {
            let e = t.getBoundingClientRect().width;
            l((t) => (t === e ? t : e));
          };
          if ((a && i(), "u" < typeof ResizeObserver)) {
            let e = requestAnimationFrame(i);
            return () => cancelAnimationFrame(e);
          }
          let s = new ResizeObserver(i);
          return (s.observe(t), () => s.disconnect());
        }, [e, a]),
        i
      );
    },
  ]);
};
