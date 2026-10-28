// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(352386),
    i = e.i(536141);
  let l = (0, n.createContext)(null);
  e.s([
    "w",
    0,
    l,
    "G",
    0,
    (e) => {
      let n,
        a,
        s = (0, r.c)(5),
        { config: o, children: u } = e;
      s[0] !== o ? ((n = i.f.parse(o)), (s[0] = o), (s[1] = n)) : (n = s[1]);
      let d = n;
      return (
        s[2] !== u || s[3] !== d
          ? ((a = (0, t.jsx)(l.Provider, { value: d, children: u })),
            (s[2] = u),
            (s[3] = d),
            (s[4] = a))
          : (a = s[4]),
        a
      );
    },
    "a",
    0,
    () => {
      let e = (0, n.useContext)(l);
      if (!e)
        throw Error(
          "useLivestreamConfig must be used within a LivestreamConfigProvider. Make sure to wrap your component tree with LivestreamProvider and pass the config prop.",
        );
      return e;
    },
  ]);
};
