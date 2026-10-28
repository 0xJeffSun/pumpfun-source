// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(352386),
    r = e.i(362324),
    i = e.i(170450),
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
      let r,
        a,
        s = (0, t.c)(3),
        n = (0, i.f)(),
        [o, d] = (0, l.useState)(null);
      return (
        s[0] !== e
          ? ((r = () => {
              d({ mint: e, at: Date.now() });
            }),
            (a = [e]),
            (s[0] = e),
            (s[1] = r),
            (s[2] = a))
          : ((r = s[1]), (a = s[2])),
        (0, l.useEffect)(r, a),
        n && o?.mint === e ? o.at : null
      );
    },
    c = (e, t) => null !== t && void 0 !== e && e.lastUpdated >= t - 15e3;
  e.s([
    "F",
    0,
    (e) => {
      let l,
        r = (0, t.c)(3),
        i = (0, s.F)(e),
        a = d(e);
      return (
        r[0] !== a || r[1] !== i
          ? ((l = c(i, a) ? i : void 0), (r[0] = a), (r[1] = i), (r[2] = l))
          : (l = r[2]),
        l
      );
    },
    "P",
    0,
    (e) => {
      let l,
        i = (0, t.c)(3),
        a = d(e);
      return (
        i[0] !== e || i[1] !== a
          ? ((l = (t) => n(t.coins[e], a)), (i[0] = e), (i[1] = a), (i[2] = l))
          : (l = i[2]),
        (0, s.x)((0, r.f)(l))
      );
    },
    "n",
    0,
    (e) => {
      let t = d(e),
        r = (0, l.useCallback)((l) => n(l.coins[e], t), [e, t]);
      return (0, a.f)(s.x, r, { isEqual: o });
    },
  ]);
};
