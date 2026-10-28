// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    a = e.i(292686),
    s = e.i(599077),
    i = e.i(352386);
  e.i(12692);
  var r = e.i(398902),
    l = e.i(713380),
    m = e.i(909318),
    c = e.i(56087),
    o = e.i(985526),
    d = e.i(755793),
    u = e.i(237237),
    h = e.i(952298),
    x = e.i(850175),
    f = e.i(609252),
    p = e.i(595673);
  e.s(
    [
      "MayhemBumper",
      0,
      function () {
        let e,
          b,
          y,
          _,
          g,
          v,
          w,
          j,
          N,
          k,
          S,
          E,
          M,
          C,
          A,
          R,
          O,
          I,
          T,
          U,
          F,
          $,
          L = (0, n.c)(65),
          { t: z } = (0, r.f)(),
          H = (0, s.useRouter)(),
          { event: P, dismiss: D } = (function (e = !0) {
            let [t, n] = (0, i.useState)(null),
              a = (0, i.useRef)([]),
              s = (0, i.useRef)(null),
              r = (0, i.useRef)(!1),
              l = (0, i.useRef)(0),
              m = (0, i.useCallback)(() => {
                s.current && (clearTimeout(s.current), (s.current = null));
                let e = a.current.shift();
                if (!e) {
                  ((r.current = !1), n(null));
                  return;
                }
                ((r.current = !0), n(e), (s.current = setTimeout(m, 6e3)));
              }, []),
              c = (0, i.useCallback)(
                (e) => {
                  (a.current.push(e),
                    a.current.length > 8 && a.current.shift(),
                    r.current || m());
                },
                [m],
              );
            return (
              (0, i.useEffect)(() => {
                if (!e) return;
                let t = (0, d.i)(o.N.Unified, u.N, (e) => {
                    let t = (0, h.f)(e);
                    if (!t || "buy" !== t.side) return;
                    let n = "string" == typeof e.mint ? e.mint : void 0;
                    if (!n) return;
                    let a = Number(e.amountSol);
                    Number.isFinite(a) &&
                      !(a < 5) &&
                      c({
                        id: ++l.current,
                        kind: "trade",
                        mint: n,
                        side: t.side,
                        amountSol: a,
                      });
                  }),
                  i = (0, d.i)(o.N.Unified, u.W, (e) => {
                    let t = "string" == typeof e.mint ? e.mint : void 0;
                    if (!t) return;
                    let n = e.mayhem_state;
                    null != n &&
                      "" !== n &&
                      c({
                        id: ++l.current,
                        kind: "launch",
                        mint: t,
                        name: "string" == typeof e.name ? e.name : void 0,
                        ticker: "string" == typeof e.symbol ? e.symbol : void 0,
                      });
                  });
                return () => {
                  ((0, d.V)(o.N.Unified, t),
                    (0, d.V)(o.N.Unified, i),
                    s.current && (clearTimeout(s.current), (s.current = null)),
                    (r.current = !1),
                    (a.current = []),
                    n(null));
                };
              }, [e, c]),
              { event: t, dismiss: m }
            );
          })(),
          Y = (function () {
            let e,
              t,
              a = (0, n.c)(2),
              [s, r] = (0, i.useState)(64);
            return (
              a[0] === Symbol.for("react.memo_cache_sentinel")
                ? ((e = () => {
                    let e = document.querySelector(".sticky.top-0");
                    if (!e) return;
                    let t = () =>
                      r(Math.round(e.getBoundingClientRect().height));
                    t();
                    let n = new ResizeObserver(t);
                    return (n.observe(e), () => n.disconnect());
                  }),
                  (t = []),
                  (a[0] = e),
                  (a[1] = t))
                : ((e = a[0]), (t = a[1])),
              (0, i.useEffect)(e, t),
              s
            );
          })(),
          q = P?.mint;
        L[0] !== q ? ((e = q ? [q] : []), (L[0] = q), (L[1] = e)) : (e = L[1]);
        let V = !q;
        L[2] !== e || L[3] !== V
          ? ((b = { mints: e, limit: 1, includeNsfw: !0, disabled: V }),
            (L[2] = e),
            (L[3] = V),
            (L[4] = b))
          : (b = L[4]);
        let { coins: W } = (0, f.f)(b);
        if (L[5] !== W || L[6] !== q) {
          let e;
          (L[8] !== q
            ? ((e = (e) => e?.mint === q), (L[8] = q), (L[9] = e))
            : (e = L[9]),
            (y = W.find(e)),
            (L[5] = W),
            (L[6] = q),
            (L[7] = y));
        } else y = L[7];
        let B = y;
        L[10] !== B || L[11] !== q
          ? ((_ = q ? (B ?? (0, x.e)(q)) : null),
            (L[10] = B),
            (L[11] = q),
            (L[12] = _))
          : (_ = L[12]);
        let { prefetch: K, hoverProps: G } = (0, x.W)(_);
        if (
          (L[13] !== q || L[14] !== K || L[15] !== H
            ? ((g = () => {
                K && q && H.prefetch(`/coin/${q}`);
              }),
              (v = [K, q, H]),
              (L[13] = q),
              (L[14] = K),
              (L[15] = H),
              (L[16] = g),
              (L[17] = v))
            : ((g = L[16]), (v = L[17])),
          (0, i.useEffect)(g, v),
          !P)
        )
          return null;
        let Q = "trade" === P.kind;
        if (L[18] !== B?.symbol || L[19] !== P.mint) {
          var J;
          ((w =
            B?.symbol ??
            ((J = P.mint).length > 8 ? `${J.slice(0, 4)}…${J.slice(-4)}` : J)),
            (L[18] = B?.symbol),
            (L[19] = P.mint),
            (L[20] = w));
        } else w = L[20];
        let X = w,
          Z = "launch" === P.kind ? (P.ticker ?? B?.symbol) : void 0,
          ee = Y + 10;
        (L[21] !== ee
          ? ((j = { top: ee }), (L[21] = ee), (L[22] = j))
          : (j = L[22]),
          L[23] !== B?.usd_market_cap || L[24] !== P.mint || L[25] !== H
            ? ((N = () => {
                ((0, p.iV)({
                  coinId: P.mint,
                  itemPosition: 0,
                  marketCap: B?.usd_market_cap ?? 0,
                  sourceScreen: a.Ae.MAYHEM,
                  sourceElement: a.k9.NOTIFICATION_WEB_TOAST,
                }),
                  H.push(`/coin/${P.mint}`));
              }),
              (L[23] = B?.usd_market_cap),
              (L[24] = P.mint),
              (L[25] = H),
              (L[26] = N))
            : (N = L[26]));
        let et = B?.image_uri ?? "";
        return (
          L[27] !== P.mint || L[28] !== et
            ? ((k = (0, t.jsx)("span", {
                className: "block size-full overflow-hidden rounded-full",
                children: (0, t.jsx)(m.f, {
                  sourceImageUrl: et,
                  mint: P.mint,
                  imageType: c.d.COIN_IMAGE,
                  alt: "",
                  width: 28,
                  height: 28,
                  className: "size-full object-cover",
                }),
              })),
              (L[27] = P.mint),
              (L[28] = et),
              (L[29] = k))
            : (k = L[29]),
          L[30] !== P.mint
            ? ((S = (0, t.jsx)(l.f, {
                mint: P.mint,
                size: 12,
                className: "absolute -bottom-0.5 -right-0.5",
              })),
              (L[30] = P.mint),
              (L[31] = S))
            : (S = L[31]),
          L[32] !== k || L[33] !== S
            ? ((E = (0, t.jsxs)("span", {
                className: "relative block size-7 shrink-0",
                children: [k, S],
              })),
              (L[32] = k),
              (L[33] = S),
              (L[34] = E))
            : (E = L[34]),
          L[35] !== P.amountSol ||
          L[36] !== P.name ||
          L[37] !== Q ||
          L[38] !== Z ||
          L[39] !== z ||
          L[40] !== X
            ? ((M = (0, t.jsx)("span", {
                className: "flex-1 truncate text-sm text-text-secondary",
                children: Q
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        z("web.mayhem.bumper_agent_bought"),
                        " ",
                        (0, t.jsxs)("strong", {
                          className: "text-positive tabular-nums",
                          children: [P.amountSol.toFixed(1), " SOL"],
                        }),
                        " ",
                        z("web.mayhem.bumper_of"),
                        " ",
                        (0, t.jsxs)("strong", {
                          className: "text-text-primary",
                          children: ["$", X],
                        }),
                      ],
                    })
                  : (0, t.jsxs)(t.Fragment, {
                      children: [
                        P.name
                          ? (0, t.jsx)("strong", {
                              className: "text-text-primary",
                              children: P.name,
                            })
                          : null,
                        " ",
                        Z
                          ? (0, t.jsxs)("span", {
                              className: "text-text-tertiary",
                              children: ["$", Z],
                            })
                          : null,
                        " ",
                        z("web.mayhem.bumper_just_launched"),
                      ],
                    }),
              })),
              (L[35] = P.amountSol),
              (L[36] = P.name),
              (L[37] = Q),
              (L[38] = Z),
              (L[39] = z),
              (L[40] = X),
              (L[41] = M))
            : (M = L[41]),
          L[42] !== z
            ? ((C = z("web.mayhem.view")), (L[42] = z), (L[43] = C))
            : (C = L[43]),
          L[44] === Symbol.for("react.memo_cache_sentinel")
            ? ((A = (0, t.jsx)("svg", {
                width: "11",
                height: "11",
                viewBox: "0 0 14 14",
                fill: "none",
                "aria-hidden": !0,
                children: (0, t.jsx)("path", {
                  d: "M3 7h8M7.5 3.5 11 7l-3.5 3.5",
                  stroke: "currentColor",
                  strokeWidth: "1.7",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }),
              })),
              (L[44] = A))
            : (A = L[44]),
          L[45] !== C
            ? ((R = (0, t.jsxs)("span", {
                className:
                  "inline-flex shrink-0 items-center gap-1 font-medium text-text-accent text-xs",
                children: [C, A],
              })),
              (L[45] = C),
              (L[46] = R))
            : (R = L[46]),
          L[47] !== z
            ? ((O = z("common.dismiss")), (L[47] = z), (L[48] = O))
            : (O = L[48]),
          L[49] !== D
            ? ((I = (e) => {
                (e.stopPropagation(), D());
              }),
              (L[49] = D),
              (L[50] = I))
            : (I = L[50]),
          L[51] === Symbol.for("react.memo_cache_sentinel")
            ? ((T = (0, t.jsx)("svg", {
                width: "10",
                height: "10",
                viewBox: "0 0 10 10",
                fill: "none",
                "aria-hidden": !0,
                children: (0, t.jsx)("path", {
                  d: "m1.5 1.5 7 7M8.5 1.5l-7 7",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                }),
              })),
              (L[51] = T))
            : (T = L[51]),
          L[52] !== O || L[53] !== I
            ? ((U = (0, t.jsx)("span", {
                role: "button",
                tabIndex: -1,
                "aria-label": O,
                onClick: I,
                className:
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-bg-primary hover:text-text-primary",
                children: T,
              })),
              (L[52] = O),
              (L[53] = I),
              (L[54] = U))
            : (U = L[54]),
          L[55] !== G ||
          L[56] !== N ||
          L[57] !== E ||
          L[58] !== M ||
          L[59] !== R ||
          L[60] !== U
            ? ((F = (0, t.jsxs)("button", {
                type: "button",
                ...G,
                onClick: N,
                className:
                  "pointer-events-auto flex w-full items-center gap-2.5 rounded-full border border-border-tertiary bg-bg-secondary/90 py-1.5 pr-2 pl-1.5 text-left shadow-lg backdrop-blur transition-colors hover:border-border-tertiary",
                children: [E, M, R, U],
              })),
              (L[55] = G),
              (L[56] = N),
              (L[57] = E),
              (L[58] = M),
              (L[59] = R),
              (L[60] = U),
              (L[61] = F))
            : (F = L[61]),
          L[62] !== F || L[63] !== j
            ? (($ = (0, t.jsx)("div", {
                style: j,
                className:
                  "-translate-x-1/2 pointer-events-none fixed left-1/2 z-50 flex w-[min(92vw,520px)] justify-center",
                children: F,
              })),
              (L[62] = F),
              (L[63] = j),
              (L[64] = $))
            : ($ = L[64]),
          $
        );
      },
    ],
    120301,
  );
};
