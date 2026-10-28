// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018),
    n = e.i(205761),
    s = e.i(465085),
    r = e.i(983737),
    l = e.i(352386),
    o = e.i(34011);
  function d(e) {
    let n,
      r,
      l,
      d,
      u,
      m,
      f,
      p,
      b,
      x,
      y,
      h,
      g,
      _,
      v,
      j,
      w,
      k,
      N,
      S,
      U,
      P,
      F,
      C,
      I,
      q,
      $,
      T = (0, i.c)(47),
      { coin: A, reduceMotion: B } = e;
    (T[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((n = {
          background:
            "radial-gradient(circle, rgb(var(--gain) / 0.45) 0%, rgb(var(--gain) / 0) 70%)",
        }),
        (r = { scale: 0.3, opacity: 0 }),
        (T[0] = n),
        (T[1] = r))
      : ((n = T[0]), (r = T[1])),
      T[2] !== B
        ? ((l = B ? 1 : [0.3, 1.4, 1.1]), (T[2] = B), (T[3] = l))
        : (l = T[3]),
      T[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = [0, 0.9, 0]), (T[4] = d))
        : (d = T[4]),
      T[5] !== l
        ? ((u = { scale: l, opacity: d }), (T[5] = l), (T[6] = u))
        : (u = T[6]),
      T[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((m = { duration: 1.2, ease: "easeOut" }), (T[7] = m))
        : (m = T[7]),
      T[8] !== u
        ? ((f = (0, t.jsx)(s.f.div, {
            className:
              "absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full",
            style: n,
            initial: r,
            animate: u,
            transition: m,
          })),
          (T[8] = u),
          (T[9] = f))
        : (f = T[9]),
      T[10] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = { width: 48, height: 48, marginLeft: -24, marginTop: -24 }),
          (b = { scale: 0.6, opacity: 0.7 }),
          (T[10] = p),
          (T[11] = b))
        : ((p = T[10]), (b = T[11])));
    let O = B ? 1 : 3.6;
    return (
      T[12] !== O
        ? ((x = { scale: O, opacity: 0 }), (T[12] = O), (T[13] = x))
        : (x = T[13]),
      T[14] === Symbol.for("react.memo_cache_sentinel")
        ? ((y = { duration: 1, ease: [0.16, 1, 0.3, 1] }), (T[14] = y))
        : (y = T[14]),
      T[15] !== x
        ? ((h = (0, t.jsx)(s.f.div, {
            className:
              "absolute left-1/2 top-1/2 rounded-full border-2 border-gain",
            style: p,
            initial: b,
            animate: x,
            transition: y,
          })),
          (T[15] = x),
          (T[16] = h))
        : (h = T[16]),
      T[17] === Symbol.for("react.memo_cache_sentinel")
        ? ((g = { scale: 0.4, y: 0, opacity: 0 }), (T[17] = g))
        : (g = T[17]),
      T[18] !== B
        ? ((_ = B ? 1 : [0.4, 1.15, 1]), (T[18] = B), (T[19] = _))
        : (_ = T[19]),
      T[20] !== B
        ? ((v = B ? 0 : [0, -8, -60]), (T[20] = B), (T[21] = v))
        : (v = T[21]),
      T[22] === Symbol.for("react.memo_cache_sentinel")
        ? ((j = [0, 1, 0]), (T[22] = j))
        : (j = T[22]),
      T[23] !== _ || T[24] !== v
        ? ((w = { scale: _, y: v, opacity: j }),
          (T[23] = _),
          (T[24] = v),
          (T[25] = w))
        : (w = T[25]),
      T[26] === Symbol.for("react.memo_cache_sentinel")
        ? ((k = { duration: 1.2, times: [0, 0.4, 1], ease: "easeOut" }),
          (T[26] = k))
        : (k = T[26]),
      T[27] !== A
        ? ((N = (0, t.jsx)("div", {
            "data-testid": "trade-celebration-art",
            className: "flex rounded-full border border-gain",
            children: (0, t.jsx)(o.CoinAvatar, {
              coin: A,
              size: 40,
              shape: "round",
              hideCorner: !0,
              eager: !0,
              bone: !0,
            }),
          })),
          (T[27] = A),
          (T[28] = N))
        : (N = T[28]),
      T[29] !== w || T[30] !== N
        ? ((S = (0, t.jsx)(s.f.div, {
            className:
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            initial: g,
            animate: w,
            transition: k,
            children: N,
          })),
          (T[29] = w),
          (T[30] = N),
          (T[31] = S))
        : (S = T[31]),
      T[32] === Symbol.for("react.memo_cache_sentinel")
        ? ((U = { scale: 0.4, rotate: -20, opacity: 0 }), (T[32] = U))
        : (U = T[32]),
      T[33] !== B
        ? ((P = B
            ? { opacity: [0, 1, 0], scale: 1, rotate: 0 }
            : {
                scale: [0.4, 1.2, 1],
                rotate: [-20, 10, 0],
                opacity: [0, 1, 0],
              }),
          (T[33] = B),
          (T[34] = P))
        : (P = T[34]),
      T[35] === Symbol.for("react.memo_cache_sentinel")
        ? ((F = { duration: 1.1, ease: "easeOut" }),
          (C = (0, t.jsx)(a.xI, { size: 22 })),
          (T[35] = F),
          (T[36] = C))
        : ((F = T[35]), (C = T[36])),
      T[37] !== P
        ? ((I = (0, t.jsx)(s.f.div, {
            className: "absolute right-4 top-3 text-gain",
            initial: U,
            animate: P,
            transition: F,
            children: C,
          })),
          (T[37] = P),
          (T[38] = I))
        : (I = T[38]),
      T[39] !== B
        ? ((q = !B && Array.from({ length: 8 }).map(c)),
          (T[39] = B),
          (T[40] = q))
        : (q = T[40]),
      T[41] !== h || T[42] !== S || T[43] !== I || T[44] !== q || T[45] !== f
        ? (($ = (0, t.jsxs)(t.Fragment, { children: [f, h, S, I, q] })),
          (T[41] = h),
          (T[42] = S),
          (T[43] = I),
          (T[44] = q),
          (T[45] = f),
          (T[46] = $))
        : ($ = T[46]),
      $
    );
  }
  function c(e, i) {
    let a = (i / 8) * Math.PI * 2;
    return (0, t.jsx)(
      s.f.span,
      {
        className: "absolute left-1/2 top-1/2 size-1.5 rounded-full bg-gain",
        initial: { x: 0, y: 0, opacity: 0, scale: 0.4 },
        animate: {
          x: 90 * Math.cos(a),
          y: 90 * Math.sin(a),
          opacity: [0, 1, 0],
          scale: [0.4, 1, 0.2],
        },
        transition: { duration: 0.9, ease: "easeOut", delay: 0.05 },
      },
      i,
    );
  }
  function u(e) {
    let n,
      r,
      l,
      o,
      d,
      c,
      u,
      f,
      p = (0, i.c)(13),
      { reduceMotion: b } = e;
    return (
      p[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsx)(s.f.div, {
            className: "absolute inset-0",
            style: {
              background:
                "linear-gradient(180deg, rgb(var(--loss) / 0.25) 0%, rgb(var(--loss) / 0) 55%)",
            },
            initial: { opacity: 0 },
            animate: { opacity: [0, 0.9, 0] },
            transition: { duration: 1.1, ease: "easeOut" },
          })),
          (p[0] = n))
        : (n = p[0]),
      p[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = { scale: 0.4, y: -10, opacity: 0 }), (p[1] = r))
        : (r = p[1]),
      p[2] !== b
        ? ((l = b
            ? { scale: 1, y: 0, opacity: [0, 1, 0] }
            : { scale: [0.4, 1.25, 0.9], y: [-10, 0, 30], opacity: [0, 1, 0] }),
          (p[2] = b),
          (p[3] = l))
        : (l = p[3]),
      p[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = { duration: 1.2, ease: "easeOut" }),
          (d = (0, t.jsx)(a.H2, { size: 40 })),
          (p[4] = o),
          (p[5] = d))
        : ((o = p[4]), (d = p[5])),
      p[6] !== l
        ? ((c = (0, t.jsx)(s.f.div, {
            className:
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-loss",
            initial: r,
            animate: l,
            transition: o,
            children: d,
          })),
          (p[6] = l),
          (p[7] = c))
        : (c = p[7]),
      p[8] !== b
        ? ((u = !b && Array.from({ length: 6 }).map(m)), (p[8] = b), (p[9] = u))
        : (u = p[9]),
      p[10] !== c || p[11] !== u
        ? ((f = (0, t.jsxs)(t.Fragment, { children: [n, c, u] })),
          (p[10] = c),
          (p[11] = u),
          (p[12] = f))
        : (f = p[12]),
      f
    );
  }
  function m(e, i) {
    let a = 15 + (70 * i) / 5;
    return (0, t.jsx)(
      s.f.span,
      {
        className: "absolute top-0 text-[11px] font-semibold text-gain",
        style: { left: `${a}%` },
        initial: { y: -12, opacity: 0 },
        animate: { y: [-12, 60, 120], opacity: [0, 1, 0] },
        transition: { duration: 1, ease: "easeIn", delay: 0.05 + 0.06 * i },
        children: "+SOL",
      },
      i,
    );
  }
  (e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          c,
          m,
          f,
          p,
          b,
          x,
          y = (0, i.c)(14),
          { trigger: h, coin: g } = e,
          _ = (0, r.f)();
        if (y[0] !== g)
          ((a = !0 === g.is_banned ? null : (0, o.coinAvatarImageUrl)(g, 40)),
            (y[0] = g),
            (y[1] = a));
        else a = y[1];
        let v = a;
        (y[2] !== v
          ? ((c = () => {
              (0, o.warmCoinArtUrl)(v);
            }),
            (m = [v]),
            (y[2] = v),
            (y[3] = c),
            (y[4] = m))
          : ((c = y[3]), (m = y[4])),
          (0, l.useEffect)(c, m));
        let [j, w] = (0, l.useState)(null),
          k = h && h.key !== j ? h : null;
        return (
          y[5] !== h
            ? ((f = () => {
                if (!h) return;
                let e = setTimeout(() => w(h.key), 1400);
                return () => clearTimeout(e);
              }),
              (p = [h]),
              (y[5] = h),
              (y[6] = f),
              (y[7] = p))
            : ((f = y[6]), (p = y[7])),
          (0, l.useEffect)(f, p),
          y[8] !== k || y[9] !== g || y[10] !== _
            ? ((b =
                k &&
                (0, t.jsx)(
                  s.f.div,
                  {
                    className: "absolute inset-0",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.25 },
                    children:
                      "buy" === k.side
                        ? (0, t.jsx)(d, { coin: g, reduceMotion: !!_ })
                        : (0, t.jsx)(u, { reduceMotion: !!_ }),
                  },
                  `${k.side}-${k.key}`,
                )),
              (y[8] = k),
              (y[9] = g),
              (y[10] = _),
              (y[11] = b))
            : (b = y[11]),
          y[12] !== b
            ? ((x = (0, t.jsx)("div", {
                "aria-hidden": !0,
                className:
                  "pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl",
                children: (0, t.jsx)(n.f, { children: b }),
              })),
              (y[12] = b),
              (y[13] = x))
            : (x = y[13]),
          x
        );
      },
    ],
    429675,
  ),
    e.i(12692));
  var f = e.i(398902),
    p = e.i(63225),
    b = e.i(90832);
  let x = (e) => `${Math.round(e).toLocaleString("en-US")}%`;
  function y(e) {
    return (0, t.jsxs)(
      "div",
      {
        className: "flex flex-col gap-0.5",
        children: [
          (0, t.jsx)("p", {
            className: "font-medium text-text-warning",
            children: e.title,
          }),
          (0, t.jsx)("p", {
            className: "text-text-secondary",
            children: e.description,
          }),
        ],
      },
      e.title,
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let a,
          n,
          s,
          r,
          l,
          o,
          d,
          c = (0, i.c)(19),
          { guard: u, holdRequired: m } = e,
          { t: h } = (0, f.f)();
        if (!u || 0 === u.reasons.length) return null;
        if (c[0] !== u || c[1] !== h) {
          let e = u.reasons.map((e) => {
            let t;
            return "big_trade" === e
              ? ((e, t) => {
                  let i = t("web.trade.big_trade_title");
                  if (void 0 === e.tradeSizeUsd)
                    return {
                      title: i,
                      description: t("web.trade.big_trade_description_unknown"),
                    };
                  let a = (0, b.w)(e.tradeSizeUsd);
                  return void 0 === e.marketCapUsd ||
                    null === e.marketCapSharePercent
                    ? {
                        title: i,
                        description: t(
                          "web.trade.big_trade_description_no_mcap",
                          { amount: a },
                        ),
                      }
                    : {
                        title: i,
                        description: t("web.trade.big_trade_description", {
                          amount: a,
                          percent: x(e.marketCapSharePercent),
                          mcap: (0, b.N)(e.marketCapUsd),
                        }),
                      };
                })(u, h)
              : {
                  title: h("web.trade.extreme_impact_title", {
                    percent: (t = x(u.valueLostPercent ?? 0)),
                  }),
                  description: h("web.trade.extreme_impact_description", {
                    percent: t,
                  }),
                };
          });
          ((a = "alert"),
            (n = "trade-guardrail-notice"),
            c[7] !== u.reasons
              ? ((s = u.reasons.join(" ")), (c[7] = u.reasons), (c[8] = s))
              : (s = c[8]),
            (r =
              "flex flex-col gap-1.5 rounded-md border border-border-tertiary bg-bg-tertiary px-3 py-2 text-[12px] leading-4"),
            (l = e.map(y)),
            (c[0] = u),
            (c[1] = h),
            (c[2] = a),
            (c[3] = n),
            (c[4] = s),
            (c[5] = r),
            (c[6] = l));
        } else ((a = c[2]), (n = c[3]), (s = c[4]), (r = c[5]), (l = c[6]));
        return (
          c[9] !== m || c[10] !== h
            ? ((o = m
                ? (0, t.jsx)("p", {
                    "data-testid": "trade-guardrail-hold-hint",
                    className: "text-text-quaternary",
                    children: h("web.trade.hold_to_confirm_hint", {
                      seconds: p.Z / 1e3,
                    }),
                  })
                : null),
              (c[9] = m),
              (c[10] = h),
              (c[11] = o))
            : (o = c[11]),
          c[12] !== a ||
          c[13] !== n ||
          c[14] !== s ||
          c[15] !== r ||
          c[16] !== l ||
          c[17] !== o
            ? ((d = (0, t.jsxs)("div", {
                role: a,
                "data-testid": n,
                "data-reasons": s,
                className: r,
                children: [l, o],
              })),
              (c[12] = a),
              (c[13] = n),
              (c[14] = s),
              (c[15] = r),
              (c[16] = l),
              (c[17] = o),
              (c[18] = d))
            : (d = c[18]),
          d
        );
      },
    ],
    782421,
  );
};
