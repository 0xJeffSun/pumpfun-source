// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(322315),
    i = e.i(254010),
    n = e.i(254667),
    l = e.i(606933),
    s = e.i(599077),
    o = e.i(352386),
    c = e.i(231332);
  e.i(12692);
  var d = e.i(398902),
    u = e.i(772876);
  e.i(334076);
  var m = e.i(666880),
    f = e.i(256272),
    p = e.i(850175),
    h = e.i(411657),
    b = e.i(592209),
    x = e.i(835894),
    g = e.i(605587),
    y = e.i(441057),
    v = e.i(409844);
  let w = (e, t) => {
      ((e.style.position = t.position),
        (e.style.top = `${t.top}px`),
        (e.style.left = `${t.left}px`),
        (e.style.width = `${t.width}px`),
        (e.style.height = `${t.height}px`));
    },
    _ = ["web.chart", "web.coin"],
    j = ["web.chart.loading_chart", "web.coin.chart_interval_unavailable"],
    C = ["a", "b"],
    N = "/coin/",
    S = (e, t) => {
      if (!e.startsWith(N)) return !1;
      let r = e.slice(N.length);
      return !r.includes("/") && (0, g.c)(r) === (0, g.c)(t);
    },
    k = () => () => void 0,
    E = () => !0,
    A = () => !1;
  function I(e) {
    let n,
      l,
      s,
      c,
      d,
      m,
      p,
      h,
      b,
      g,
      y,
      v,
      _ = (0, r.c)(34),
      {
        frameKey: j,
        coin: C,
        slot: N,
        pageProps: S,
        lendOverlay: k,
        shape: E,
        ChartComponent: A,
      } = e,
      I = (0, o.useRef)(null),
      O = (0, o.useRef)(null),
      M = (0, o.useRef)(null),
      D = (0, x.x)(L),
      F = (0, x.x)(R),
      P = (0, x.x)(T),
      z = (0, u.f)(C.mint),
      K = (0, i.k)(a.D.COIN_PAGE_LINE_CHART),
      { widthPx: B, heightPx: H } = E;
    (_[0] !== H || _[1] !== N || _[2] !== B
      ? ((n = () => {
          let e = I.current;
          if (N || !e) return;
          let t = (({ widthPx: e, heightPx: t }) => ({
            position: "fixed",
            top: 0,
            left: -1e4,
            width: Math.round(e),
            height: Math.round(t),
          }))({ widthPx: B, heightPx: H });
          (w(e, t), (M.current = t));
        }),
        (l = [N, B, H]),
        (_[0] = H),
        (_[1] = N),
        (_[2] = B),
        (_[3] = n),
        (_[4] = l))
      : ((n = _[3]), (l = _[4])),
      (0, o.useLayoutEffect)(n, l),
      _[5] !== P || _[6] !== N
        ? ((s = () => {
            let e = I.current;
            if (!N || !e) return;
            e.style.position = "absolute";
            let t = 0,
              r = () => {
                let a,
                  i = (({ rect: e, origin: t }) => ({
                    position: "absolute",
                    top: Math.round(e.top - t.top),
                    left: Math.round(e.left - t.left),
                    width: Math.round(e.width),
                    height: Math.round(e.height),
                  }))({
                    rect: N.getBoundingClientRect(),
                    origin: ((e) => {
                      let t = e.offsetParent;
                      if (!(t instanceof HTMLElement) || t === document.body)
                        return { top: -window.scrollY, left: -window.scrollX };
                      let r = t.getBoundingClientRect();
                      return {
                        top: r.top + t.clientTop,
                        left: r.left + t.clientLeft,
                      };
                    })(e),
                  });
                ((a = M.current),
                  (null === a ||
                    a.position !== i.position ||
                    a.top !== i.top ||
                    a.left !== i.left ||
                    a.width !== i.width ||
                    a.height !== i.height) &&
                    (w(e, i), (M.current = i), P(i.width)),
                  (t = window.requestAnimationFrame(r)));
              };
            return (r(), () => window.cancelAnimationFrame(t));
          }),
          (c = [N, P]),
          (_[5] = P),
          (_[6] = N),
          (_[7] = s),
          (_[8] = c))
        : ((s = _[7]), (c = _[8])),
      (0, o.useLayoutEffect)(s, c),
      _[9] !== F || _[10] !== k || _[11] !== D || _[12] !== N
        ? ((d = () => {
            let e = O.current;
            if (k && N && e) return (D(e), () => F(e));
          }),
          (m = [k, N, D, F]),
          (_[9] = F),
          (_[10] = k),
          (_[11] = D),
          (_[12] = N),
          (_[13] = d),
          (_[14] = m))
        : ((d = _[13]), (m = _[14])),
      (0, o.useLayoutEffect)(d, m),
      _[15] !== C || _[16] !== H || _[17] !== K || _[18] !== S || _[19] !== z
        ? ((p = S
            ? (({ surface: e, onSelectHoldersTradesTab: t, ...r }) => r)(S)
            : {
                coin: C,
                displayMode: z.displayMode,
                onDisplayModeChange: z.setDisplayMode,
                view: K ? "line" : "candle",
                heightPx: H,
              }),
          (_[15] = C),
          (_[16] = H),
          (_[17] = K),
          (_[18] = S),
          (_[19] = z),
          (_[20] = p))
        : (p = _[20]));
    let q = p,
      W = N ? (k ? "slot" : "shell") : "offscreen";
    _[21] === Symbol.for("react.memo_cache_sentinel")
      ? ((h = { zIndex: 1 }), (_[21] = h))
      : (h = _[21]);
    let U = S?.surface ?? E.surface;
    return (
      _[22] !== A || _[23] !== q
        ? ((b = (0, t.jsx)(A, { ...q })), (_[22] = A), (_[23] = q), (_[24] = b))
        : (b = _[24]),
      _[25] !== U || _[26] !== b
        ? ((g = (0, t.jsx)(f.F, { surface: U, children: b })),
          (_[25] = U),
          (_[26] = b),
          (_[27] = g))
        : (g = _[27]),
      _[28] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = (0, t.jsx)("div", {
            ref: O,
            "data-testid": "coin-chart-host-overlay",
            className: "pointer-events-none absolute inset-0 z-10",
          })),
          (_[28] = y))
        : (y = _[28]),
      _[29] !== C.mint || _[30] !== j || _[31] !== g || _[32] !== W
        ? ((v = (0, t.jsxs)("div", {
            ref: I,
            "data-testid": "coin-chart-host-frame",
            "data-frame": j,
            "data-mint": C.mint,
            "data-placed": W,
            style: h,
            children: [g, y],
          })),
          (_[29] = C.mint),
          (_[30] = j),
          (_[31] = g),
          (_[32] = W),
          (_[33] = v))
        : (v = _[33]),
      v
    );
  }
  function T(e) {
    return e.rememberSlotWidth;
  }
  function R(e) {
    return e.clearOverlay;
  }
  function L(e) {
    return e.setOverlay;
  }
  function O(e) {
    return (0, t.jsx)(I, { ...e }, e.frameKey);
  }
  function M(e) {
    n.y.error("Failed to load the hosted coin page chart", { error: e });
  }
  function D(e) {
    return e.lastShape;
  }
  function F(e) {
    return e.shell;
  }
  function P(e) {
    return e.dropSeenCoin;
  }
  function z(e) {
    return e.seatIdle;
  }
  function K(e) {
    return e.seenCoins;
  }
  function B(e) {
    return e.pool;
  }
  function H(e) {
    return e.frameProps;
  }
  function q(e) {
    return e.idleSeats;
  }
  function W(e) {
    return e.pendingProps;
  }
  function U(e) {
    return e.pending;
  }
  function V(e) {
    return e.target;
  }
  function G(e) {
    return e.clearPreboot;
  }
  function $(e) {
    return e.setHasChart;
  }
  function Q(e) {
    return e.setEnabled;
  }
  e.s(
    [
      "CoinChartHost",
      0,
      function () {
        let e,
          u,
          f,
          w,
          N,
          I,
          T,
          R,
          L,
          Z,
          Y,
          X,
          J,
          ee,
          et,
          er,
          ea,
          ei,
          en,
          el,
          es,
          eo,
          ec,
          ed = (0, r.c)(69),
          eu = (0, i.k)(a.D.WEB_INSTANT_COIN_CHART),
          em = (0, x.x)(Q),
          ef = (0, x.x)($),
          ep = (0, x.x)(G),
          eh = (0, x.x)(V),
          eb = (0, x.x)(U),
          ex = (0, x.x)(W),
          eg = (0, x.x)(q),
          ey = (0, x.x)(H),
          ev = (0, x.x)(B),
          ew = (0, x.x)(K),
          e_ = (0, x.x)(z),
          ej = (0, x.x)(P),
          eC = (0, x.x)(F),
          eN = (0, x.x)(D),
          eS = (0, s.usePathname)(),
          ek = (0, o.useSyncExternalStore)(k, E, A),
          [eE, eA] = (0, o.useState)(null),
          [eI, eT] = (0, o.useState)(null),
          { i18n: eR } = (0, d.f)();
        ed[0] !== eR.store
          ? ((e = (e) => (
              eR.store.on("added", e),
              () => {
                eR.store.off("added", e);
              }
            )),
            (ed[0] = eR.store),
            (ed[1] = e))
          : (e = ed[1]);
        let eL = e;
        ed[2] !== eR
          ? ((u = () => j.every((e) => eR.exists(e))),
            (ed[2] = eR),
            (ed[3] = u))
          : (u = ed[3]);
        let eO = u,
          eM = (0, o.useSyncExternalStore)(eL, eO, A);
        (ed[4] !== eu || ed[5] !== ek || ed[6] !== em
          ? ((f = () => {
              em(eu && ek);
            }),
            (w = [eu, ek, em]),
            (ed[4] = eu),
            (ed[5] = ek),
            (ed[6] = em),
            (ed[7] = f),
            (ed[8] = w))
          : ((f = ed[7]), (w = ed[8])),
          (0, o.useEffect)(f, w),
          ed[9] !== em
            ? ((N = () => () => em(!1)),
              (I = [em]),
              (ed[9] = em),
              (ed[10] = N),
              (ed[11] = I))
            : ((N = ed[10]), (I = ed[11])),
          (0, o.useEffect)(N, I));
        let eD = null !== ev.a || null !== ev.b;
        (ed[12] !== eD || ed[13] !== ef
          ? ((T = () => {
              ef(eD);
            }),
            (R = [eD, ef]),
            (ed[12] = eD),
            (ed[13] = ef),
            (ed[14] = T),
            (ed[15] = R))
          : ((T = ed[14]), (R = ed[15])),
          (0, o.useEffect)(T, R));
        let eF = eu && ek && eD;
        (ed[16] !== eE || ed[17] !== eF
          ? ((L = () => {
              if (!eF || eE) return;
              let e = !1;
              return (
                (0, y.f)()
                  .then((t) => {
                    e || eA(() => t.default);
                  })
                  .catch(M),
                () => {
                  e = !0;
                }
              );
            }),
            (Z = [eF, eE]),
            (ed[16] = eE),
            (ed[17] = eF),
            (ed[18] = L),
            (ed[19] = Z))
          : ((L = ed[18]), (Z = ed[19])),
          (0, o.useEffect)(L, Z),
          ed[20] !== eg || ed[21] !== eb || ed[22] !== ex || ed[23] !== ev
            ? ((Y =
                null !== eb &&
                null === ex &&
                !eg.some((e) => e === (0, x.r)(ev, eb.mint))),
              (ed[20] = eg),
              (ed[21] = eb),
              (ed[22] = ex),
              (ed[23] = ev),
              (ed[24] = Y))
            : (Y = ed[24]));
        let eP = Y;
        ed[25] !== ev || ed[26] !== eP || ed[27] !== ew
          ? ((X =
              eP || (null !== ev.a && null !== ev.b)
                ? null
                : (ew.find(
                    (e) => void 0 === (0, x.r)(ev, e.mint) && (0, m.f)(e),
                  ) ?? null)),
            (ed[25] = ev),
            (ed[26] = eP),
            (ed[27] = ew),
            (ed[28] = X))
          : (X = ed[28]);
        let ez = X,
          eK = (0, l.useQueryClient)();
        (ed[29] !== eM ||
        ed[30] !== ej ||
        ed[31] !== eu ||
        ed[32] !== ez ||
        ed[33] !== ek ||
        ed[34] !== eK ||
        ed[35] !== e_
          ? ((J = () => {
              let e;
              if (
                !eu ||
                !ek ||
                !eM ||
                !ez ||
                !(
                  !(
                    "function" != typeof window.matchMedia ||
                    navigator.connection?.saveData
                  ) && window.matchMedia("(min-width: 1024px)").matches
                )
              )
                return;
              let t = !1,
                r =
                  ((e = () => {
                    (0, p.b)(eK, ez.mint).then((e) => {
                      t || (e && (0, m.f)(e) ? e_(e) : ej(ez.mint));
                    });
                  }),
                  "function" == typeof window.requestIdleCallback
                    ? {
                        kind: "idle",
                        id: window.requestIdleCallback(e, { timeout: 4e3 }),
                      }
                    : { kind: "timer", id: window.setTimeout(e, 2e3) });
              return () => {
                ((t = !0),
                  "idle" === r.kind
                    ? window.cancelIdleCallback(r.id)
                    : window.clearTimeout(r.id));
              };
            }),
            (ee = [eu, ek, eM, ez, e_, ej, eK]),
            (ed[29] = eM),
            (ed[30] = ej),
            (ed[31] = eu),
            (ed[32] = ez),
            (ed[33] = ek),
            (ed[34] = eK),
            (ed[35] = e_),
            (ed[36] = J),
            (ed[37] = ee))
          : ((J = ed[36]), (ee = ed[37])),
          (0, o.useEffect)(J, ee));
        let eB = eb?.mint ?? null;
        (ed[38] !== ep || ed[39] !== eB
          ? ((et = () => {
              if (!eB) return;
              let e = window.setTimeout(() => ep(eB), 3e4);
              return () => window.clearTimeout(e);
            }),
            (er = [eB, ep]),
            (ed[38] = ep),
            (ed[39] = eB),
            (ed[40] = et),
            (ed[41] = er))
          : ((et = ed[40]), (er = ed[41])),
          (0, o.useEffect)(et, er));
        let [eH, eq] = (0, o.useState)(eM);
        eM && !eH && eq(!0);
        let eW = (0, o.useRef)(!1);
        if (
          (ed[42] !== eM || ed[43] !== eR || ed[44] !== ez || ed[45] !== eB
            ? ((ea = () => {
                if ((!eB && !ez) || eM || eW.current) return;
                eW.current = !0;
                let e = (0, b.v)(eR.language) ?? b.T;
                (0, h.k)(eR, e, _).catch((e) => {
                  ((eW.current = !1),
                    n.y.warn("Chart host: the chart's copy did not load", {
                      error: e,
                    }));
                });
              }),
              (ei = [eB, ez, eM, eR]),
              (ed[42] = eM),
              (ed[43] = eR),
              (ed[44] = ez),
              (ed[45] = eB),
              (ed[46] = ea),
              (ed[47] = ei))
            : ((ea = ed[46]), (ei = ed[47])),
          (0, o.useEffect)(ea, ei),
          !eu || !ek)
        )
          return null;
        ed[48] !== eN
          ? ((en = eN ?? {
              widthPx: x.f,
              heightPx: (0, v.H)() ?? v.v,
              surface: "panel",
            }),
            (ed[48] = eN),
            (ed[49] = en))
          : (en = ed[49]);
        let eU = en,
          eV = eh?.props.coin.mint ?? null;
        if (
          ed[50] !== eE ||
          ed[51] !== eH ||
          ed[52] !== eM ||
          ed[53] !== ey ||
          ed[54] !== eS ||
          ed[55] !== eb ||
          ed[56] !== ex ||
          ed[57] !== ev ||
          ed[58] !== eU ||
          ed[59] !== eC ||
          ed[60] !== eh ||
          ed[61] !== eV
        ) {
          for (let e of ((el = []), C)) {
            let t = ev[e];
            if (!t || !eE) continue;
            let r = null !== eV && (0, x.a)(t.mint, eV);
            if (!r && !eM && !eH) continue;
            let a = !r && null !== eb && (0, x.a)(eb.mint, t.mint),
              i = !r && null === eh && null !== eC && S(eS, t.mint);
            el.push({
              frameKey: e,
              coin: t,
              slot: r && eh ? eh.slot : i ? eC : null,
              pageProps:
                r && eh
                  ? eh.props
                  : a
                    ? (ex ?? ey[(0, g.c)(t.mint)] ?? null)
                    : (ey[(0, g.c)(t.mint)] ?? null),
              lendOverlay: r,
              shape: eU,
              ChartComponent: eE,
            });
          }
          ((ed[50] = eE),
            (ed[51] = eH),
            (ed[52] = eM),
            (ed[53] = ey),
            (ed[54] = eS),
            (ed[55] = eb),
            (ed[56] = ex),
            (ed[57] = ev),
            (ed[58] = eU),
            (ed[59] = eC),
            (ed[60] = eh),
            (ed[61] = eV),
            (ed[62] = el));
        } else el = ed[62];
        return (
          ed[63] === Symbol.for("react.memo_cache_sentinel")
            ? ((es = (0, t.jsx)("div", {
                ref: eT,
                "data-testid": "coin-chart-host-root",
                className: "contents",
              })),
              (ed[63] = es))
            : (es = ed[63]),
          ed[64] !== el || ed[65] !== eI
            ? ((eo =
                eI && el.length > 0
                  ? (0, c.createPortal)(el.map(O), eI)
                  : null),
              (ed[64] = el),
              (ed[65] = eI),
              (ed[66] = eo))
            : (eo = ed[66]),
          ed[67] !== eo
            ? ((ec = (0, t.jsxs)(t.Fragment, { children: [es, eo] })),
              (ed[67] = eo),
              (ed[68] = ec))
            : (ec = ed[68]),
          ec
        );
      },
    ],
    541256,
  );
};
