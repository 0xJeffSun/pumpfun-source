// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(322315),
    r = e.i(254010),
    a = e.i(574472),
    s = e.i(352386),
    l = e.i(975982),
    o = e.i(690877),
    c = e.i(520669);
  let d = (e) => {
    let t,
      a,
      s,
      l = (0, n.c)(11),
      { user: d, period: u, enabled: m } = e,
      f = (0, r.k)(i.D.PORTFOLIO_LIVE_REPRICE);
    (l[0] !== u || l[1] !== d
      ? ((t = c.g.wallet(d, u)), (l[0] = u), (l[1] = d), (l[2] = t))
      : (t = l[2]),
      l[3] !== u || l[4] !== d || l[5] !== f
        ? ((a = () =>
            (0, c.v)(
              f ? { user: d, period: u, holdings: !0 } : { user: d, period: u },
            )),
          (l[3] = u),
          (l[4] = d),
          (l[5] = f),
          (l[6] = a))
        : (a = l[6]));
    let p = (void 0 === m || m) && !!d;
    return (
      l[7] !== t || l[8] !== a || l[9] !== p
        ? ((s = {
            queryKey: t,
            queryFn: a,
            enabled: p,
            staleTime: 3e4,
            refetchInterval: 3e4,
            retry: !1,
          }),
          (l[7] = t),
          (l[8] = a),
          (l[9] = p),
          (l[10] = s))
        : (s = l[10]),
      (0, o.useQuery)(s)
    );
  };
  e.s(["f", 0, d], 425048);
  var u = e.i(363250),
    m = e.i(48485);
  let f = new Set(["mark_skew", "price_missing", "no_pnl_row"]),
    p = (e, t) => {
      let n = e / t;
      return Number.isFinite(n) && n >= 0.01 && n <= 100;
    },
    h = (e, t, n) => {
      let i = e.marketCapUsd;
      if (
        !t ||
        null === i ||
        !(i > 0) ||
        !(e.priceUsd > 0) ||
        (null !== n.servedAtMs
          ? void 0 === t.eventAt || !(t.eventAt >= n.servedAtMs)
          : !(t.receivedAt >= n.receivedAtMs))
      )
        return null;
      let r = null;
      return (void 0 !== t.priceUsd && t.priceUsd > 0
        ? (r = t.priceUsd)
        : void 0 !== t.marketCapUsd &&
          t.marketCapUsd > 0 &&
          (r = (e.priceUsd * t.marketCapUsd) / i),
      null !== r && p(r, e.priceUsd))
        ? r
        : null;
    },
    g = (e, t) => {
      if (null === t) return !0;
      let n = e.markUsd;
      return !!("number" == typeof n && Number.isFinite(n)) && !t.has(e.mint);
    };
  var y = e.i(653805);
  let x = [];
  function v(e) {
    return e.mint;
  }
  function b(e, t, a) {
    let o,
      c,
      b,
      _ = (0, n.c)(22),
      w = (0, r.k)(i.D.PORTFOLIO_LIVE_REPRICE);
    _[0] !== w || _[1] !== t || _[2] !== e
      ? ((o = { user: e, period: t, enabled: w }),
        (_[0] = w),
        (_[1] = t),
        (_[2] = e),
        (_[3] = o))
      : (o = _[3]);
    let I = d(o),
      j = w ? I.data : void 0,
      E = j?.holdings,
      k = void 0 !== j && Array.isArray(E),
      N = (function (e, t) {
        let i,
          r = (0, n.c)(3);
        r[0] !== e || r[1] !== t
          ? ((i = { data: e, at: t }), (r[0] = e), (r[1] = t), (r[2] = i))
          : (i = r[2]);
        let [a, l] = (0, s.useState)(i);
        return a.data !== e ? (l({ data: e, at: t }), t) : a.at;
      })(j, I.dataUpdatedAt),
      { ticks: S, liveSol: C } = (function (e, t, i) {
        let r,
          a,
          s,
          o,
          c,
          d,
          f,
          p = (0, n.c)(20),
          h = void 0 === i ? 25 : i;
        if (p[0] !== e || p[1] !== h) {
          let t;
          ((r =
            (t = (e ?? []).filter(
              (e) =>
                (0, l.k)(e.mint) &&
                null !== e.marketCapUsd &&
                e.marketCapUsd > 0,
            )).length <= h
              ? t
              : t.sort((e, t) => t.valueUsd - e.valueUsd).slice(0, h)),
            (p[0] = e),
            (p[1] = h),
            (p[2] = r));
        } else r = p[2];
        let g = r;
        p[3] !== t || p[4] !== g
          ? ((a = t ? g.map(v).join(",") : ""),
            (p[3] = t),
            (p[4] = g),
            (p[5] = a))
          : (a = p[5]);
        let b = a;
        p[6] !== b
          ? ((s = "" === b ? x : b.split(",")), (p[6] = b), (p[7] = s))
          : (s = p[7]);
        let _ = s;
        (0, m.f)(g, t && g.length > 0);
        let w = (0, y.k)(_);
        p[8] !== t
          ? ((o = { queryOptions: { enabled: t } }), (p[8] = t), (p[9] = o))
          : (o = p[9]);
        let I = (0, u.f)(o);
        p[10] !== _ || p[11] !== w
          ? ((c = new Map()),
            _.forEach((e, t) => {
              let n = w[t];
              if (!n?.isLiveData) return;
              let i =
                  void 0 !== n.priceUsd && n.priceUsd > 0 ? n.priceUsd : void 0,
                r = n.usdMarketCap > 0 ? n.usdMarketCap : void 0;
              if (void 0 === i && void 0 === r) return;
              let a =
                "number" == typeof n.lastTradeTimestamp &&
                Number.isFinite(n.lastTradeTimestamp)
                  ? n.lastTradeTimestamp
                  : void 0;
              c.set(e, {
                eventAt: a,
                receivedAt: n.lastUpdated,
                priceUsd: i,
                marketCapUsd: r,
              });
            }),
            (p[10] = _),
            (p[11] = w),
            (p[12] = c))
          : (c = p[12]);
        let j = c,
          E = I.data;
        p[13] !== t || p[14] !== I.dataUpdatedAt || p[15] !== E
          ? ((d =
              t && "number" == typeof E && E > 0
                ? { priceUsd: E, at: I.dataUpdatedAt }
                : null),
            (p[13] = t),
            (p[14] = I.dataUpdatedAt),
            (p[15] = E),
            (p[16] = d))
          : (d = p[16]);
        let k = d;
        return (
          p[17] !== k || p[18] !== j
            ? ((f = { ticks: j, liveSol: k }),
              (p[17] = k),
              (p[18] = j),
              (p[19] = f))
            : (f = p[19]),
          f
        );
      })(E, k, void 0 === a ? 25 : a);
    if (!k || void 0 === j || !E) return null;
    let U = j.reprice ?? null,
      R = j.nativeBalanceSol ?? null,
      P = j.solPriceUsd ?? null,
      L = U?.asOf ?? j.computedAt ?? null;
    _[4] !== j.percentage.usd ||
    _[5] !== j.pnl.usd ||
    _[6] !== j.totalValueUsd ||
    _[7] !== j.unrealizedPnl.usd ||
    _[8] !== E ||
    _[9] !== C ||
    _[10] !== N ||
    _[11] !== U ||
    _[12] !== R ||
    _[13] !== P ||
    _[14] !== L ||
    _[15] !== S
      ? ((c = ((e) => {
          let t = ((e) => {
              if (!e) return null;
              let t = new Set();
              for (let n of e.unrepriced) f.has(n.reason) && t.add(n.mint);
              return t;
            })(e.reprice),
            n = 0,
            i = 0;
          for (let r of e.holdings) {
            let a = h(r, e.ticks.get(r.mint), e);
            if (null === a) continue;
            let s = r.amount * (a - r.priceUsd);
            Number.isFinite(s) && ((n += s), g(r, t) && (i += s));
          }
          let r =
              n +
              (({
                nativeBalanceSol: e,
                solPriceUsd: t,
                liveSol: n,
                receivedAtMs: i,
              }) =>
                null !== e &&
                null !== t &&
                t > 0 &&
                null !== n &&
                !(n.at < i) &&
                p(n.priceUsd, t)
                  ? e * (n.priceUsd - t)
                  : 0)(e),
            a = e.pnl ?? null,
            s = e.percentage ?? null,
            l = e.unrealizedPnl ?? null,
            o = null === a ? null : a + i,
            c =
              null !== s && null !== a && null !== o && 0 !== a && 0 !== o
                ? (s * o) / a
                : s;
          return {
            totalValueUsd:
              null === e.totalValueUsd ? null : e.totalValueUsd + r,
            pnl: o,
            unrealizedPnl: null === l ? null : l + i,
            percentage: c,
            totalDeltaUsd: r,
            pnlDeltaUsd: i,
          };
        })({
          totalValueUsd: j.totalValueUsd,
          pnl: j.pnl.usd,
          unrealizedPnl: j.unrealizedPnl.usd,
          percentage: j.percentage.usd,
          holdings: E,
          nativeBalanceSol: R,
          solPriceUsd: P,
          servedAtMs: L,
          receivedAtMs: N,
          reprice: U,
          ticks: S,
          liveSol: C,
        })),
        (_[4] = j.percentage.usd),
        (_[5] = j.pnl.usd),
        (_[6] = j.totalValueUsd),
        (_[7] = j.unrealizedPnl.usd),
        (_[8] = E),
        (_[9] = C),
        (_[10] = N),
        (_[11] = U),
        (_[12] = R),
        (_[13] = P),
        (_[14] = L),
        (_[15] = S),
        (_[16] = c))
      : (c = _[16]);
    let A = c;
    return (
      _[17] !== A.percentage ||
      _[18] !== A.pnl ||
      _[19] !== A.totalValueUsd ||
      _[20] !== A.unrealizedPnl
        ? ((b = {
            totalValueUsd: A.totalValueUsd,
            pnl: A.pnl,
            unrealizedPnl: A.unrealizedPnl,
            percentage: A.percentage,
          }),
          (_[17] = A.percentage),
          (_[18] = A.pnl),
          (_[19] = A.totalValueUsd),
          (_[20] = A.unrealizedPnl),
          (_[21] = b))
        : (b = _[21]),
      b
    );
  }
  e.s(["K", 0, 25, "Z", 0, b], 510398);
  let _ = (0, s.createContext)(void 0);
  function w(e) {
    return e + 1;
  }
  function I(e) {
    return e - 1;
  }
  e.s(
    [
      "t",
      0,
      (e) => {
        let l,
          o,
          c,
          d = (0, n.c)(6),
          { children: u } = e,
          { address: m } = (0, a.F)(),
          f = (0, r.k)(i.D.PORTFOLIO_LIVE_REPRICE),
          [p, h] = (0, s.useState)(0),
          g = b(f && m ? m : void 0, "1d", p > 0 ? 25 : 8),
          y = g?.totalValueUsd ?? null;
        d[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = () => {
              h(w);
              let e = !1;
              return () => {
                e || ((e = !0), h(I));
              };
            }),
            (d[0] = l))
          : (l = d[0]);
        let x = l;
        d[1] !== y
          ? ((o = { totalValueUsd: y, claimFullDepth: x }),
            (d[1] = y),
            (d[2] = o))
          : (o = d[2]);
        let v = o;
        return (
          d[3] !== u || d[4] !== v
            ? ((c = (0, t.jsx)(_.Provider, { value: v, children: u })),
              (d[3] = u),
              (d[4] = v),
              (d[5] = c))
            : (c = d[5]),
          c
        );
      },
      "f",
      0,
      (e) => {
        let t,
          i,
          r,
          a = (0, n.c)(6),
          l = (0, s.useContext)(_),
          o = l?.claimFullDepth,
          c = e?.depth === 25;
        (a[0] !== o || a[1] !== c
          ? ((t = () => {
              if (c && o) return o();
            }),
            (i = [c, o]),
            (a[0] = o),
            (a[1] = c),
            (a[2] = t),
            (a[3] = i))
          : ((t = a[2]), (i = a[3])),
          (0, s.useEffect)(t, i));
        let d = l?.totalValueUsd ?? null;
        return (
          a[4] !== d
            ? ((r = { totalValueUsd: d }), (a[4] = d), (a[5] = r))
            : (r = a[5]),
          r
        );
      },
    ],
    493870,
  );
};
