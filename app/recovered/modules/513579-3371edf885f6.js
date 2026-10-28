// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386);
  let i = (0, a.createContext)(() => {});
  e.s([
    "g",
    0,
    function (e) {
      let n,
        l,
        s,
        o = (0, r.c)(6),
        { children: d } = e,
        [u, c] = (0, a.useState)("");
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (e) => {
            c((t) => (t === e ? `${e}\xa0` : e));
          }),
          (o[0] = n))
        : (n = o[0]);
      let m = n;
      return (
        o[1] !== u
          ? ((l = (0, t.jsx)("div", {
              "aria-live": "polite",
              role: "status",
              className: "sr-only",
              "data-testid": "screeners-live-region",
              children: u,
            })),
            (o[1] = u),
            (o[2] = l))
          : (l = o[2]),
        o[3] !== d || o[4] !== l
          ? ((s = (0, t.jsxs)(i.Provider, { value: m, children: [d, l] })),
            (o[3] = d),
            (o[4] = l),
            (o[5] = s))
          : (s = o[5]),
        s
      );
    },
    "G",
    0,
    () => (0, a.use)(i),
  ]);
};
