// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(352386);
  let i = (0, r.createContext)(null);
  e.s([
    "UserConfigProvider",
    0,
    (e) => {
      let r,
        a,
        o = (0, n.c)(5),
        { children: s, clientServerUrl: l } = e;
      return (
        o[0] !== l
          ? ((r = { clientServerUrl: l }), (o[0] = l), (o[1] = r))
          : (r = o[1]),
        o[2] !== s || o[3] !== r
          ? ((a = (0, t.jsx)(i.Provider, { value: r, children: s })),
            (o[2] = s),
            (o[3] = r),
            (o[4] = a))
          : (a = o[4]),
        a
      );
    },
    "useUserConfig",
    0,
    () => {
      let e = (0, r.useContext)(i);
      if (!e)
        throw Error("useUserConfig must be used within a UserConfigProvider");
      return e;
    },
  ]);
};
