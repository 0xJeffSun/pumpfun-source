// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  (e.s(
    [
      "f",
      0,
      (e, i) => {
        let n,
          o,
          l = (0, t.c)(6),
          [a, s] = (0, r.useState)(!1),
          c = i?.root,
          u = i?.rootMargin,
          d = i?.threshold;
        return (
          l[0] !== e || l[1] !== c || l[2] !== u || l[3] !== d
            ? ((n = () => {
                if (!e.current) return;
                let t = new IntersectionObserver(
                    (e) => {
                      let [t] = e;
                      s(t.isIntersecting);
                    },
                    { root: c, rootMargin: u, threshold: d },
                  ),
                  r = e.current;
                return (
                  r && t.observe(r),
                  () => {
                    r && t.unobserve(r);
                  }
                );
              }),
              (o = [e, c, u, d]),
              (l[0] = e),
              (l[1] = c),
              (l[2] = u),
              (l[3] = d),
              (l[4] = n),
              (l[5] = o))
            : ((n = l[4]), (o = l[5])),
          (0, r.useEffect)(n, o),
          a
        );
      },
    ],
    374930,
  ),
    e.s(
      [
        "f",
        0,
        () => {
          let e,
            i,
            n,
            o = (0, t.c)(3),
            l = (0, r.useRef)(!1);
          return (
            o[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = () => {
                  let e = () => {
                      l.current = !0;
                    },
                    t = ["click", "keydown", "touchend", "pointerup"];
                  return (
                    t.forEach((t) => document.addEventListener(t, e)),
                    () => {
                      t.forEach((t) => document.removeEventListener(t, e));
                    }
                  );
                }),
                (i = []),
                (o[0] = e),
                (o[1] = i))
              : ((e = o[0]), (i = o[1])),
            (0, r.useEffect)(e, i),
            o[2] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = {
                  hasGestureRef: l,
                  resetGesture: () => {
                    l.current = !1;
                  },
                }),
                (o[2] = n))
              : (n = o[2]),
            n
          );
        },
      ],
      861701,
    ));
};
