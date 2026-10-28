// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(352386),
    i = e.i(362324),
    r = e.i(170450),
    s = e.i(518664),
    a = e.i(653805);
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
      let i,
        s,
        a = (0, t.c)(3),
        n = (0, r.f)(),
        [o, d] = (0, l.useState)(null);
      return (
        a[0] !== e
          ? ((i = () => {
              d({ mint: e, at: Date.now() });
            }),
            (s = [e]),
            (a[0] = e),
            (a[1] = i),
            (a[2] = s))
          : ((i = a[1]), (s = a[2])),
        (0, l.useEffect)(i, s),
        n && o?.mint === e ? o.at : null
      );
    },
    c = (e, t) => null !== t && void 0 !== e && e.lastUpdated >= t - 15e3;
  e.s([
    "F",
    0,
    (e) => {
      let l,
        i = (0, t.c)(3),
        r = (0, a.F)(e),
        s = d(e);
      return (
        i[0] !== s || i[1] !== r
          ? ((l = c(r, s) ? r : void 0), (i[0] = s), (i[1] = r), (i[2] = l))
          : (l = i[2]),
        l
      );
    },
    "P",
    0,
    (e) => {
      let l,
        r = (0, t.c)(3),
        s = d(e);
      return (
        r[0] !== e || r[1] !== s
          ? ((l = (t) => n(t.coins[e], s)), (r[0] = e), (r[1] = s), (r[2] = l))
          : (l = r[2]),
        (0, a.x)((0, i.f)(l))
      );
    },
    "n",
    0,
    (e) => {
      let t = d(e),
        i = (0, l.useCallback)((l) => n(l.coins[e], t), [e, t]);
      return (0, s.f)(a.x, i, { isEqual: o });
    },
  ]);
};
