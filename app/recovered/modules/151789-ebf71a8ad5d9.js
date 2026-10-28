// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(352386);
  let a = (0, l.createContext)(null);
  e.s([
    "HomeLayoutServerProvider",
    0,
    function (e) {
      let l,
        n = (0, r.c)(3),
        { value: i, children: s } = e;
      return (
        n[0] !== s || n[1] !== i
          ? ((l = (0, t.jsx)(a.Provider, { value: i, children: s })),
            (n[0] = s),
            (n[1] = i),
            (n[2] = l))
          : (l = n[2]),
        l
      );
    },
    "useServerResolvedHomeLayout",
    0,
    () => (0, l.use)(a),
  ]);
};
