// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    r = e.i(445242),
    l = e.i(599077),
    a = e.i(311282),
    n = e.i(352386),
    i = e.i(151789),
    s = e.i(986071),
    o = e.i(402732),
    c = e.i(810680);
  e.i(550675);
  var d = e.i(547562),
    u = (((t = {}).GRID = "grid"), (t.TABLE = "table"), t);
  let m = ["grid", "table"],
    f = (e) => (e === c.E.TABLE ? "table" : "grid"),
    h = f(c.x);
  (e.s(
    [
      "M",
      () => u,
      "e",
      0,
      function () {
        let e,
          t,
          u,
          p,
          x,
          b,
          g,
          v = (0, r.c)(18),
          y = (0, i.useServerResolvedHomeLayout)();
        v[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, a.b)(m)), (v[0] = e))
          : (e = v[0]);
        let [w, j] = (0, a.o)(s.f.HOME.LAYOUT, e),
          _ = (0, l.useSearchParams)()?.get(s.f.HOME.LAYOUT) ?? null,
          C = null !== _ && "" !== _,
          N = y ?? void 0;
        v[1] !== N
          ? ((t = { serverValue: N }), (v[1] = N), (v[2] = t))
          : (t = v[2]);
        let [k, S] = (0, d.l)("feed.homeLayout", t),
          M = (0, o.f)(),
          E = (0, n.useRef)(!1);
        (v[3] !== M || v[4] !== j || v[5] !== S
          ? ((u = () => {
              if (E.current) return;
              E.current = !0;
              let e = new URLSearchParams(window.location.search).get(
                s.f.HOME.LAYOUT,
              );
              if ("grid" === e || "table" === e) return void S(e);
              if (M || (null !== e && "" !== e)) return;
              let t = (0, d.L)("feed.homeLayout");
              t !== c.x && j(f(t), { history: "replace" });
            }),
            (p = [M, j, S]),
            (v[3] = M),
            (v[4] = j),
            (v[5] = S),
            (v[6] = u),
            (v[7] = p))
          : ((u = v[6]), (p = v[7])),
          (0, n.useLayoutEffect)(u, p),
          v[8] !== k || v[9] !== w || v[10] !== C
            ? ((x = C ? (w ?? h) : f(k)),
              (v[8] = k),
              (v[9] = w),
              (v[10] = C),
              (v[11] = x))
            : (x = v[11]));
        let T = x;
        v[12] !== j || v[13] !== S
          ? ((b = (e) => {
              let t = e ?? h;
              (S(t), j(t === h ? null : t));
            }),
            (v[12] = j),
            (v[13] = S),
            (v[14] = b))
          : (b = v[14]);
        let A = b;
        return (
          v[15] !== T || v[16] !== A
            ? ((g = { homeLayout: T, setHomeLayout: A }),
              (v[15] = T),
              (v[16] = A),
              (v[17] = g))
            : (g = v[17]),
          g
        );
      },
    ],
    211502,
  ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t,
            l,
            n = (0, r.c)(9),
            i = void 0 === e || e,
            s = (0, o.f)(),
            [c, u] = (0, d.l)("feed.showAnimations"),
            [m, f] = (0, a.o)("show_animations", a.Z),
            h = s ? (m ?? (c && i)) : (m ?? i);
          n[0] !== i || n[1] !== s || n[2] !== f || n[3] !== u || n[4] !== h
            ? ((t = (e) => {
                let t = "function" == typeof e ? e(h) : e;
                s ? (u(t), f(null)) : f(t === i ? null : t);
              }),
              (n[0] = i),
              (n[1] = s),
              (n[2] = f),
              (n[3] = u),
              (n[4] = h),
              (n[5] = t))
            : (t = n[5]);
          let p = t;
          return (
            n[6] !== p || n[7] !== h
              ? ((l = [h, p]), (n[6] = p), (n[7] = h), (n[8] = l))
              : (l = n[8]),
            l
          );
        },
      ],
      455418,
    ));
  var p = e.i(938277);
  let x = !1,
    b = [1e3, 5e7],
    g = [0, 5e5];
  var v = e.i(595673),
    y = e.i(78436);
  let w = () => ({ marketCap: [...b], volume: [...g] }),
    j = (0, y.$)()((e) => {
      let t;
      return {
        ...{
          appliedMarketCapRange: (t = w()).marketCap,
          appliedVolumeRange: t.volume,
          appliedVerifiedOnly: x,
        },
        setAppliedFilters: (t) =>
          e((e) => ({
            appliedMarketCapRange: t.marketCap,
            appliedVolumeRange: t.volume,
            appliedVerifiedOnly: t.verifiedOnly ?? e.appliedVerifiedOnly,
          })),
        resetFilters: () =>
          e(() => {
            let e = w();
            return {
              appliedMarketCapRange: e.marketCap,
              appliedVolumeRange: e.volume,
              appliedVerifiedOnly: x,
            };
          }),
        resetMarketCapFilter: () =>
          e(() => ({ appliedMarketCapRange: w().marketCap })),
        resetVolumeFilter: () => e(() => ({ appliedVolumeRange: w().volume })),
        resetVerifiedFilter: () => e({ appliedVerifiedOnly: x }),
      };
    }),
    _ = (e) => e.appliedMarketCapRange,
    C = (e) => e.appliedVolumeRange,
    N = (e) => e.appliedVerifiedOnly,
    k = (e) => e.setAppliedFilters,
    S = (e) => e.resetFilters,
    M = (e) => e.resetMarketCapFilter,
    E = (e) => e.resetVolumeFilter,
    T = (e) => e.resetVerifiedFilter;
  function A(e) {
    let [t, r] = e;
    return [
      [`${t}_min`, r.min],
      [`${t}_max`, r.max],
    ];
  }
  function L(e, t) {
    let r = "marketCap" === t ? 5e7 : 5e5,
      l = 1e3 * ("marketCap" === t),
      a = (0, p.a)(e[0]),
      n = e[1] >= r ? `${(0, p.a)(e[1])}+` : (0, p.a)(e[1]);
    return e[0] === l && e[1] >= r
      ? `${(0, p.a)(r)}+`
      : e[0] === l
        ? `Up to ${n}`
        : e[1] >= r
          ? `${a}+`
          : `${a} - ${n}`;
  }
  e.s(
    [
      "f",
      0,
      () => {
        let e,
          t,
          l,
          a,
          n,
          i,
          s,
          o,
          c,
          d,
          u,
          m,
          f,
          h = (0, r.c)(44),
          p = j(_),
          b = j(C),
          g = j(N),
          y = j(k),
          w = j(S),
          I = j(M),
          R = j(E),
          F = j(T);
        h[0] !== p || h[1] !== g || h[2] !== b
          ? ((e = ((e, t, r = x) =>
              1e3 === e[0] &&
              5e7 === e[1] &&
              0 === t[0] &&
              5e5 === t[1] &&
              r === x)(p, b, g)),
            (h[0] = p),
            (h[1] = g),
            (h[2] = b),
            (h[3] = e))
          : (e = h[3]);
        let O = !e;
        if (h[4] !== p)
          ((t = p[0] > 1e3 || p[1] < 5e7), (h[4] = p), (h[5] = t));
        else t = h[5];
        let W = t;
        if (h[6] !== b) ((l = b[0] > 0 || b[1] < 5e5), (h[6] = b), (h[7] = l));
        else l = h[7];
        let B = l;
        if (h[8] !== p || h[9] !== g || h[10] !== b) {
          var z;
          let e;
          ((e = {}),
            ((z = { marketCap: p, volume: b, verifiedOnly: g }).marketCap[0] >
              1e3 ||
              z.marketCap[1] < 5e7) &&
              ((e.marketCapMin = z.marketCap[0]),
              z.marketCap[1] < 5e7 && (e.marketCapMax = z.marketCap[1])),
            (z.volume[0] > 0 || z.volume[1] < 5e5) &&
              ((e.volume24hMin = z.volume[0]),
              z.volume[1] < 5e5 && (e.volume24hMax = z.volume[1])),
            z.verifiedOnly && (e.verifiedOnly = !0),
            (a = e),
            (h[8] = p),
            (h[9] = g),
            (h[10] = b),
            (h[11] = a));
        } else a = h[11];
        let P = a;
        h[12] !== P || h[13] !== O
          ? ((n = O ? JSON.stringify(P) : ""),
            (h[12] = P),
            (h[13] = O),
            (h[14] = n))
          : (n = h[14]);
        let V = n;
        h[15] !== y
          ? ((i = (e) => {
              y(e);
              let t = [],
                r = {};
              (e.marketCap &&
                (e.marketCap[0] > 1e3 || e.marketCap[1] < 5e7) &&
                (t.push("market_cap"),
                (r.market_cap = { min: e.marketCap[0], max: e.marketCap[1] })),
                e.volume &&
                  (e.volume[0] > 0 || e.volume[1] < 5e5) &&
                  (t.push("volume"),
                  (r.volume = { min: e.volume[0], max: e.volume[1] })));
              let l = t.length > 0;
              (e.verifiedOnly && t.push("verified_only"),
                t.length > 0 &&
                  (0, v.qm)({
                    status: "apply",
                    hasMetricsFilter: l,
                    filtersSet: {
                      ...Object.fromEntries(Object.entries(r).flatMap(A)),
                      ...(e.verifiedOnly ? { verified_only: !0 } : {}),
                    },
                  }));
            }),
            (h[15] = y),
            (h[16] = i))
          : (i = h[16]);
        let D = i;
        h[17] !== w
          ? ((s = () => {
              ((0, v.qm)({ status: "clear", filtersSet: { cleared: "all" } }),
                w());
            }),
            (h[17] = w),
            (h[18] = s))
          : (s = h[18]);
        let U = s;
        h[19] !== I
          ? ((o = () => {
              ((0, v.qm)({
                status: "clear",
                filtersSet: { cleared: "market_cap" },
              }),
                I());
            }),
            (h[19] = I),
            (h[20] = o))
          : (o = h[20]);
        let $ = o;
        h[21] !== R
          ? ((c = () => {
              ((0, v.qm)({
                status: "clear",
                filtersSet: { cleared: "volume" },
              }),
                R());
            }),
            (h[21] = R),
            (h[22] = c))
          : (c = h[22]);
        let H = c;
        h[23] !== F
          ? ((d = () => {
              ((0, v.qm)({
                status: "clear",
                filtersSet: { cleared: "verified_only" },
              }),
                F());
            }),
            (h[23] = F),
            (h[24] = d))
          : (d = h[24]);
        let G = d;
        h[25] !== w
          ? ((u = () => {
              w();
            }),
            (h[25] = w),
            (h[26] = u))
          : (u = h[26]);
        let K = u;
        h[27] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = {
              MARKET_CAP_MIN: 1e3,
              MARKET_CAP_MAX: 5e7,
              VOLUME_MIN: 0,
              VOLUME_MAX: 5e5,
            }),
            (h[27] = m))
          : (m = h[27]);
        let q = m;
        return (
          h[28] !== P ||
          h[29] !== V ||
          h[30] !== p ||
          h[31] !== g ||
          h[32] !== b ||
          h[33] !== D ||
          h[34] !== U ||
          h[35] !== O ||
          h[36] !== W ||
          h[37] !== g ||
          h[38] !== B ||
          h[39] !== K ||
          h[40] !== $ ||
          h[41] !== G ||
          h[42] !== H
            ? ((f = {
                appliedMarketCapRange: p,
                appliedVolumeRange: b,
                appliedVerifiedOnly: g,
                hasActiveFilters: O,
                hasMarketCapFilter: W,
                hasVolumeFilter: B,
                hasVerifiedFilter: g,
                apiFilterParams: P,
                appliedFiltersKey: V,
                handleApplyFilters: D,
                handleClearFilters: U,
                resetMarketCapFilter: $,
                resetVolumeFilter: H,
                resetVerifiedFilter: G,
                resetFilters: K,
                formatFilterValue: L,
                constants: q,
              }),
              (h[28] = P),
              (h[29] = V),
              (h[30] = p),
              (h[31] = g),
              (h[32] = b),
              (h[33] = D),
              (h[34] = U),
              (h[35] = O),
              (h[36] = W),
              (h[37] = g),
              (h[38] = B),
              (h[39] = K),
              (h[40] = $),
              (h[41] = G),
              (h[42] = H),
              (h[43] = f))
            : (f = h[43]),
          f
        );
      },
    ],
    364043,
  );
};
