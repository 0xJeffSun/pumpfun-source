// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(248496),
    a = e.i(338319);
  let o = (e = "candle") => ("line" === e ? 600 : 500);
  e.s(
    [
      "F",
      0,
      500,
      "d",
      0,
      370,
      "O",
      0,
      {
        headerPx: 38,
        paneTopPx: 4,
        leftGutterPx: 9,
        priceScalePx: 54,
        timeScalePx: 28,
        footerPx: 28,
        lineToolbarPx: 44,
      },
      "W",
      0,
      600,
      "l",
      0,
      o,
    ],
    326929,
  );
  let i = [10, 30, 50, 70, 90],
    n = [8, 22, 36, 50, 64, 78, 92],
    s = [
      [62, 26, 68, 14],
      [56, 24, 60, 12],
      [48, 28, 54, 16],
      [52, 20, 56, 10],
      [40, 30, 46, 18],
      [36, 22, 40, 12],
      [44, 24, 48, 14],
      [30, 34, 36, 20],
      [26, 20, 30, 10],
      [34, 24, 38, 14],
      [22, 30, 28, 18],
      [18, 20, 22, 10],
      [28, 26, 32, 14],
      [14, 28, 18, 18],
      [20, 22, 24, 12],
      [10, 26, 14, 16],
    ],
    c = 100 / s.length,
    d = [20, 22, 18, 20, 14],
    m = [84, 64, 56],
    u = [18, 18, 20, 20, 16],
    p = [84, 14, 22, 28],
    h = `h-[11px] shrink-0 rounded-sm ${l.e} animate-none`,
    b = `h-3.5 shrink-0 rounded-sm ${l.e} animate-none`;
  function x(e) {
    let l,
      a,
      o = (0, r.c)(7),
      { widths: i, className: n } = e;
    if (o[0] !== n || o[1] !== i) {
      let e;
      (o[3] !== n
        ? ((e = (e, r) =>
            (0, t.jsx)("span", { className: n, style: { width: e } }, r)),
          (o[3] = n),
          (o[4] = e))
        : (e = o[4]),
        (l = i.map(e)),
        (o[0] = n),
        (o[1] = i),
        (o[2] = l));
    } else l = o[2];
    return (
      o[5] !== l
        ? ((a = (0, t.jsx)(t.Fragment, { children: l })),
          (o[5] = l),
          (o[6] = a))
        : (a = o[6]),
      a
    );
  }
  function f(e) {
    return (0, t.jsx)(
      "span",
      {
        className: (0, a.c)(
          h,
          "absolute top-1/2 w-7 -translate-x-1/2 -translate-y-1/2",
        ),
        style: { left: `${e}%` },
      },
      e,
    );
  }
  function g(e) {
    return (0, t.jsx)(
      "span",
      {
        className: (0, a.c)(h, "absolute right-2 w-8 -translate-y-1/2"),
        style: { top: `${e}%` },
      },
      e,
    );
  }
  function y(e, r) {
    let [l, a, o, i] = e;
    return (0, t.jsxs)(
      "span",
      {
        "data-skeleton-candle": !0,
        className: "absolute inset-y-0",
        style: { left: `${r * c}%`, width: `${c}%` },
        children: [
          (0, t.jsx)("span", {
            className: "absolute left-1/2 w-px -translate-x-1/2 bg-bg-tertiary",
            style: { top: `${l}%`, height: `${a}%` },
          }),
          (0, t.jsx)("span", {
            className: "absolute inset-x-[30%] rounded-[1px] bg-bg-tertiary",
            style: { top: `${o}%`, height: `${i}%` },
          }),
        ],
      },
      r,
    );
  }
  function v(e) {
    return (0, t.jsx)(
      "span",
      {
        className: "absolute inset-y-0 border-l border-border-secondary",
        style: { left: `${e}%` },
      },
      e,
    );
  }
  function w(e) {
    return (0, t.jsx)(
      "span",
      {
        className: "absolute inset-x-0 border-t border-border-secondary",
        style: { top: `${e}%` },
      },
      e,
    );
  }
  function S(e, r) {
    return (0, t.jsx)(
      "span",
      { className: "h-[26px] w-8 rounded-md bg-bg-tertiary" },
      r,
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let l,
          c,
          N,
          C,
          j,
          P,
          k,
          T,
          M = (0, r.c)(29),
          {
            view: _,
            className: U,
            plot: $,
            "aria-label": D,
            fill: A,
            heightPx: F,
            header: E,
            footer: L,
            lineToolbarClassName: B,
          } = e,
          I = void 0 === _ ? "candle" : _,
          O = void 0 !== A && A,
          R = void 0 === E || E,
          W = void 0 === L || L,
          z = "line" === I;
        M[0] !== I ? ((l = o(I)), (M[0] = I), (M[1] = l)) : (l = M[1]);
        let G = l;
        M[2] !== O || M[3] !== F || M[4] !== G
          ? ((c = O ? void 0 : null != F ? { height: F } : { minHeight: G }),
            (M[2] = O),
            (M[3] = F),
            (M[4] = G),
            (M[5] = c))
          : (c = M[5]);
        let H = c,
          K = O && "h-full";
        return (
          M[6] !== U || M[7] !== K
            ? ((N = (0, a.c)("flex w-full flex-col overflow-hidden", K, U)),
              (M[6] = U),
              (M[7] = K),
              (M[8] = N))
            : (N = M[8]),
          M[9] !== R || M[10] !== z || M[11] !== B
            ? ((C = z
                ? (0, t.jsx)("div", {
                    "aria-hidden": !0,
                    "data-skeleton-part": "line-toolbar",
                    className: (0, a.c)(
                      "mb-2 flex h-9 shrink-0 items-center gap-1",
                      B,
                    ),
                    children: Array.from({ length: 5 }).map(S),
                  })
                : R
                  ? (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-skeleton-part": "header",
                      className:
                        "flex h-[38px] shrink-0 items-center justify-between px-2",
                      children: [
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-2",
                          children: (0, t.jsx)(x, { widths: d, className: b }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(x, { widths: m, className: b }),
                        }),
                      ],
                    })
                  : null),
              (M[9] = R),
              (M[10] = z),
              (M[11] = B),
              (M[12] = C))
            : (C = M[12]),
          M[13] !== z || M[14] !== $
            ? ((j =
                $ ??
                (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("div", {
                      "data-skeleton-part": "gridlines",
                      className:
                        "absolute bottom-7 left-[9px] right-[54px] top-1",
                      children: [i.map(w), n.map(v)],
                    }),
                    z
                      ? (0, t.jsx)("div", {
                          "data-skeleton-part": "line",
                          className:
                            "absolute bottom-7 left-[9px] right-[54px] top-1 animate-pulse",
                          children: (0, t.jsx)("svg", {
                            className: "size-full",
                            viewBox: "0 0 100 100",
                            preserveAspectRatio: "none",
                            fill: "none",
                            children: (0, t.jsx)("path", {
                              d: "M0 78 L7 72 L14 75 L21 62 L28 66 L35 54 L42 58 L49 44 L56 50 L63 36 L70 40 L77 28 L84 33 L91 22 L100 18",
                              className: "stroke-border-tertiary",
                              strokeWidth: 1.5,
                              vectorEffect: "non-scaling-stroke",
                              strokeLinejoin: "round",
                            }),
                          }),
                        })
                      : (0, t.jsx)("div", {
                          "data-skeleton-part": "candles",
                          className:
                            "absolute bottom-7 left-[9px] right-[54px] top-1 animate-pulse",
                          children: s.map(y),
                        }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "price-scale",
                      className:
                        "absolute bottom-7 right-0 top-1 w-[54px] animate-pulse border-l border-border-secondary",
                      children: i.map(g),
                    }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "time-scale",
                      className:
                        "absolute bottom-0 left-[9px] right-[54px] h-7 animate-pulse border-t border-border-secondary",
                      children: n.map(f),
                    }),
                  ],
                })),
              (M[13] = z),
              (M[14] = $),
              (M[15] = j))
            : (j = M[15]),
          M[16] !== j
            ? ((P = (0, t.jsx)("div", {
                "aria-hidden": !0,
                "data-skeleton-part": "pane",
                className: "relative min-h-0 w-full flex-1",
                children: j,
              })),
              (M[16] = j),
              (M[17] = P))
            : (P = M[17]),
          M[18] !== W || M[19] !== z
            ? ((k =
                !z && W
                  ? (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-skeleton-part": "footer",
                      className:
                        "flex h-[28px] shrink-0 items-center justify-between px-3",
                      children: [
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(x, { widths: u, className: h }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(x, { widths: p, className: h }),
                        }),
                      ],
                    })
                  : null),
              (M[18] = W),
              (M[19] = z),
              (M[20] = k))
            : (k = M[20]),
          M[21] !== D ||
          M[22] !== H ||
          M[23] !== P ||
          M[24] !== k ||
          M[25] !== N ||
          M[26] !== C ||
          M[27] !== I
            ? ((T = (0, t.jsxs)("div", {
                "aria-busy": "true",
                "aria-label": D,
                "data-testid": "coin-chart-skeleton",
                "data-view": I,
                className: N,
                style: H,
                children: [C, P, k],
              })),
              (M[21] = D),
              (M[22] = H),
              (M[23] = P),
              (M[24] = k),
              (M[25] = N),
              (M[26] = C),
              (M[27] = I),
              (M[28] = T))
            : (T = M[28]),
          T
        );
      },
    ],
    570998,
  );
};
