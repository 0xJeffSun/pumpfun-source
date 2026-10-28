// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(352386),
    u = e.i(463276);
  let l = (0, n.createContext)(null);
  e.s([
    "W",
    0,
    function (e) {
      let n,
        i,
        s = (0, r.c)(5),
        { coin: o, children: a } = e;
      s[0] !== o ? ((n = { coin: o }), (s[0] = o), (s[1] = n)) : (n = s[1]);
      let c = (0, u.f)(n);
      return (
        s[2] !== a || s[3] !== c
          ? ((i = (0, t.jsx)(l.Provider, { value: c, children: a })),
            (s[2] = a),
            (s[3] = c),
            (s[4] = i))
          : (i = s[4]),
        i
      );
    },
    "E",
    0,
    () => (0, n.useContext)(l),
  ]);
};
