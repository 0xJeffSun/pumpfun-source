// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(352386);
  let l = (0, i.createContext)(() => {});
  e.s([
    "g",
    0,
    function (e) {
      let r,
        n,
        o,
        s = (0, a.c)(6),
        { children: d } = e,
        [c, u] = (0, i.useState)("");
      s[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (e) => {
            u((t) => (t === e ? `${e}\xa0` : e));
          }),
          (s[0] = r))
        : (r = s[0]);
      let m = r;
      return (
        s[1] !== c
          ? ((n = (0, t.jsx)("div", {
              "aria-live": "polite",
              role: "status",
              className: "sr-only",
              "data-testid": "screeners-live-region",
              children: c,
            })),
            (s[1] = c),
            (s[2] = n))
          : (n = s[2]),
        s[3] !== d || s[4] !== n
          ? ((o = (0, t.jsxs)(l.Provider, { value: m, children: [d, n] })),
            (s[3] = d),
            (s[4] = n),
            (s[5] = o))
          : (o = s[5]),
        o
      );
    },
    "G",
    0,
    () => (0, i.use)(l),
  ]);
};
