// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386),
    r = e.i(362324),
    l = e.i(170450),
    a = e.i(518664),
    n = e.i(653805);
  let s = (e, t) => {
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
      let r,
        a,
        n = (0, t.c)(3),
        s = (0, l.f)(),
        [o, d] = (0, i.useState)(null);
      return (
        n[0] !== e
          ? ((r = () => {
              d({ mint: e, at: Date.now() });
            }),
            (a = [e]),
            (n[0] = e),
            (n[1] = r),
            (n[2] = a))
          : ((r = n[1]), (a = n[2])),
        (0, i.useEffect)(r, a),
        s && o?.mint === e ? o.at : null
      );
    },
    c = (e, t) => null !== t && void 0 !== e && e.lastUpdated >= t - 15e3;
  e.s([
    "F",
    0,
    (e) => {
      let i,
        r = (0, t.c)(3),
        l = (0, n.F)(e),
        a = d(e);
      return (
        r[0] !== a || r[1] !== l
          ? ((i = c(l, a) ? l : void 0), (r[0] = a), (r[1] = l), (r[2] = i))
          : (i = r[2]),
        i
      );
    },
    "P",
    0,
    (e) => {
      let i,
        l = (0, t.c)(3),
        a = d(e);
      return (
        l[0] !== e || l[1] !== a
          ? ((i = (t) => s(t.coins[e], a)), (l[0] = e), (l[1] = a), (l[2] = i))
          : (i = l[2]),
        (0, n.x)((0, r.f)(i))
      );
    },
    "n",
    0,
    (e) => {
      let t = d(e),
        r = (0, i.useCallback)((i) => s(i.coins[e], t), [e, t]);
      return (0, a.f)(n.x, r, { isEqual: o });
    },
  ]);
};
