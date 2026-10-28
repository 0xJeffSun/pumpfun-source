// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    n = e.i(574472),
    r = e.i(606933),
    s = e.i(381720),
    l = e.i(249557),
    a = e.i(211670),
    o = e.i(449597),
    c = e.i(292686),
    d = e.i(352386);
  e.i(12692);
  var u = e.i(398902),
    m = e.i(798342),
    p = e.i(377920),
    f = e.i(745018),
    y = e.i(439587),
    h = e.i(426091),
    g = e.i(352247),
    _ = e.i(262110),
    x = e.i(949672),
    b = e.i(216374),
    v = e.i(690877),
    U = e.i(635234),
    w = e.i(440072),
    P = e.i(295855),
    j = e.i(630208),
    S = e.i(695705),
    k = e.i(493729),
    N = e.i(159709),
    L = e.i(90832);
  let T = (e) => {
      let n,
        r = (0, i.c)(2);
      return (0, P.n)(e.coin.mint)
        ? (r[0] !== e
            ? ((n = (0, t.jsx)(O, { ...e })), (r[0] = e), (r[1] = n))
            : (n = r[1]),
          n)
        : null;
    },
    O = (e) => {
      let r,
        s,
        l,
        a,
        o,
        c,
        m,
        p,
        P,
        T,
        O,
        E,
        A = (0, i.c)(68),
        { coin: C, hasPosition: M, positionUsd: K, className: I } = e,
        { t: q } = (0, u.f)(),
        { address: F } = (0, n.F)(),
        [B, R] = (0, d.useState)(!1),
        [$, z] = (0, d.useState)(!1),
        D = F ?? void 0;
      A[0] !== C.mint || A[1] !== D
        ? ((r = { user: D, mint: C.mint }),
          (A[0] = C.mint),
          (A[1] = D),
          (A[2] = r))
        : (r = A[2]);
      let G = (0, j.f)(r),
        { takeProfitMcapUsd: Q, stopLossMcapUsd: W } = (0, S.$)(G.data ?? []),
        H = null != Q || null != W,
        V = F ?? void 0;
      A[3] !== C.mint || A[4] !== M || A[5] !== V
        ? ((s = { user: V, mint: C.mint, enabled: M }),
          (A[3] = C.mint),
          (A[4] = M),
          (A[5] = V),
          (A[6] = s))
        : (s = A[6]);
      let Z = ((e) => {
        let t,
          n,
          r,
          s = (0, i.c)(10),
          { user: l, mint: a, enabled: o } = e;
        (s[0] !== a || s[1] !== l
          ? ((t = w.f.eligibility(l ?? "", a ?? "")),
            (s[0] = a),
            (s[1] = l),
            (s[2] = t))
          : (t = s[2]),
          s[3] !== a || s[4] !== l
            ? ((n = () => (0, U.h)({ user: l ?? "", mint: a ?? "" })),
              (s[3] = a),
              (s[4] = l),
              (s[5] = n))
            : (n = s[5]));
        let c = (void 0 === o || o) && !!l && !!a;
        return (
          s[6] !== t || s[7] !== n || s[8] !== c
            ? ((r = { queryKey: t, queryFn: n, enabled: c, staleTime: 3e4 }),
              (s[6] = t),
              (s[7] = n),
              (s[8] = c),
              (s[9] = r))
            : (r = s[9]),
          (0, v.useQuery)(r)
        );
      })(s);
      A[7] !== H
        ? ((l = () => {
            H || (0, k.w)() ? R(!0) : z(!0);
          }),
          (A[7] = H),
          (A[8] = l))
        : (l = A[8]);
      let J = l;
      (A[9] !== C.mint
        ? ((a = () => {
            let e = (e) => {
              let t = e.detail;
              t?.mint === C.mint && (e.stopImmediatePropagation(), R(!0));
            };
            return (
              window.addEventListener(g.X, e),
              () => {
                window.removeEventListener(g.X, e);
              }
            );
          }),
          (o = [C.mint]),
          (A[9] = C.mint),
          (A[10] = a),
          (A[11] = o))
        : ((a = A[10]), (o = A[11])),
        (0, d.useEffect)(a, o),
        A[12] !== I
          ? ((c = (0, h.c)(b.s, "tabular-nums", I)), (A[12] = I), (A[13] = c))
          : (c = A[13]));
      let X = c;
      (A[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = () => {
            (z(!1), R(!0));
          }),
          (A[14] = m))
        : (m = A[14]),
        A[15] !== $
          ? ((p = (0, t.jsx)(x.f, { open: $, onOpenChange: z, onContinue: m })),
            (A[15] = $),
            (A[16] = p))
          : (p = A[16]),
        A[17] !== C || A[18] !== B
          ? ((P = (0, t.jsx)(_.f, { coin: C, open: B, onOpenChange: R })),
            (A[17] = C),
            (A[18] = B),
            (A[19] = P))
          : (P = A[19]),
        A[20] !== p || A[21] !== P
          ? ((T = (0, t.jsxs)(t.Fragment, { children: [p, P] })),
            (A[20] = p),
            (A[21] = P),
            (A[22] = T))
          : (T = A[22]));
      let Y = T;
      if (H) {
        let e,
          i,
          n,
          r = [
            null != Q
              ? q("coin_details.position_tp_sl_tp_leg_no_percent", {
                  mcap: (0, L.v)(Q),
                })
              : null,
            null != W
              ? q("coin_details.position_tp_sl_sl_leg_no_percent", {
                  mcap: (0, L.v)(W),
                })
              : null,
          ]
            .filter(Boolean)
            .join(" | ");
        return (
          A[23] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)(f._o, { className: "size-3.5" })), (A[23] = e))
            : (e = A[23]),
          A[24] !== X || A[25] !== r || A[26] !== J
            ? ((i = (0, t.jsx)(y.K, {
                variant: "secondary",
                size: 32,
                isFullWidth: !0,
                className: X,
                iconStart: e,
                onClick: J,
                children: r,
              })),
              (A[24] = X),
              (A[25] = r),
              (A[26] = J),
              (A[27] = i))
            : (i = A[27]),
          A[28] !== Y || A[29] !== i
            ? ((n = (0, t.jsxs)(t.Fragment, { children: [i, Y] })),
              (A[28] = Y),
              (A[29] = i),
              (A[30] = n))
            : (n = A[30]),
          n
        );
      }
      if (!M) return null;
      A[31] !== X || A[32] !== Y || A[33] !== J || A[34] !== q
        ? ((O = (e) =>
            (0, t.jsxs)(t.Fragment, {
              children: [
                (0, t.jsx)(y.K, {
                  variant: "secondary",
                  size: 32,
                  isFullWidth: !0,
                  isDisabled: e,
                  className: X,
                  iconStart: (0, t.jsx)(f.YC, { className: "size-3.5" }),
                  onClick: J,
                  "data-testid": "limit-orders-add-button",
                  children: q("coin_details.position_add_limit_orders"),
                }),
                Y,
              ],
            })),
          (A[31] = X),
          (A[32] = Y),
          (A[33] = J),
          (A[34] = q),
          (A[35] = O))
        : (O = A[35]);
      let ee = O;
      if (Z.isError) {
        let e, i, n, r, s;
        return (
          A[36] !== q
            ? ((e = q("web.coin.limit_orders_check_failed")),
              (A[36] = q),
              (A[37] = e))
            : (e = A[37]),
          A[38] !== Z
            ? ((i = () => void Z.refetch()), (A[38] = Z), (A[39] = i))
            : (i = A[39]),
          A[40] !== q
            ? ((n = q("common.retry")), (A[40] = q), (A[41] = n))
            : (n = A[41]),
          A[42] !== i || A[43] !== n
            ? ((r = (0, t.jsx)("button", {
                type: "button",
                className:
                  "underline underline-offset-2 hover:text-text-secondary",
                onClick: i,
                children: n,
              })),
              (A[42] = i),
              (A[43] = n),
              (A[44] = r))
            : (r = A[44]),
          A[45] !== I || A[46] !== e || A[47] !== r
            ? ((s = (0, t.jsxs)(b.l, {
                className: I,
                "data-testid": "limit-orders-entry-note",
                children: [e, r],
              })),
              (A[45] = I),
              (A[46] = e),
              (A[47] = r),
              (A[48] = s))
            : (s = A[48]),
          s
        );
      }
      let et = Z.data;
      if (void 0 === et) {
        let e;
        return (
          A[49] !== ee
            ? ((e = ee(!0)), (A[49] = ee), (A[50] = e))
            : (e = A[50]),
          e
        );
      }
      if (!et.eligible) {
        let e,
          i,
          n,
          r = et.reasons ?? [];
        return (
          A[51] !== r
            ? ((e = r.includes("quote_currency")
                ? "web.coin.limit_orders_unavailable_quote_currency"
                : "web.coin.limit_orders_unavailable_for_coin"),
              (A[51] = r),
              (A[52] = e))
            : (e = A[52]),
          A[53] !== q || A[54] !== e
            ? ((i = q(e)), (A[53] = q), (A[54] = e), (A[55] = i))
            : (i = A[55]),
          A[56] !== I || A[57] !== i
            ? ((n = (0, t.jsx)(b.l, {
                className: I,
                "data-testid": "limit-orders-entry-note",
                children: i,
              })),
              (A[56] = I),
              (A[57] = i),
              (A[58] = n))
            : (n = A[58]),
          n
        );
      }
      if (null === K) {
        let e;
        return (
          A[59] !== ee
            ? ((e = ee(!0)), (A[59] = ee), (A[60] = e))
            : (e = A[60]),
          e
        );
      }
      if (K < N.m) {
        let e, i;
        return (
          A[61] !== q
            ? ((e = q("coin_details.position_tp_sl_min_position_required", {
                min_amount: `$${N.m}`,
              })),
              (A[61] = q),
              (A[62] = e))
            : (e = A[62]),
          A[63] !== I || A[64] !== e
            ? ((i = (0, t.jsx)(b.l, {
                className: I,
                "data-testid": "limit-orders-entry-note",
                children: e,
              })),
              (A[63] = I),
              (A[64] = e),
              (A[65] = i))
            : (i = A[65]),
          i
        );
      }
      return (
        A[66] !== ee ? ((E = ee(!1)), (A[66] = ee), (A[67] = E)) : (E = A[67]),
        E
      );
    };
  var E = e.i(815908),
    A = e.i(999139),
    C = e.i(365089),
    M = e.i(741084),
    K = e.i(860787),
    I = e.i(256272),
    q = e.i(434644),
    F = e.i(787639),
    B = e.i(662093),
    R = e.i(361284),
    $ = e.i(205761),
    z = e.i(465085),
    D = e.i(216934);
  let G = (e) => {
    let n,
      r,
      s,
      l,
      a,
      o,
      c,
      d,
      u,
      m,
      p,
      f,
      y,
      h,
      g,
      _,
      x,
      b,
      v,
      U,
      w,
      P,
      j,
      S,
      k,
      N = (0, i.c)(71),
      {
        series: L,
        currentPnl: T,
        trend: O,
        width: E,
        height: A,
        className: C,
        ariaLabel: M,
      } = e,
      K = void 0 === E ? 280 : E,
      I = void 0 === A ? 56 : A,
      q = void 0 === M ? "Recent profit and loss" : M;
    if (N[0] !== T || N[1] !== I || N[2] !== L || N[3] !== O || N[4] !== K) {
      let e, t, i, m, p, f;
      e: {
        if (0 === L.length) {
          e = [T, T];
          break e;
        }
        let t = L[L.length - 1];
        if (!t || t.pnl === T) {
          e = 1 === L.length ? [L[0].pnl, L[0].pnl] : L.map(Q);
          break e;
        }
        e = [...L.map(W), T];
      }
      let y = e,
        h = Math.min(...y),
        g = Math.max(...y);
      if (((s = h < 0 && g > 0), N[14] !== s || N[15] !== g || N[16] !== h)) {
        if (
          ((i = s ? Math.min(h, 0) : h),
          (t = s ? Math.max(g, 0) : g) - i < 1e-6)
        ) {
          let e;
          N[19] !== t
            ? ((e = Math.abs(t) || 1), (N[19] = t), (N[20] = e))
            : (e = N[20]);
          let n = Math.max(0.01 * e, 1);
          ((i = t - n), (t += n));
        } else {
          let e = (t - i) * 0.15;
          ((i -= e), (t += e));
        }
        ((N[14] = s), (N[15] = g), (N[16] = h), (N[17] = t), (N[18] = i));
      } else ((t = N[17]), (i = N[18]));
      let _ = t - i,
        x = I - 8,
        b = y.length > 1 ? K / (y.length - 1) : K;
      (N[21] !== x || N[22] !== i || N[23] !== _
        ? ((m = (e) => 4 + (1 - (e - i) / _) * x),
          (N[21] = x),
          (N[22] = i),
          (N[23] = _),
          (N[24] = m))
        : (m = N[24]),
        (u = m),
        N[25] !== b || N[26] !== u
          ? ((p = (e, t) => `${0 === t ? "M" : "L"} ${t * b} ${u(e)}`),
            (N[25] = b),
            (N[26] = u),
            (N[27] = p))
          : (p = N[27]),
        (o = y.map(p).join(" ")),
        (n = `${o} L ${(y.length - 1) * b} ${I} L 0 ${I} Z`));
      let v = y[y.length - 1] ?? 0,
        U = y[y.length - 2] ?? v,
        w = v > U ? "up" : v < U ? "down" : O;
      ((r = "flat" !== w ? w : v > 0 ? "up" : v < 0 ? "down" : "flat"),
        N[28] === Symbol.for("react.memo_cache_sentinel")
          ? ((f = (0, D.f)()), (N[28] = f))
          : (f = N[28]));
      let P = f;
      ((c = "up" === r ? P.positive : "down" === r ? P.negative : P.neutral),
        (l = `pnl-sparkline-fill-${r}`),
        (a = (y.length - 1) * b),
        (d = u(v)),
        (N[0] = T),
        (N[1] = I),
        (N[2] = L),
        (N[3] = O),
        (N[4] = K),
        (N[5] = n),
        (N[6] = r),
        (N[7] = s),
        (N[8] = l),
        (N[9] = a),
        (N[10] = o),
        (N[11] = c),
        (N[12] = d),
        (N[13] = u));
    } else
      ((n = N[5]),
        (r = N[6]),
        (s = N[7]),
        (l = N[8]),
        (a = N[9]),
        (o = N[10]),
        (c = N[11]),
        (d = N[12]),
        (u = N[13]));
    let F = d,
      B = u(0),
      R = s,
      $ = `0 0 ${K} ${I}`;
    (N[29] !== I
      ? ((m = { width: "100%", height: I, display: "block" }),
        (N[29] = I),
        (N[30] = m))
      : (m = N[30]),
      N[31] !== c
        ? ((p = (0, t.jsx)("stop", {
            offset: "0%",
            stopColor: c,
            stopOpacity: "0.32",
          })),
          (f = (0, t.jsx)("stop", {
            offset: "100%",
            stopColor: c,
            stopOpacity: "0",
          })),
          (N[31] = c),
          (N[32] = p),
          (N[33] = f))
        : ((p = N[32]), (f = N[33])),
      N[34] !== l || N[35] !== p || N[36] !== f
        ? ((y = (0, t.jsx)("defs", {
            children: (0, t.jsxs)("linearGradient", {
              id: l,
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [p, f],
            }),
          })),
          (N[34] = l),
          (N[35] = p),
          (N[36] = f),
          (N[37] = y))
        : (y = N[37]),
      N[38] !== R || N[39] !== K || N[40] !== B
        ? ((h =
            R &&
            (0, t.jsx)("line", {
              x1: 0,
              x2: K,
              y1: B,
              y2: B,
              className: "stroke-border-tertiary",
              strokeDasharray: "3 4",
              strokeWidth: 1,
            })),
          (N[38] = R),
          (N[39] = K),
          (N[40] = B),
          (N[41] = h))
        : (h = N[41]));
    let G = `url(#${l})`;
    return (
      N[42] === Symbol.for("react.memo_cache_sentinel")
        ? ((g = { opacity: 0 }),
          (_ = { opacity: 1 }),
          (x = { duration: 0.6, ease: "easeOut" }),
          (N[42] = g),
          (N[43] = _),
          (N[44] = x))
        : ((g = N[42]), (_ = N[43]), (x = N[44])),
      N[45] !== n || N[46] !== G
        ? ((b = (0, t.jsx)(z.f.path, {
            d: n,
            fill: G,
            initial: g,
            animate: _,
            transition: x,
          })),
          (N[45] = n),
          (N[46] = G),
          (N[47] = b))
        : (b = N[47]),
      N[48] === Symbol.for("react.memo_cache_sentinel")
        ? ((v = { pathLength: 1, opacity: 1 }), (N[48] = v))
        : (v = N[48]),
      N[49] !== r || N[50] !== o || N[51] !== c
        ? ((U = (0, t.jsx)(
            z.f.path,
            {
              d: o,
              fill: "none",
              stroke: c,
              strokeWidth: 1.75,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              initial: !1,
              animate: v,
            },
            r,
          )),
          (N[49] = r),
          (N[50] = o),
          (N[51] = c),
          (N[52] = U))
        : (U = N[52]),
      N[53] === Symbol.for("react.memo_cache_sentinel")
        ? ((w = { r: [4, 9, 4], opacity: [0.35, 0, 0.35] }),
          (P = { duration: 1.6, repeat: 1 / 0, ease: "easeOut" }),
          (N[53] = w),
          (N[54] = P))
        : ((w = N[53]), (P = N[54])),
      N[55] !== a || N[56] !== F || N[57] !== c
        ? ((j = (0, t.jsx)(z.f.circle, {
            cx: a,
            cy: F,
            r: 6,
            fill: c,
            opacity: 0.18,
            animate: w,
            transition: P,
          })),
          (S = (0, t.jsx)("circle", { cx: a, cy: F, r: 2.5, fill: c })),
          (N[55] = a),
          (N[56] = F),
          (N[57] = c),
          (N[58] = j),
          (N[59] = S))
        : ((j = N[58]), (S = N[59])),
      N[60] !== q ||
      N[61] !== C ||
      N[62] !== h ||
      N[63] !== b ||
      N[64] !== U ||
      N[65] !== j ||
      N[66] !== S ||
      N[67] !== $ ||
      N[68] !== m ||
      N[69] !== y
        ? ((k = (0, t.jsxs)("svg", {
            role: "img",
            "aria-label": q,
            viewBox: $,
            preserveAspectRatio: "none",
            className: C,
            style: m,
            children: [y, h, b, U, j, S],
          })),
          (N[60] = q),
          (N[61] = C),
          (N[62] = h),
          (N[63] = b),
          (N[64] = U),
          (N[65] = j),
          (N[66] = S),
          (N[67] = $),
          (N[68] = m),
          (N[69] = y),
          (N[70] = k))
        : (k = N[70]),
      k
    );
  };
  function Q(e) {
    return e.pnl;
  }
  function W(e) {
    return e.pnl;
  }
  var H = e.i(649425);
  e.i(84455);
  var V = e.i(242917),
    Z = e.i(392968);
  e.i(267146);
  var J = e.i(540805);
  let X = (e) => {
      let n,
        r,
        s = (0, i.c)(3),
        { children: l } = e;
      return (
        s[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, h.c)("text-[11px] font-normal", "text-text-tertiary")),
            (s[0] = n))
          : (n = s[0]),
        s[1] !== l
          ? ((r = (0, t.jsx)("span", { className: n, children: l })),
            (s[1] = l),
            (s[2] = r))
          : (r = s[2]),
        r
      );
    },
    Y = (e) => {
      let n,
        r,
        s,
        l,
        a,
        o,
        c = (0, i.c)(10),
        { trend: d, pctChange: u, compact: m } = e,
        p = `chip-${d}`;
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = { opacity: 0, y: 4 }),
          (r = { opacity: 1, y: 0 }),
          (s = { opacity: 0, y: -4 }),
          (l = { duration: 0.25 }),
          (c[0] = n),
          (c[1] = r),
          (c[2] = s),
          (c[3] = l))
        : ((n = c[0]), (r = c[1]), (s = c[2]), (l = c[3]));
      let f = m ? "text-[11px]" : void 0;
      return (
        c[4] !== u || c[5] !== f
          ? ((a = (0, t.jsx)(Z.f, {
              changePercent: u,
              isPnl: !0,
              signed: !0,
              className: f,
            })),
            (c[4] = u),
            (c[5] = f),
            (c[6] = a))
          : (a = c[6]),
        c[7] !== p || c[8] !== a
          ? ((o = (0, t.jsx)(
              z.f.div,
              {
                initial: n,
                animate: r,
                exit: s,
                transition: l,
                className: "flex shrink-0",
                children: a,
              },
              p,
            )),
            (c[7] = p),
            (c[8] = a),
            (c[9] = o))
          : (o = c[9]),
        o
      );
    },
    ee = (e) => {
      let n,
        r,
        s,
        l,
        a,
        o,
        c,
        d,
        m,
        p,
        f,
        y,
        g,
        _,
        x,
        b,
        v,
        U,
        w,
        P,
        j,
        S,
        k,
        N,
        O,
        E,
        A,
        C,
        M,
        K,
        I,
        q,
        F,
        B,
        R,
        D,
        Q = (0, i.c)(120),
        {
          coin: W,
          tokenBalance: Z,
          trend: ee,
          pulseDirection: ei,
          pulseKey: en,
          hasLiveTick: er,
          usdPnl: es,
          pctChange: el,
          pnlSeries: ea,
          positionUsd: eo,
          mobileTradeSheetOpen: ec,
          mobileTradeSheetHeight: ed,
        } = e,
        { t: eu } = (0, u.f)();
      if (
        Q[0] !== er ||
        Q[1] !== ed ||
        Q[2] !== ec ||
        Q[3] !== ei ||
        Q[4] !== en ||
        Q[5] !== eu ||
        Q[6] !== ee
      ) {
        let e,
          i,
          u,
          j,
          S,
          k =
            "up" === ee
              ? V.f.gain
              : "down" === ee
                ? V.f.loss
                : "text-text-primary";
        (Q[27] !== ed || Q[28] !== ec
          ? ((e = (({ mobileTradeSheetOpen: e, mobileTradeSheetHeight: t }) =>
              e
                ? !t || t <= 0
                  ? { className: "bottom-[calc(40vh+0.75rem)]" }
                  : {
                      className: "",
                      style: { bottom: `calc(${t}px + 0.75rem)` },
                    }
                : { className: "bottom-[calc(48px+5.875rem)]" })({
              mobileTradeSheetOpen: ec,
              mobileTradeSheetHeight: ed,
            })),
            (r = z.f.div),
            (c = "mobile-live-pnl-strip"),
            (d = (0, h.c)(
              "pointer-events-none fixed inset-x-3 z-[55] transition-[bottom,transform,opacity] duration-300 ease-out lg:hidden",
              e.className,
            )),
            (Q[27] = ed),
            (Q[28] = ec),
            (Q[29] = r),
            (Q[30] = e),
            (Q[31] = c),
            (Q[32] = d))
          : ((r = Q[29]), (e = Q[30]), (c = Q[31]), (d = Q[32])),
          (m = e.style),
          Q[33] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = { opacity: 0, y: 12, scale: 0.98 }),
              (f = { opacity: 1, y: 0, scale: 1 }),
              (y = { duration: 0.22, ease: "easeOut" }),
              (l = (0, h.c)(
                "relative overflow-hidden rounded-xl border border-border-tertiary bg-bg-secondary/90 px-3 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl",
              )),
              (Q[33] = l),
              (Q[34] = p),
              (Q[35] = f),
              (Q[36] = y))
            : ((l = Q[33]), (p = Q[34]), (f = Q[35]), (y = Q[36])));
        let N =
          "up" === ee
            ? "linear-gradient(135deg, rgb(var(--gain) / 0.16), rgb(var(--gain) / 0) 46%)"
            : "down" === ee
              ? "linear-gradient(135deg, rgb(var(--loss) / 0.16), rgb(var(--loss) / 0) 46%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0) 46%)";
        (Q[37] !== N
          ? ((a = (0, t.jsx)("div", {
              "aria-hidden": !0,
              className: "pointer-events-none absolute inset-0",
              style: { background: N },
            })),
            (Q[37] = N),
            (Q[38] = a))
          : (a = Q[38]),
          Q[39] !== ei || Q[40] !== en
            ? ((i =
                ei &&
                (0, t.jsx)(
                  z.f.div,
                  {
                    "aria-hidden": !0,
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.35 },
                    className:
                      "pointer-events-none absolute inset-0 rounded-xl",
                    style: {
                      boxShadow:
                        "up" === ei
                          ? "inset 0 0 0 1px rgb(var(--gain) / 0.42)"
                          : "inset 0 0 0 1px rgb(var(--loss) / 0.42)",
                    },
                  },
                  `mobile-pulse-${en ?? 0}`,
                )),
              (Q[39] = ei),
              (Q[40] = en),
              (Q[41] = i))
            : (i = Q[41]),
          Q[42] !== i
            ? ((o = (0, t.jsx)($.f, { children: i })), (Q[42] = i), (Q[43] = o))
            : (o = Q[43]),
          (P = "relative flex items-center justify-between gap-3"),
          (U = "min-w-0"),
          Q[44] !== eu
            ? ((u = eu("web.coin.live_pnl")), (Q[44] = eu), (Q[45] = u))
            : (u = Q[45]),
          Q[46] !== u
            ? ((j = (0, t.jsx)(X, { children: u })), (Q[46] = u), (Q[47] = j))
            : (j = Q[47]),
          Q[48] !== er
            ? ((S = (0, t.jsx)(et, { active: er })), (Q[48] = er), (Q[49] = S))
            : (S = Q[49]),
          Q[50] !== j || Q[51] !== S
            ? ((w = (0, t.jsxs)("div", {
                className: "flex items-center gap-1.5",
                children: [j, S],
              })),
              (Q[50] = j),
              (Q[51] = S),
              (Q[52] = w))
            : (w = Q[52]),
          (v = "mt-1 flex min-w-0 items-center gap-2"),
          (n = z.f.span),
          (s = `mobile-pnl-${ee}`),
          Q[53] === Symbol.for("react.memo_cache_sentinel")
            ? ((g = { scale: 1 }), (Q[53] = g))
            : (g = Q[53]),
          Q[54] !== ei
            ? ((_ = ei ? { scale: [1, 1.035, 1] } : { scale: 1 }),
              (Q[54] = ei),
              (Q[55] = _))
            : (_ = Q[55]),
          Q[56] === Symbol.for("react.memo_cache_sentinel")
            ? ((x = { duration: 0.45, ease: "easeOut" }), (Q[56] = x))
            : (x = Q[56]),
          (b = (0, h.c)(
            "min-w-0 truncate font-inter text-[22px] font-semibold leading-none tabular-nums",
            k,
          )),
          (Q[0] = er),
          (Q[1] = ed),
          (Q[2] = ec),
          (Q[3] = ei),
          (Q[4] = en),
          (Q[5] = eu),
          (Q[6] = ee),
          (Q[7] = n),
          (Q[8] = r),
          (Q[9] = s),
          (Q[10] = l),
          (Q[11] = a),
          (Q[12] = o),
          (Q[13] = c),
          (Q[14] = d),
          (Q[15] = m),
          (Q[16] = p),
          (Q[17] = f),
          (Q[18] = y),
          (Q[19] = g),
          (Q[20] = _),
          (Q[21] = x),
          (Q[22] = b),
          (Q[23] = v),
          (Q[24] = U),
          (Q[25] = w),
          (Q[26] = P));
      } else
        ((n = Q[7]),
          (r = Q[8]),
          (s = Q[9]),
          (l = Q[10]),
          (a = Q[11]),
          (o = Q[12]),
          (c = Q[13]),
          (d = Q[14]),
          (m = Q[15]),
          (p = Q[16]),
          (f = Q[17]),
          (y = Q[18]),
          (g = Q[19]),
          (_ = Q[20]),
          (x = Q[21]),
          (b = Q[22]),
          (v = Q[23]),
          (U = Q[24]),
          (w = Q[25]),
          (P = Q[26]));
      (Q[57] !== es
        ? ((j = null != es ? (0, t.jsx)(H.f, { value: es, format: J.u }) : "—"),
          (Q[57] = es),
          (Q[58] = j))
        : (j = Q[58]),
        Q[59] !== n ||
        Q[60] !== s ||
        Q[61] !== j ||
        Q[62] !== g ||
        Q[63] !== _ ||
        Q[64] !== x ||
        Q[65] !== b
          ? ((S = (0, t.jsx)(
              n,
              {
                initial: g,
                animate: _,
                transition: x,
                className: b,
                children: j,
              },
              s,
            )),
            (Q[59] = n),
            (Q[60] = s),
            (Q[61] = j),
            (Q[62] = g),
            (Q[63] = _),
            (Q[64] = x),
            (Q[65] = b),
            (Q[66] = S))
          : (S = Q[66]),
        Q[67] !== el || Q[68] !== ee || Q[69] !== es
          ? ((k =
              null != es && null != el
                ? (0, t.jsx)(Y, { trend: ee, pctChange: el, compact: !0 })
                : null),
            (Q[67] = el),
            (Q[68] = ee),
            (Q[69] = es),
            (Q[70] = k))
          : (k = Q[70]),
        Q[71] !== S || Q[72] !== k || Q[73] !== v
          ? ((N = (0, t.jsxs)("div", { className: v, children: [S, k] })),
            (Q[71] = S),
            (Q[72] = k),
            (Q[73] = v),
            (Q[74] = N))
          : (N = Q[74]),
        Q[75] !== N || Q[76] !== U || Q[77] !== w
          ? ((O = (0, t.jsxs)("div", { className: U, children: [w, N] })),
            (Q[75] = N),
            (Q[76] = U),
            (Q[77] = w),
            (Q[78] = O))
          : (O = Q[78]));
      let em = es ?? 0;
      (Q[79] !== eu
        ? ((E = eu("web.coin.live_pnl_sparkline")), (Q[79] = eu), (Q[80] = E))
        : (E = Q[80]),
        Q[81] !== ea || Q[82] !== em || Q[83] !== E || Q[84] !== ee
          ? ((A = (0, t.jsx)("div", {
              className: "h-12 w-28 shrink-0",
              children: (0, t.jsx)(G, {
                series: ea,
                currentPnl: em,
                trend: ee,
                height: 48,
                ariaLabel: E,
              }),
            })),
            (Q[81] = ea),
            (Q[82] = em),
            (Q[83] = E),
            (Q[84] = ee),
            (Q[85] = A))
          : (A = Q[85]),
        Q[86] !== O || Q[87] !== A || Q[88] !== P
          ? ((C = (0, t.jsxs)("div", { className: P, children: [O, A] })),
            (Q[86] = O),
            (Q[87] = A),
            (Q[88] = P),
            (Q[89] = C))
          : (C = Q[89]),
        Q[90] !== eo
          ? ((M = null != eo ? (0, L.w)(eo) : "—"), (Q[90] = eo), (Q[91] = M))
          : (M = Q[91]),
        Q[92] !== M
          ? ((K = (0, t.jsx)("span", {
              className:
                "shrink-0 font-medium tabular-nums text-text-secondary",
              children: M,
            })),
            (Q[92] = M),
            (Q[93] = K))
          : (K = Q[93]),
        Q[94] === Symbol.for("react.memo_cache_sentinel")
          ? ((I = (0, t.jsx)("span", { children: "position" })), (Q[94] = I))
          : (I = Q[94]),
        Q[95] !== W || Q[96] !== Z
          ? ((q =
              null != Z
                ? (0, t.jsxs)(t.Fragment, {
                    children: [
                      (0, t.jsx)("span", {
                        className: "text-text-quaternary",
                        children: "·",
                      }),
                      (0, t.jsxs)("span", {
                        className: "truncate",
                        children: [(0, L.p)(Z), " ", W.symbol || "tokens"],
                      }),
                    ],
                  })
                : null),
            (Q[95] = W),
            (Q[96] = Z),
            (Q[97] = q))
          : (q = Q[97]),
        Q[98] !== K || Q[99] !== q
          ? ((F = (0, t.jsxs)("div", {
              className:
                "relative mt-1.5 flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
              children: [K, I, q],
            })),
            (Q[98] = K),
            (Q[99] = q),
            (Q[100] = F))
          : (F = Q[100]));
      let ep = null != eo && eo > 0 ? eo : null;
      return (
        Q[101] !== W || Q[102] !== ep
          ? ((B = (0, t.jsx)("div", {
              className: "pointer-events-auto relative mt-2",
              children: (0, t.jsx)(T, {
                coin: W,
                hasPosition: !0,
                positionUsd: ep,
              }),
            })),
            (Q[101] = W),
            (Q[102] = ep),
            (Q[103] = B))
          : (B = Q[103]),
        Q[104] !== l ||
        Q[105] !== a ||
        Q[106] !== o ||
        Q[107] !== C ||
        Q[108] !== F ||
        Q[109] !== B
          ? ((R = (0, t.jsxs)("div", {
              className: l,
              children: [a, o, C, F, B],
            })),
            (Q[104] = l),
            (Q[105] = a),
            (Q[106] = o),
            (Q[107] = C),
            (Q[108] = F),
            (Q[109] = B),
            (Q[110] = R))
          : (R = Q[110]),
        Q[111] !== r ||
        Q[112] !== c ||
        Q[113] !== d ||
        Q[114] !== m ||
        Q[115] !== p ||
        Q[116] !== f ||
        Q[117] !== y ||
        Q[118] !== R
          ? ((D = (0, t.jsx)(r, {
              "data-testid": c,
              className: d,
              style: m,
              initial: p,
              animate: f,
              transition: y,
              children: R,
            })),
            (Q[111] = r),
            (Q[112] = c),
            (Q[113] = d),
            (Q[114] = m),
            (Q[115] = p),
            (Q[116] = f),
            (Q[117] = y),
            (Q[118] = R),
            (Q[119] = D))
          : (D = Q[119]),
        D
      );
    },
    et = (e) => {
      let n,
        r,
        s,
        l,
        a = (0, i.c)(9),
        { active: o } = e,
        c = o ? "bg-gain" : "bg-text-tertiary";
      return (
        a[0] !== c
          ? ((n = (0, h.c)(
              "absolute inline-flex h-full w-full rounded-full",
              c,
            )),
            (a[0] = c),
            (a[1] = n))
          : (n = a[1]),
        a[2] !== n
          ? ((r = (0, t.jsx)("span", { className: n })), (a[2] = n), (a[3] = r))
          : (r = a[3]),
        a[4] !== o
          ? ((s =
              o &&
              (0, t.jsx)("span", {
                className:
                  "absolute inline-flex h-full w-full animate-ping rounded-full bg-gain/50",
              })),
            (a[4] = o),
            (a[5] = s))
          : (s = a[5]),
        a[6] !== r || a[7] !== s
          ? ((l = (0, t.jsxs)("span", {
              className:
                "relative inline-flex h-1.5 w-1.5 items-center justify-center",
              children: [r, s],
            })),
            (a[6] = r),
            (a[7] = s),
            (a[8] = l))
          : (l = a[8]),
        l
      );
    },
    ei = { mine: c.k9.POSITIONS_CARD_MINE, other: c.k9.POSITIONS_CARD_OTHER },
    en = (e) => ({
      key: e,
      points: [],
      lastNet: null,
      seq: 0,
      pulseDirection: null,
      pulseKey: 0,
    }),
    er = (e, t) =>
      null != e && e > 0 && Number.isFinite(t) && t > 0 ? e * t : null,
    es = (e) => {
      let n,
        r = (0, i.c)(11),
        {
          coin: s,
          pnlUsd: l,
          pnlPct: a,
          investedUsd: o,
          avgEntryMcapUsd: c,
          isClosed: d,
          holder: u,
        } = e,
        m = s.name ?? null,
        p = s.symbol ?? null,
        f = s.image_uri ?? null;
      return (
        r[0] !== c ||
        r[1] !== s ||
        r[2] !== u ||
        r[3] !== o ||
        r[4] !== d ||
        r[5] !== a ||
        r[6] !== l ||
        r[7] !== m ||
        r[8] !== p ||
        r[9] !== f
          ? ((n = (0, t.jsx)(A.f, {
              className: E.a,
              sourceElement: ei,
              data: {
                mint: s.mint,
                chainId: s.chain_id,
                coin: s,
                coinName: m,
                coinSymbol: p,
                coinImageUri: f,
                pnlUsd: l,
                pnlPct: a,
                investedUsd: o,
                avgEntryMcapUsd: c,
                isClosed: d,
                holder: u,
              },
            })),
            (r[0] = c),
            (r[1] = s),
            (r[2] = u),
            (r[3] = o),
            (r[4] = d),
            (r[5] = a),
            (r[6] = l),
            (r[7] = m),
            (r[8] = p),
            (r[9] = f),
            (r[10] = n))
          : (n = r[10]),
        n
      );
    },
    el = (e) => {
      let r,
        s,
        l,
        a,
        o,
        c,
        f,
        y,
        h,
        g,
        _,
        x,
        b,
        v,
        U,
        w = (0, i.c)(90),
        {
          coin: P,
          view: j,
          refresh: S,
          seriesKey: k,
          mobileTradeSheetOpen: N,
          mobileTradeSheetHeight: L,
        } = e,
        { t: O } = (0, u.f)(),
        A = "panel" === (0, I.u)(),
        $ = (0, B.b)(P),
        z = (0, q.f)(P),
        D = (function () {
          let e,
            t,
            r,
            s = (0, i.c)(9),
            { address: l, user: a } = (0, n.F)();
          return l
            ? (s[0] !== l || s[1] !== a?.username
                ? ((e = a?.username?.trim() || (0, C.d)(l, 4, 4)),
                  (s[0] = l),
                  (s[1] = a?.username),
                  (s[2] = e))
                : (e = s[2]),
              s[3] !== a?.profile_image
                ? ((t =
                    (0, K.Z)({
                      sourceUrl: (0, M.f)(a?.profile_image),
                      width: K.z.list,
                    }) ?? null),
                  (s[3] = a?.profile_image),
                  (s[4] = t))
                : (t = s[4]),
              s[5] !== l || s[6] !== e || s[7] !== t
                ? ((r = { address: l, displayName: e, avatarUrl: t }),
                  (s[5] = l),
                  (s[6] = e),
                  (s[7] = t),
                  (s[8] = r))
                : (r = s[8]),
              r)
            : null;
        })(),
        G = "open" === j.kind ? j.netPnlUsd : null,
        Q = "open" === j.kind ? (k ?? P.mint) : null;
      w[0] !== Q ? ((r = () => en(Q)), (w[0] = Q), (w[1] = r)) : (r = w[1]);
      let [W, H] = (0, d.useState)(r);
      if (W.key !== Q) H(en(Q));
      else {
        let e, t;
        null != G &&
          G !== W.lastNet &&
          H(
            ((e = W.seq + 1),
            (t = null == W.lastNet ? null : G > W.lastNet ? "up" : "down"),
            {
              key: W.key,
              points: (0, m.f)(W.points, { pnl: G, t: e }),
              lastNet: G,
              seq: e,
              pulseDirection: t,
              pulseKey: null == t ? W.pulseKey : W.pulseKey + 1,
            }),
          );
      }
      let { pulseDirection: V, pulseKey: Z } = W;
      if (
        (w[2] !== V || w[3] !== Z
          ? ((s = () => {
              if (null == V) return;
              let e = setTimeout(() => {
                H((e) =>
                  e.pulseKey === Z && null != e.pulseDirection
                    ? { ...e, pulseDirection: null }
                    : e,
                );
              }, 700);
              return () => clearTimeout(e);
            }),
            (l = [V, Z]),
            (w[2] = V),
            (w[3] = Z),
            (w[4] = s),
            (w[5] = l))
          : ((s = w[4]), (l = w[5])),
        (0, d.useEffect)(s, l),
        "unresolved" === j.kind || "none" === j.kind)
      )
        return null;
      if ("closed" === j.kind) {
        let e,
          i,
          n,
          r,
          s,
          l,
          a = !j.settling && null != j.realizedUsd,
          o = j.settling
            ? (j.realizedUsd ?? j.lastKnownNetPnlUsd ?? null)
            : j.realizedUsd;
        w[6] !== $ || w[7] !== j.avgEntryPriceUsd
          ? ((e = er(j.avgEntryPriceUsd, $)),
            (w[6] = $),
            (w[7] = j.avgEntryPriceUsd),
            (w[8] = e))
          : (e = w[8]);
        let c = e;
        w[9] !== a || w[10] !== j.pct
          ? ((i = a && null != j.pct ? (0, R.f)(j.pct) : null),
            (w[9] = a),
            (w[10] = j.pct),
            (w[11] = i))
          : (i = w[11]);
        let d = j.settling ? S : void 0;
        return (
          w[12] !== c ||
          w[13] !== P ||
          w[14] !== a ||
          w[15] !== D ||
          w[16] !== j.pct ||
          w[17] !== j.realizedUsd ||
          w[18] !== j.spentUsd
            ? ((n =
                a && null != j.realizedUsd && null != j.spentUsd && D
                  ? (0, t.jsx)(es, {
                      coin: P,
                      pnlUsd: j.realizedUsd,
                      pnlPct: j.pct,
                      investedUsd: j.spentUsd,
                      avgEntryMcapUsd: c,
                      isClosed: !0,
                      holder: D,
                    })
                  : null),
              (w[12] = c),
              (w[13] = P),
              (w[14] = a),
              (w[15] = D),
              (w[16] = j.pct),
              (w[17] = j.realizedUsd),
              (w[18] = j.spentUsd),
              (w[19] = n))
            : (n = w[19]),
          w[20] !== c ||
          w[21] !== A ||
          w[22] !== o ||
          w[23] !== i ||
          w[24] !== d ||
          w[25] !== n ||
          w[26] !== j.spentUsd
            ? ((r = (0, t.jsx)(E.O, {
                flat: A,
                positionUsd: null,
                netPnlUsd: o,
                displayPct: i,
                spentUsd: j.spentUsd,
                avgEntryMcapUsd: c,
                isClosed: !0,
                refresh: d,
                headerAction: n,
              })),
              (w[20] = c),
              (w[21] = A),
              (w[22] = o),
              (w[23] = i),
              (w[24] = d),
              (w[25] = n),
              (w[26] = j.spentUsd),
              (w[27] = r))
            : (r = w[27]),
          w[28] !== P
            ? ((s = (0, t.jsx)(T, {
                coin: P,
                hasPosition: !1,
                positionUsd: null,
              })),
              (w[28] = P),
              (w[29] = s))
            : (s = w[29]),
          w[30] !== r || w[31] !== s
            ? ((l = (0, t.jsxs)(t.Fragment, { children: [r, s] })),
              (w[30] = r),
              (w[31] = s),
              (w[32] = l))
            : (l = w[32]),
          l
        );
      }
      w[33] !== $ || w[34] !== j.avgEntryPriceUsd
        ? ((a = er(j.avgEntryPriceUsd, $)),
          (w[33] = $),
          (w[34] = j.avgEntryPriceUsd),
          (w[35] = a))
        : (a = w[35]);
      let J = a;
      w[36] !== j.pct
        ? ((o = null == j.pct ? null : (0, R.f)(j.pct)),
          (w[36] = j.pct),
          (w[37] = o))
        : (o = w[37]);
      let X = o,
        Y = null != j.valueUsd && j.valueUsd > 0 ? j.valueUsd : null,
        et = j.valueUsd,
        ei = j.tokens,
        el = j.netPnlUsd,
        ea = j.spentUsd;
      (w[38] !== z || w[39] !== j.tokens
        ? ((c = (0, F.f)(j.tokens, z)),
          (w[38] = z),
          (w[39] = j.tokens),
          (w[40] = c))
        : (c = w[40]),
        w[41] !== J ||
        w[42] !== P ||
        w[43] !== D ||
        w[44] !== j.netPnlUsd ||
        w[45] !== j.pct ||
        w[46] !== j.spentUsd
          ? ((f =
              null != j.netPnlUsd && null != j.spentUsd && D
                ? (0, t.jsx)(es, {
                    coin: P,
                    pnlUsd: j.netPnlUsd,
                    pnlPct: j.pct,
                    investedUsd: j.spentUsd,
                    avgEntryMcapUsd: J,
                    isClosed: !1,
                    holder: D,
                  })
                : null),
            (w[41] = J),
            (w[42] = P),
            (w[43] = D),
            (w[44] = j.netPnlUsd),
            (w[45] = j.pct),
            (w[46] = j.spentUsd),
            (w[47] = f))
          : (f = w[47]),
        w[48] !== O || w[49] !== j.basisStatus
          ? ((y =
              "error" === j.basisStatus
                ? (0, t.jsx)("p", {
                    "data-testid": "position-chain-balance-note",
                    className: "text-xs text-text-tertiary",
                    children: O("web.coin.position_from_chain_note"),
                  })
                : void 0),
            (w[48] = O),
            (w[49] = j.basisStatus),
            (w[50] = y))
          : (y = w[50]),
        w[51] !== J ||
        w[52] !== X ||
        w[53] !== A ||
        w[54] !== S ||
        w[55] !== c ||
        w[56] !== f ||
        w[57] !== y ||
        w[58] !== j.netPnlUsd ||
        w[59] !== j.spentUsd ||
        w[60] !== j.tokens ||
        w[61] !== j.valueUsd
          ? ((h = (0, t.jsx)(E.O, {
              flat: A,
              positionUsd: et,
              positionTokenAmount: ei,
              netPnlUsd: el,
              displayPct: X,
              spentUsd: ea,
              avgEntryMcapUsd: J,
              supplyShare: c,
              refresh: S,
              headerAction: f,
              embeddedFooter: y,
            })),
            (w[51] = J),
            (w[52] = X),
            (w[53] = A),
            (w[54] = S),
            (w[55] = c),
            (w[56] = f),
            (w[57] = y),
            (w[58] = j.netPnlUsd),
            (w[59] = j.spentUsd),
            (w[60] = j.tokens),
            (w[61] = j.valueUsd),
            (w[62] = h))
          : (h = w[62]),
        w[63] !== P || w[64] !== Y
          ? ((g = (0, t.jsx)(T, { coin: P, hasPosition: !0, positionUsd: Y })),
            (w[63] = P),
            (w[64] = Y),
            (w[65] = g))
          : (g = w[65]),
        w[66] !== P
          ? ((_ = (0, t.jsx)(p.f, { coin: P })), (w[66] = P), (w[67] = _))
          : (_ = w[67]),
        w[68] !== h || w[69] !== g || w[70] !== _
          ? ((x = (0, t.jsxs)("div", {
              className: "hidden flex-col gap-3 lg:flex",
              children: [h, g, _],
            })),
            (w[68] = h),
            (w[69] = g),
            (w[70] = _),
            (w[71] = x))
          : (x = w[71]));
      let eo = j.tokens;
      if (w[72] !== j.netPnlUsd) {
        let e;
        ((b =
          null == (e = j.netPnlUsd) || 0 === e
            ? "flat"
            : e > 0
              ? "up"
              : "down"),
          (w[72] = j.netPnlUsd),
          (w[73] = b));
      } else b = w[73];
      return (
        w[74] !== P ||
        w[75] !== X ||
        w[76] !== L ||
        w[77] !== N ||
        w[78] !== V ||
        w[79] !== Z ||
        w[80] !== b ||
        w[81] !== W.points ||
        w[82] !== j.isLive ||
        w[83] !== j.netPnlUsd ||
        w[84] !== j.tokens ||
        w[85] !== j.valueUsd
          ? ((v = (0, t.jsx)(ee, {
              coin: P,
              tokenBalance: eo,
              trend: b,
              pulseDirection: V,
              pulseKey: Z,
              hasLiveTick: j.isLive,
              usdPnl: j.netPnlUsd,
              pctChange: X,
              pnlSeries: W.points,
              positionUsd: j.valueUsd,
              mobileTradeSheetOpen: N,
              mobileTradeSheetHeight: L,
            })),
            (w[74] = P),
            (w[75] = X),
            (w[76] = L),
            (w[77] = N),
            (w[78] = V),
            (w[79] = Z),
            (w[80] = b),
            (w[81] = W.points),
            (w[82] = j.isLive),
            (w[83] = j.netPnlUsd),
            (w[84] = j.tokens),
            (w[85] = j.valueUsd),
            (w[86] = v))
          : (v = w[86]),
        w[87] !== x || w[88] !== v
          ? ((U = (0, t.jsxs)(t.Fragment, { children: [x, v] })),
            (w[87] = x),
            (w[88] = v),
            (w[89] = U))
          : (U = w[89]),
        U
      );
    };
  var ea = e.i(882303);
  let eo = (e) => {
    let n,
      o,
      c,
      d,
      u,
      m = (0, i.c)(19),
      {
        coin: p,
        wallet: f,
        mobileTradeSheetOpen: y,
        mobileTradeSheetHeight: h,
      } = e,
      g = (0, r.useQueryClient)();
    m[0] !== p || m[1] !== f
      ? ((n = { coin: p, wallet: f }), (m[0] = p), (m[1] = f), (m[2] = n))
      : (n = m[2]);
    let { view: _, pollIntervalMs: x } = (0, ea.f)(n),
      b = "number" == typeof x ? x : s.z;
    (m[3] !== p.mint || m[4] !== g || m[5] !== f
      ? ((o = () => {
          g.invalidateQueries({ queryKey: a.V.token(f, p.mint) });
        }),
        (m[3] = p.mint),
        (m[4] = g),
        (m[5] = f),
        (m[6] = o))
      : (o = m[6]),
      m[7] !== b || m[8] !== o
        ? ((c = { intervalMs: b, onRefresh: o }),
          (m[7] = b),
          (m[8] = o),
          (m[9] = c))
        : (c = m[9]));
    let v = c;
    m[10] !== f ? ((d = (0, l.f)(f)), (m[10] = f), (m[11] = d)) : (d = m[11]);
    let U = `${d}:${p.mint}`;
    return (
      m[12] !== p ||
      m[13] !== h ||
      m[14] !== y ||
      m[15] !== v ||
      m[16] !== U ||
      m[17] !== _
        ? ((u = (0, t.jsx)(el, {
            coin: p,
            view: _,
            refresh: v,
            seriesKey: U,
            mobileTradeSheetOpen: y,
            mobileTradeSheetHeight: h,
          })),
          (m[12] = p),
          (m[13] = h),
          (m[14] = y),
          (m[15] = v),
          (m[16] = U),
          (m[17] = _),
          (m[18] = u))
        : (u = m[18]),
      u
    );
  };
  e.s(
    [
      "f",
      0,
      (e) => {
        let r,
          s,
          a = (0, i.c)(6),
          { address: c } = (0, n.F)();
        return (0, o.Y)(e.coin.mint)
          ? null
          : (a[0] !== c
              ? ((r = (0, l.f)(c)), (a[0] = c), (a[1] = r))
              : (r = a[1]),
            a[2] !== c || a[3] !== e || a[4] !== r
              ? ((s = (0, t.jsx)(eo, { wallet: c, ...e }, r)),
                (a[2] = c),
                (a[3] = e),
                (a[4] = r),
                (a[5] = s))
              : (s = a[5]),
            s);
      },
    ],
    442956,
  );
};
