// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(305288);
  e.s(["f", () => n.f], 198584);
  var t = e.i(732486),
    a = e.i(445242),
    r = e.i(352386);
  let i = (0, r.createContext)({ width: 0, height: 0 });
  e.s(
    [
      "f",
      0,
      (e) => {
        let n,
          o,
          s,
          l,
          c,
          u = (0, a.c)(11);
        u[0] !== e
          ? (({ children: n, className: o, ...s } = e),
            (u[0] = e),
            (u[1] = n),
            (u[2] = o),
            (u[3] = s))
          : ((n = u[1]), (o = u[2]), (s = u[3]));
        let d = (0, r.useRef)(null),
          m = ((e) => {
            let n,
              t,
              i,
              o = (0, a.c)(6),
              [s, l] = (0, r.useState)(0),
              [c, u] = (0, r.useState)(0);
            return (
              o[0] !== e
                ? ((n = () => {
                    let n = e.current;
                    if (!n) {
                      (l(0), u(0));
                      return;
                    }
                    (l(n.offsetWidth), u(n.offsetHeight));
                    let t = new ResizeObserver((e) => {
                      e[0]?.contentRect &&
                        (l(e[0].contentRect.width), u(e[0].contentRect.height));
                    });
                    return (
                      t.observe(n),
                      () => {
                        (t.unobserve(n), t.disconnect());
                      }
                    );
                  }),
                  (t = [e]),
                  (o[0] = e),
                  (o[1] = n),
                  (o[2] = t))
                : ((n = o[1]), (t = o[2])),
              (0, r.useEffect)(n, t),
              o[3] !== c || o[4] !== s
                ? ((i = { width: s, height: c }),
                  (o[3] = c),
                  (o[4] = s),
                  (o[5] = i))
                : (i = o[5]),
              i
            );
          })(d);
        return (
          u[4] !== n || u[5] !== m
            ? ((l = (0, t.jsx)(i.Provider, { value: m, children: n })),
              (u[4] = n),
              (u[5] = m),
              (u[6] = l))
            : (l = u[6]),
          u[7] !== o || u[8] !== s || u[9] !== l
            ? ((c = (0, t.jsx)("div", {
                ref: d,
                className: o,
                ...s,
                children: l,
              })),
              (u[7] = o),
              (u[8] = s),
              (u[9] = l),
              (u[10] = c))
            : (c = u[10]),
          c
        );
      },
    ],
    167949,
  );
};
