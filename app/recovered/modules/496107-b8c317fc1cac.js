// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(352386),
    i = e.i(256272);
  let a = (0, n.createContext)("card"),
    l = () => (0, n.use)(a);
  e.s([
    "CoinPageCardSurface",
    0,
    function (e) {
      let n,
        a = (0, r.c)(3),
        s = l();
      return (
        a[0] !== e.children || a[1] !== s
          ? ((n = (0, t.jsx)(i.F, { surface: s, children: e.children })),
            (a[0] = e.children),
            (a[1] = s),
            (a[2] = n))
          : (n = a[2]),
        n
      );
    },
    "CoinPageSurfaceProvider",
    0,
    function (e) {
      let n,
        i = (0, r.c)(3),
        { surface: l, children: s } = e;
      return (
        i[0] !== s || i[1] !== l
          ? ((n = (0, t.jsx)(a.Provider, { value: l, children: s })),
            (i[0] = s),
            (i[1] = l),
            (i[2] = n))
          : (n = i[2]),
        n
      );
    },
    "useCoinPageSurface",
    0,
    l,
  ]);
};
