// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    o = e.i(352386);
  let n = (0, o.createContext)(null),
    a = () => {
      let e = null,
        t = null,
        r = new Set();
      return {
        getSnapshot: () => e,
        subscribe: (e) => (
          r.add(e),
          () => {
            r.delete(e);
          }
        ),
        resolve: (o) => {
          o === t ||
            ((t = o),
            o &&
              Promise.resolve(o).then(
                (n) => {
                  if (o === t) for (let t of ((e = n), r)) t();
                },
                () => {},
              ));
        },
      };
    },
    i = (0, o.createContext)(a()),
    s = () => null;
  e.s([
    "ServerFlagsProvider",
    0,
    (e) => {
      let s,
        l,
        d,
        u,
        c = (0, r.c)(10),
        { promise: w, children: b } = e,
        h = void 0 === w ? null : w,
        [p] = (0, o.useState)(a);
      return (
        c[0] !== h || c[1] !== p
          ? ((s = () => {
              p.resolve(h);
            }),
            (l = [p, h]),
            (c[0] = h),
            (c[1] = p),
            (c[2] = s),
            (c[3] = l))
          : ((s = c[2]), (l = c[3])),
        (0, o.useEffect)(s, l),
        c[4] !== b || c[5] !== p
          ? ((d = (0, t.jsx)(i.Provider, { value: p, children: b })),
            (c[4] = b),
            (c[5] = p),
            (c[6] = d))
          : (d = c[6]),
        c[7] !== h || c[8] !== d
          ? ((u = (0, t.jsx)(n.Provider, { value: h, children: d })),
            (c[7] = h),
            (c[8] = d),
            (c[9] = u))
          : (u = c[9]),
        u
      );
    },
    "useServerFlags",
    0,
    () => {
      let e = (0, o.use)(i);
      return (0, o.useSyncExternalStore)(e.subscribe, e.getSnapshot, s);
    },
    "useServerFlagsPromise",
    0,
    () => (0, o.use)(n),
  ]);
};
