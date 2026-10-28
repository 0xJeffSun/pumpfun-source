// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    i = e.i(965690);
  let l = (0, t.createContext)(i.O),
    r = () => (0, t.use)(l),
    a = (0, t.createContext)(!1);
  e.s(["C", 0, a, "p", 0, l, "X", 0, () => (0, t.use)(a), "V", 0, r], 515761);
  var s = e.i(732486),
    n = e.i(445242),
    o = e.i(219266),
    d = e.i(662093),
    c = e.i(338319),
    u = e.i(844969);
  let p = { success: "text-text-accent", error: "text-loss" },
    m = (0, t.memo)(
      (e) => {
        let i,
          l,
          r,
          a,
          o,
          d,
          m,
          h,
          f,
          x,
          y,
          v,
          b,
          g,
          w,
          _ = (0, n.c)(45),
          {
            data: k,
            width: S,
            height: j,
            tipSerial: C,
            color: N,
            className: F,
            strokeWidth: A,
          } = e,
          I = void 0 === C ? 0 : C,
          D = void 0 === A ? u.G : A,
          T = (0, t.useId)();
        if (_[0] !== T) {
          let e;
          (_[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = /[^a-zA-Z0-9_-]/g), (_[2] = e))
            : (e = _[2]),
            (i = T.replace(e, "")),
            (_[0] = T),
            (_[1] = i));
        } else i = _[1];
        let U = `${i}-glow`;
        _[3] !== k || _[4] !== j || _[5] !== S
          ? ((l = (0, u.R)(k, S, j)),
            (_[3] = k),
            (_[4] = j),
            (_[5] = S),
            (_[6] = l))
          : (l = _[6]);
        let E = l,
          [P, M] = (0, t.useState)(null),
          q = (0, t.useRef)(I);
        (_[7] !== I
          ? ((r = () => {
              let e = q.current;
              ((q.current = I),
                I !== e && M(0 === I ? null : Date.now() + u.n));
            }),
            (a = [I]),
            (_[7] = I),
            (_[8] = r),
            (_[9] = a))
          : ((r = _[8]), (a = _[9])),
          (0, t.useEffect)(r, a));
        let R = 0 === k.length,
          [W, B] = (0, t.useState)(R);
        (W !== R && (B(R), R && M(null)),
          _[10] !== P
            ? ((d = () => {
                if (null === P) return;
                let e = setTimeout(() => M(null), Math.max(0, P - Date.now()));
                return () => clearTimeout(e);
              }),
              (o = [P]),
              (_[10] = P),
              (_[11] = o),
              (_[12] = d))
            : ((o = _[11]), (d = _[12])),
          (0, t.useEffect)(d, o));
        let O = null !== P;
        if (!E) return null;
        let z = p[void 0 === N ? "success" : N];
        _[13] !== F || _[14] !== z
          ? ((m = (0, c.c)("block", z, F)),
            (_[13] = F),
            (_[14] = z),
            (_[15] = m))
          : (m = _[15]);
        let H = `0 0 ${S} ${j}`;
        (_[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = (0, s.jsx)("feGaussianBlur", { stdDeviation: u.j })),
            (f = (0, s.jsx)("feOffset", { dy: u.B })),
            (_[16] = h),
            (_[17] = f))
          : ((h = _[16]), (f = _[17])),
          _[18] !== U || _[19] !== j || _[20] !== S
            ? ((x = (0, s.jsx)("defs", {
                children: (0, s.jsxs)("filter", {
                  filterUnits: "userSpaceOnUse",
                  height: j,
                  id: U,
                  width: S,
                  x: 0,
                  y: 0,
                  children: [h, f],
                }),
              })),
              (_[18] = U),
              (_[19] = j),
              (_[20] = S),
              (_[21] = x))
            : (x = _[21]));
        let L = `url(#${U})`;
        (_[22] !== E.d || _[23] !== D || _[24] !== L
          ? ((y = (0, s.jsx)("path", {
              d: E.d,
              "data-sparkline-layer": "glow",
              fill: "none",
              filter: L,
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeWidth: D,
            })),
            (_[22] = E.d),
            (_[23] = D),
            (_[24] = L),
            (_[25] = y))
          : (y = _[25]),
          _[26] !== E.d || _[27] !== D
            ? ((v = (0, s.jsx)("path", {
                d: E.d,
                "data-sparkline-layer": "line",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeWidth: D,
              })),
              (_[26] = E.d),
              (_[27] = D),
              (_[28] = v))
            : (v = _[28]));
        let V = O ? "opacity-100" : "opacity-0";
        _[29] !== V
          ? ((b = (0, c.c)(
              "transition-opacity duration-300 motion-reduce:transition-none",
              V,
            )),
            (_[29] = V),
            (_[30] = b))
          : (b = _[30]);
        let $ = O ? "true" : "false";
        return (
          _[31] !== E.tip.x || _[32] !== E.tip.y || _[33] !== b || _[34] !== $
            ? ((g = (0, s.jsx)("circle", {
                className: b,
                cx: E.tip.x,
                cy: E.tip.y,
                "data-sparkline-layer": "orb",
                "data-visible": $,
                fill: "currentColor",
                r: u.l / 2,
              })),
              (_[31] = E.tip.x),
              (_[32] = E.tip.y),
              (_[33] = b),
              (_[34] = $),
              (_[35] = g))
            : (g = _[35]),
          _[36] !== j ||
          _[37] !== m ||
          _[38] !== H ||
          _[39] !== x ||
          _[40] !== y ||
          _[41] !== v ||
          _[42] !== g ||
          _[43] !== S
            ? ((w = (0, s.jsxs)("svg", {
                "aria-hidden": !0,
                className: m,
                "data-testid": "explore-sparkline-chart",
                height: j,
                viewBox: H,
                width: S,
                children: [x, y, v, g],
              })),
              (_[36] = j),
              (_[37] = m),
              (_[38] = H),
              (_[39] = x),
              (_[40] = y),
              (_[41] = v),
              (_[42] = g),
              (_[43] = S),
              (_[44] = w))
            : (w = _[44]),
          w
        );
      },
      (e, t) =>
        e.width === t.width &&
        e.height === t.height &&
        e.tipSerial === t.tipSerial &&
        e.color === t.color &&
        e.className === t.className &&
        e.strokeWidth === t.strokeWidth &&
        ((e, t) => {
          if (e === t) return !0;
          if (e.length !== t.length) return !1;
          let i = e[0],
            l = t[0],
            r = e[e.length - 1],
            a = t[t.length - 1];
          return (
            i?.time === l?.time &&
            i?.price === l?.price &&
            r?.time === a?.time &&
            r?.price === a?.price
          );
        })(e.data, t.data),
    );
  m.displayName = "ExploreSparklineChart";
  var h = e.i(618427),
    f = e.i(974166),
    x = e.i(526080),
    y = e.i(375676),
    v = e.i(636882),
    b = e.i(605587);
  let g = 30,
    w = (e) => "number" == typeof e && Number.isFinite(e) && e > 0,
    _ = (e, t) => [
      { price: e, time: t - 1e3 },
      { price: e, time: t },
    ],
    k = (e, t) => !(t > 0 && Math.abs(e - t) / t < 0.005),
    S = { series: [], isFallback: !1, tipSerial: 0 },
    j = ({ points: e, isEnabled: t, isPending: i, fallbackPrice: l }) => {
      let r = ((e) => {
        if (!e) return { kind: "empty" };
        let t = e.filter((e) => Number.isFinite(e.price));
        return t.length >= 2
          ? { kind: "series", points: t.length === e.length ? e : t }
          : 1 === t.length
            ? { kind: "single", price: t[0].price }
            : { kind: "empty" };
      })(e);
      return "series" === r.kind
        ? { series: r.points, isFallback: !1 }
        : t && i
          ? null
          : {
              series: _("single" === r.kind ? r.price : l, Date.now()),
              isFallback: !0,
            };
    },
    C = (e, t) => (w(e) && w(t) ? e / t : 0);
  function N(e) {
    return { ...S, tipSerial: e.tipSerial };
  }
  let F = {
      cell: { ...f.m, requestWidth: f.m.width, className: f._ },
      card: { ...o.S, requestWidth: f.m.width, className: o.O },
    },
    A =
      "absolute inset-0 transition-opacity duration-150 motion-reduce:transition-none",
    I = (0, t.memo)(
      (e) => {
        let i,
          l,
          r,
          a,
          u,
          p,
          f,
          I,
          D = (0, n.c)(28),
          { coin: T, variant: U, chartWidth: E } = e,
          P = void 0 === U ? "cell" : U,
          M =
            "card" === P && void 0 !== E && E > 0
              ? { ...F.card, width: E }
              : F[P];
        D[0] !== T
          ? ((i = {
              mint: T.mint,
              chainId: T.chain_id,
              fallbackMarketCap: T.usd_market_cap,
              coin: T,
            }),
            (D[0] = T),
            (D[1] = i))
          : (i = D[1]);
        let q = (0, d.h)(i),
          R = (0, d.k)(T.mint),
          W = (({ coin: e, basis: t }) => {
            if ((0, b.N)({ mint: e.mint, chainId: e.chain_id })) {
              let i;
              if (w(t?.ladderSupply))
                return w(t?.codexSupply) ? t.codexSupply : t.ladderSupply;
              if (
                ![
                  (i = e).circulating_supply_str,
                  i.total_supply_str,
                  i.total_supply,
                ].some((e) => null != e && Number(e) > 0)
              )
                return 0;
            }
            return (0, x.B)(e);
          })({ coin: T, basis: R }),
          {
            series: B,
            isFallback: O,
            tipSerial: z,
          } = ((e) => {
            let i,
              l,
              r,
              a,
              s,
              o,
              d,
              c,
              u,
              p,
              m,
              h,
              f,
              x,
              b,
              F = (0, n.c)(49),
              {
                mint: A,
                chainId: I,
                createdTimestamp: D,
                width: T,
                marketCap: U,
                totalSupply: E,
              } = e,
              P = D ?? 0;
            (F[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((i = { staleTime: 3e5, gcTime: 6e5, retry: 1 }), (F[0] = i))
              : (i = F[0]),
              F[1] !== I || F[2] !== A || F[3] !== P || F[4] !== T
                ? ((l = {
                    coinAddress: A,
                    chainId: I,
                    coinCreatedTimestamp: P,
                    timeframe: "24h",
                    width: T,
                    youngCoinSource: "line-chart",
                    queryOptions: i,
                  }),
                  (F[1] = I),
                  (F[2] = A),
                  (F[3] = P),
                  (F[4] = T),
                  (F[5] = l))
                : (l = F[5]));
            let {
              data: M,
              isPending: q,
              isLoading: R,
              isError: W,
            } = (0, y.f)(l);
            F[6] !== I || F[7] !== D || F[8] !== A
              ? ((r = (0, v.f)({
                  coinAddress: A,
                  coinCreatedTimestamp: D,
                  chainId: I,
                })),
                (F[6] = I),
                (F[7] = D),
                (F[8] = A),
                (F[9] = r))
              : (r = F[9]);
            let B = r;
            F[10] !== B ||
            F[11] !== q ||
            F[12] !== U ||
            F[13] !== M ||
            F[14] !== E
              ? ((a = () => {
                  let e = j({
                    points: M,
                    isEnabled: B,
                    isPending: q,
                    fallbackPrice: C(U, E),
                  });
                  return e ? { ...e, tipSerial: 0 } : S;
                }),
                (F[10] = B),
                (F[11] = q),
                (F[12] = U),
                (F[13] = M),
                (F[14] = E),
                (F[15] = a))
              : (a = F[15]);
            let [O] = (0, t.useState)(a),
              [z, H] = (0, t.useState)(O),
              L = (0, t.useRef)(O.series);
            F[16] === Symbol.for("react.memo_cache_sentinel")
              ? ((s = []), (F[16] = s))
              : (s = F[16]);
            let V = (0, t.useRef)(s);
            F[17] !== B ||
            F[18] !== q ||
            F[19] !== O.series.length ||
            F[20] !== M
              ? ((o =
                  O.series.length > 0
                    ? { points: M, isEnabled: B, isPending: q }
                    : null),
                (F[17] = B),
                (F[18] = q),
                (F[19] = O.series.length),
                (F[20] = M),
                (F[21] = o))
              : (o = F[21]);
            let $ = (0, t.useRef)(o),
              [K, G] = (0, t.useState)(A);
            if (K !== A) {
              G(A);
              let e = j({
                points: M,
                isEnabled: B,
                isPending: q,
                fallbackPrice: C(U, E),
              });
              H(e ? { ...e, tipSerial: 0 } : S);
            }
            let J = (0, t.useRef)(A),
              X = (0, t.useRef)(!0);
            (F[22] !== A
              ? ((d = () => {
                  J.current !== A &&
                    ((J.current = A),
                    (L.current = []),
                    (V.current = []),
                    ($.current = null),
                    (X.current = !0));
                }),
                (c = [A]),
                (F[22] = A),
                (F[23] = d),
                (F[24] = c))
              : ((d = F[23]), (c = F[24])),
              (0, t.useEffect)(d, c));
            let Q = (0, t.useRef)(0);
            return (
              F[25] !== U || F[26] !== E
                ? ((u = () => {
                    Q.current = C(U, E);
                  }),
                  (p = [U, E]),
                  (F[25] = U),
                  (F[26] = E),
                  (F[27] = u),
                  (F[28] = p))
                : ((u = F[27]), (p = F[28])),
              (0, t.useEffect)(u, p),
              F[29] !== B || F[30] !== q || F[31] !== M
                ? ((m = () => {
                    let e = $.current;
                    if (
                      e &&
                      e.points === M &&
                      e.isEnabled === B &&
                      e.isPending === q
                    )
                      return;
                    let t = j({
                      points: M,
                      isEnabled: B,
                      isPending: q,
                      fallbackPrice: Q.current,
                    });
                    if (!t) {
                      if (0 === L.current.length) return;
                      ((L.current = []),
                        (V.current = []),
                        ($.current = { points: M, isEnabled: B, isPending: q }),
                        H(N));
                      return;
                    }
                    let i = Q.current,
                      l = t.series[t.series.length - 1]?.price ?? 0,
                      r =
                        i > 0 && k(i, l)
                          ? [{ time: Date.now(), price: i }]
                          : [];
                    ((L.current = t.series),
                      (V.current = r),
                      ($.current = { points: M, isEnabled: B, isPending: q }),
                      i > 0 && (X.current = !1),
                      H((e) => ({
                        series: 0 === r.length ? t.series : [...t.series, ...r],
                        isFallback: t.isFallback,
                        tipSerial: e.tipSerial,
                      })));
                  }),
                  (F[29] = B),
                  (F[30] = q),
                  (F[31] = M),
                  (F[32] = m))
                : (m = F[32]),
              F[33] !== B || F[34] !== q || F[35] !== A || F[36] !== M
                ? ((h = [A, M, B, q]),
                  (F[33] = B),
                  (F[34] = q),
                  (F[35] = A),
                  (F[36] = M),
                  (F[37] = h))
                : (h = F[37]),
              (0, t.useEffect)(m, h),
              F[38] !== U || F[39] !== E
                ? ((f = () => {
                    let e = L.current;
                    if (0 === e.length || !w(U) || !w(E)) return;
                    let t = U / E;
                    if (!Number.isFinite(t)) return;
                    let i = X.current;
                    if (
                      ((X.current = !1),
                      2 === e.length && e.every((e) => 0 === e.price))
                    ) {
                      let e = _(t, Date.now());
                      ((L.current = e),
                        (V.current = []),
                        H((t) => ({ ...t, series: e })));
                      return;
                    }
                    let l = V.current;
                    if (!k(t, (l[l.length - 1] ?? e[e.length - 1])?.price ?? 0))
                      return;
                    let r = ((e, t, i = g) =>
                      e.length >= i ? [...e.slice(1), t] : [...e, t])(l, {
                      time: Date.now(),
                      price: t,
                    });
                    ((V.current = r),
                      H((t) => ({
                        series: [...e, ...r],
                        isFallback: t.isFallback,
                        tipSerial: i ? t.tipSerial : t.tipSerial + 1,
                      })));
                  }),
                  (F[38] = U),
                  (F[39] = E),
                  (F[40] = f))
                : (f = F[40]),
              F[41] !== U || F[42] !== A || F[43] !== E
                ? ((x = [A, U, E]),
                  (F[41] = U),
                  (F[42] = A),
                  (F[43] = E),
                  (F[44] = x))
                : (x = F[44]),
              (0, t.useEffect)(f, x),
              F[45] !== W || F[46] !== R || F[47] !== z
                ? ((b = { ...z, isLoading: R, isError: W }),
                  (F[45] = W),
                  (F[46] = R),
                  (F[47] = z),
                  (F[48] = b))
                : (b = F[48]),
              b
            );
          })({
            mint: T.mint,
            chainId: T.chain_id,
            createdTimestamp: T.created_timestamp,
            width: M.requestWidth,
            marketCap: q,
            totalSupply: W,
          }),
          H = B.length > 0,
          [L, V] = (0, t.useState)(H),
          [$, K] = (0, t.useState)(H);
        ($ !== H && (K(H), H || V(!1)),
          D[2] !== H
            ? ((l = () => {
                if (!H) return;
                let e = setTimeout(() => V(!0), 150);
                return () => clearTimeout(e);
              }),
              (r = [H]),
              (D[2] = H),
              (D[3] = l),
              (D[4] = r))
            : ((l = D[3]), (r = D[4])),
          (0, t.useEffect)(l, r));
        let G = !L,
          J = (0, c.c)("relative overflow-hidden", M.className),
          X = O ? "true" : void 0,
          Q = H ? "ready" : "loading",
          Y = H ? "opacity-100" : "opacity-0";
        D[5] !== Y
          ? ((a = (0, c.c)(A, Y)), (D[5] = Y), (D[6] = a))
          : (a = D[6]);
        let Z = "card" === P ? o.V : void 0;
        return (
          D[7] !== M.height ||
          D[8] !== M.width ||
          D[9] !== B ||
          D[10] !== Z ||
          D[11] !== z
            ? ((u = (0, s.jsx)(m, {
                data: B,
                height: M.height,
                strokeWidth: Z,
                tipSerial: z,
                width: M.width,
              })),
              (D[7] = M.height),
              (D[8] = M.width),
              (D[9] = B),
              (D[10] = Z),
              (D[11] = z),
              (D[12] = u))
            : (u = D[12]),
          D[13] !== a || D[14] !== u
            ? ((p = (0, s.jsx)("div", { className: a, children: u })),
              (D[13] = a),
              (D[14] = u),
              (D[15] = p))
            : (p = D[15]),
          D[16] !== M.height || D[17] !== M.width || D[18] !== H || D[19] !== G
            ? ((f = G
                ? (0, s.jsx)("div", {
                    className: (0, c.c)(
                      A,
                      "z-[1]",
                      H ? "opacity-0" : "opacity-100",
                    ),
                    "data-testid": "explore-sparkline-skeleton-layer",
                    children: (0, s.jsx)(h.f, {
                      height: M.height,
                      width: M.width,
                    }),
                  })
                : null),
              (D[16] = M.height),
              (D[17] = M.width),
              (D[18] = H),
              (D[19] = G),
              (D[20] = f))
            : (f = D[20]),
          D[21] !== p ||
          D[22] !== f ||
          D[23] !== J ||
          D[24] !== X ||
          D[25] !== Q ||
          D[26] !== P
            ? ((I = (0, s.jsxs)("div", {
                "aria-hidden": !0,
                className: J,
                "data-fallback": X,
                "data-state": Q,
                "data-testid": "explore-sparkline",
                "data-variant": P,
                children: [p, f],
              })),
              (D[21] = p),
              (D[22] = f),
              (D[23] = J),
              (D[24] = X),
              (D[25] = Q),
              (D[26] = P),
              (D[27] = I))
            : (I = D[27]),
          I
        );
      },
      (e, t) =>
        e.coin.mint === t.coin.mint &&
        e.coin.created_timestamp === t.coin.created_timestamp &&
        e.coin.chain_id === t.coin.chain_id &&
        e.coin.usd_market_cap === t.coin.usd_market_cap &&
        e.coin.total_supply === t.coin.total_supply &&
        e.coin.total_supply_str === t.coin.total_supply_str &&
        e.coin.base_decimals === t.coin.base_decimals &&
        e.coin.circulating_supply_str === t.coin.circulating_supply_str &&
        e.variant === t.variant &&
        e.chartWidth === t.chartWidth,
    );
  ((I.displayName = "ExploreSparklineCell"), e.s(["f", 0, I], 694151));
  var D = e.i(632817),
    T = e.i(372743);
  let U = ({ nowMs: e, createdTimestamp: t }) =>
    e !== D.Y && t ? Math.max(0, e - t) : null;
  (e.s(
    [
      "l",
      0,
      U,
      "P",
      0,
      function (e) {
        let t,
          l,
          a = (0, n.c)(6),
          { mint: s, createdTimestamp: o } = e,
          d = r();
        a[0] !== s
          ? ((t = (e) => e.marketActivity[s]), (a[0] = s), (a[1] = t))
          : (t = a[1]);
        let c = (0, T.f)(t);
        a[2] !== c || a[3] !== o || a[4] !== d
          ? ((l = (e) =>
              (0, i.o)({
                activity: c,
                window: d,
                coinAgeMs: U({ nowMs: e, createdTimestamp: o }),
              })),
            (a[2] = c),
            (a[3] = o),
            (a[4] = d),
            (a[5] = l))
          : (l = a[5]);
        let u = l;
        return (0, D.H)(u);
      },
    ],
    108496,
  ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let t,
            l,
            a = (0, n.c)(7),
            { mint: s, metric: o, createdTimestamp: d } = e,
            c = r();
          a[0] !== s
            ? ((t = (e) => e.marketActivity[s]), (a[0] = s), (a[1] = t))
            : (t = a[1]);
          let u = (0, T.f)(t);
          a[2] !== u || a[3] !== d || a[4] !== o || a[5] !== c
            ? ((l = (e) =>
                (0, i.E)({
                  activity: u,
                  window: c,
                  metric: o,
                  coinAgeMs: U({ nowMs: e, createdTimestamp: d }),
                })),
              (a[2] = u),
              (a[3] = d),
              (a[4] = o),
              (a[5] = c),
              (a[6] = l))
            : (l = a[6]);
          let p = l;
          return (0, D.H)(p);
        },
      ],
      716608,
    ));
};
