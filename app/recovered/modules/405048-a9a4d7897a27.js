// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(352386),
    i = e.i(54567);
  let a = (0, n.createContext)(void 0);
  e.s([
    "V",
    0,
    (e) => {
      let n,
        l,
        s = (0, r.c)(6),
        { children: o, property: c, playerName: u } = e;
      (i.logger.debug(
        "[LivestreamAnalyticsProvider] Recalculating LivestreamAnalyticsContext value.",
        { property: c, playerName: u },
      ),
        s[0] !== u || s[1] !== c
          ? ((n = { property: c, playerName: u }),
            (s[0] = u),
            (s[1] = c),
            (s[2] = n))
          : (n = s[2]));
      let d = n;
      return (
        s[3] !== o || s[4] !== d
          ? ((l = (0, t.jsx)(a.Provider, { value: d, children: o })),
            (s[3] = o),
            (s[4] = d),
            (s[5] = l))
          : (l = s[5]),
        l
      );
    },
    "S",
    0,
    function () {
      let e = (0, n.useContext)(a);
      if (void 0 === e)
        throw Error(
          "useLivestreamAnalyticsContext must be used within a LivestreamAnalyticsProvider",
        );
      return e;
    },
  ]);
};
