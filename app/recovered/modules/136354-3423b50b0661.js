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
        o,
        s = (0, n.c)(5),
        { children: a, clientServerUrl: l } = e;
      return (
        s[0] !== l
          ? ((r = { clientServerUrl: l }), (s[0] = l), (s[1] = r))
          : (r = s[1]),
        s[2] !== a || s[3] !== r
          ? ((o = (0, t.jsx)(i.Provider, { value: r, children: a })),
            (s[2] = a),
            (s[3] = r),
            (s[4] = o))
          : (o = s[4]),
        o
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
