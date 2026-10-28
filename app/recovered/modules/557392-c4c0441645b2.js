// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386),
    l = e.i(362324),
    r = e.i(170450),
    a = e.i(518664),
    s = e.i(653805);
  let n = (e, t) => {
      if (c(e, t))
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
      let l,
        a,
        s = (0, t.c)(3),
        n = (0, r.f)(),
        [o, d] = (0, i.useState)(null);
      return (
        s[0] !== e
          ? ((l = () => {
              d({ mint: e, at: Date.now() });
            }),
            (a = [e]),
            (s[0] = e),
            (s[1] = l),
            (s[2] = a))
          : ((l = s[1]), (a = s[2])),
        (0, i.useEffect)(l, a),
        n && o?.mint === e ? o.at : null
      );
    },
    c = (e, t) => null !== t && void 0 !== e && e.lastUpdated >= t - 15e3;
  e.s([
    "F",
    0,
    (e) => {
      let i,
        l = (0, t.c)(3),
        r = (0, s.F)(e),
        a = d(e);
      return (
        l[0] !== a || l[1] !== r
          ? ((i = c(r, a) ? r : void 0), (l[0] = a), (l[1] = r), (l[2] = i))
          : (i = l[2]),
        i
      );
    },
    "P",
    0,
    (e) => {
      let i,
        r = (0, t.c)(3),
        a = d(e);
      return (
        r[0] !== e || r[1] !== a
          ? ((i = (t) => n(t.coins[e], a)), (r[0] = e), (r[1] = a), (r[2] = i))
          : (i = r[2]),
        (0, s.x)((0, l.f)(i))
      );
    },
    "n",
    0,
    (e) => {
      let t = d(e),
        l = (0, i.useCallback)((i) => n(i.coins[e], t), [e, t]);
      return (0, a.f)(s.x, l, { isEqual: o });
    },
  ]);
};
