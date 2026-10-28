// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(352386);
  let i = (0, r.createContext)(void 0);
  e.s([
    "l",
    0,
    (e) => {
      let l,
        a,
        s,
        o,
        u = (0, n.c)(7),
        { children: c } = e,
        [d, m] = (0, r.useState)(null);
      u[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (e, t, n) => {
            let r = { mint: e, impression: t, searchTerm: n };
            (m(r),
              localStorage.setItem("lastClickImpression", JSON.stringify(r)));
          }),
          (u[0] = l))
        : (l = u[0]);
      let f = l;
      u[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((a = (e) => {
            let { mint: t, calloutId: n, wallet: r } = e;
            m((e) =>
              e?.mint === t && e.impression.calloutId === n
                ? {
                    ...e,
                    impression: { ...e.impression, calloutAuthorWallet: r },
                  }
                : e,
            );
          }),
          (u[1] = a))
        : (a = u[1]);
      let g = a;
      u[2] !== d
        ? ((s = {
            lastClickImpression: d,
            setLastClickImpression: f,
            attachCalloutAuthorWallet: g,
          }),
          (u[2] = d),
          (u[3] = s))
        : (s = u[3]);
      let p = s;
      return (
        u[4] !== c || u[5] !== p
          ? ((o = (0, t.jsx)(i.Provider, { value: p, children: c })),
            (u[4] = c),
            (u[5] = p),
            (u[6] = o))
          : (o = u[6]),
        o
      );
    },
    "y",
    0,
    () => {
      let e = (0, r.useContext)(i);
      if (!e)
        throw Error(
          "useLastClickImpression must be used within a LastClickImpressionProvider",
        );
      return e;
    },
    "b",
    0,
    () => {
      let e = (0, r.useContext)(i);
      return e?.lastClickImpression ?? null;
    },
    "G",
    0,
    () => (0, r.useContext)(i)?.setLastClickImpression ?? null,
  ]);
};
