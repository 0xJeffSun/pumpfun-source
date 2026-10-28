// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(352386);
  let n = (0, a.createContext)(() => {});
  e.s([
    "g",
    0,
    function (e) {
      let r,
        s,
        l,
        o = (0, i.c)(6),
        { children: c } = e,
        [d, m] = (0, a.useState)("");
      o[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (e) => {
            m((t) => (t === e ? `${e}\xa0` : e));
          }),
          (o[0] = r))
        : (r = o[0]);
      let u = r;
      return (
        o[1] !== d
          ? ((s = (0, t.jsx)("div", {
              "aria-live": "polite",
              role: "status",
              className: "sr-only",
              "data-testid": "screeners-live-region",
              children: d,
            })),
            (o[1] = d),
            (o[2] = s))
          : (s = o[2]),
        o[3] !== c || o[4] !== s
          ? ((l = (0, t.jsxs)(n.Provider, { value: u, children: [c, s] })),
            (o[3] = c),
            (o[4] = s),
            (o[5] = l))
          : (l = o[5]),
        l
      );
    },
    "G",
    0,
    () => (0, a.use)(n),
  ]);
};
