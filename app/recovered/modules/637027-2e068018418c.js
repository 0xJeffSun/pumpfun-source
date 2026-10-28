// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    o = e.i(352386);
  let n = (0, o.createContext)({ isDevelopment: !1 });
  e.s([
    "ExperimentsConfigProvider",
    0,
    (e) => {
      let o,
        a,
        i = (0, r.c)(5),
        { isDevelopment: s, children: l } = e;
      return (
        i[0] !== s
          ? ((o = { isDevelopment: s }), (i[0] = s), (i[1] = o))
          : (o = i[1]),
        i[2] !== l || i[3] !== o
          ? ((a = (0, t.jsx)(n.Provider, { value: o, children: l })),
            (i[2] = l),
            (i[3] = o),
            (i[4] = a))
          : (a = i[4]),
        a
      );
    },
    "useExperimentsConfig",
    0,
    () => (0, o.useContext)(n),
  ]);
};
