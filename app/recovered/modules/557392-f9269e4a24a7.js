// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(352386),
    i = e.i(362324),
    r = e.i(170450),
    a = e.i(518664),
    s = e.i(653805);
  let n = (e, t) => {
      if (m(e, t))
        return {
          priceUsd: e.priceUsd,
          usdMarketCap: e.usdMarketCap,
          isLiveData: e.isLiveData,
          seedSupply: e.seedSupply,
          wireSupply: e.wireSupply,
        };
    },
    o = (e, t) =>
      e === t ||
      (void 0 !== e &&
        void 0 !== t &&
        e.priceUsd === t.priceUsd &&
        e.usdMarketCap === t.usdMarketCap &&
        e.isLiveData === t.isLiveData &&
        e.seedSupply === t.seedSupply &&
        e.wireSupply === t.wireSupply),
    d = (e) => {
      let i,
        a,
        s = (0, t.c)(3),
        n = (0, r.f)(),
        [o, d] = (0, l.useState)(null);
      return (
        s[0] !== e
          ? ((i = () => {
              d({ mint: e, at: Date.now() });
            }),
            (a = [e]),
            (s[0] = e),
            (s[1] = i),
            (s[2] = a))
          : ((i = s[1]), (a = s[2])),
        (0, l.useEffect)(i, a),
        n && o?.mint === e ? o.at : null
      );
    },
    m = (e, t) => null !== t && void 0 !== e && e.lastUpdated >= t - 15e3;
  e.s([
    "F",
    0,
    (e) => {
      let l,
        i = (0, t.c)(3),
        r = (0, s.F)(e),
        a = d(e);
      return (
        i[0] !== a || i[1] !== r
          ? ((l = m(r, a) ? r : void 0), (i[0] = a), (i[1] = r), (i[2] = l))
          : (l = i[2]),
        l
      );
    },
    "P",
    0,
    (e) => {
      let l,
        r = (0, t.c)(3),
        a = d(e);
      return (
        r[0] !== e || r[1] !== a
          ? ((l = (t) => n(t.coins[e], a)), (r[0] = e), (r[1] = a), (r[2] = l))
          : (l = r[2]),
        (0, s.x)((0, i.f)(l))
      );
    },
    "n",
    0,
    (e) => {
      let t = d(e),
        i = (0, l.useCallback)((l) => n(l.coins[e], t), [e, t]);
      return (0, a.f)(s.x, i, { isEqual: o });
    },
  ]);
};
