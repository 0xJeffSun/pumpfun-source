// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(352386);
  let i = (0, r.createContext)(null);
  e.s([
    "HomeFeedSeedProvider",
    0,
    function (e) {
      let l,
        a = (0, n.c)(3),
        { promise: o, children: s } = e,
        u = (0, r.use)(o);
      return (
        a[0] !== s || a[1] !== u
          ? ((l = (0, t.jsx)(i.Provider, { value: u, children: s })),
            (a[0] = s),
            (a[1] = u),
            (a[2] = l))
          : (l = a[2]),
        l
      );
    },
    "useHomeFeedSeed",
    0,
    () => (0, r.useContext)(i),
  ]);
};
