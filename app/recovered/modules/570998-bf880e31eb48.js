// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(248496),
    o = e.i(338319);
  let i = (e = "candle") => ("line" === e ? 600 : 500);
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
      i,
    ],
    326929,
  );
  let a = [10, 30, 50, 70, 90],
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
    u = [84, 64, 56],
    m = [18, 18, 20, 20, 16],
    p = [84, 14, 22, 28],
    b = `h-[11px] shrink-0 rounded-sm ${l.e} animate-none`,
    h = `h-3.5 shrink-0 rounded-sm ${l.e} animate-none`;
  function y(e) {
    let l,
      o,
      i = (0, r.c)(7),
      { widths: a, className: n } = e;
    if (i[0] !== n || i[1] !== a) {
      let e;
      (i[3] !== n
        ? ((e = (e, r) =>
            (0, t.jsx)("span", { className: n, style: { width: e } }, r)),
          (i[3] = n),
          (i[4] = e))
        : (e = i[4]),
        (l = a.map(e)),
        (i[0] = n),
        (i[1] = a),
        (i[2] = l));
    } else l = i[2];
    return (
      i[5] !== l
        ? ((o = (0, t.jsx)(t.Fragment, { children: l })),
          (i[5] = l),
          (i[6] = o))
        : (o = i[6]),
      o
    );
  }
  function f(e) {
    return (0, t.jsx)(
      "span",
      {
        className: (0, o.c)(
          b,
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
        className: (0, o.c)(b, "absolute right-2 w-8 -translate-y-1/2"),
        style: { top: `${e}%` },
      },
      e,
    );
  }
  function v(e, r) {
    let [l, o, i, a] = e;
    return (0, t.jsxs)(
      "span",
      {
        "data-skeleton-candle": !0,
        className: "absolute inset-y-0",
        style: { left: `${r * c}%`, width: `${c}%` },
        children: [
          (0, t.jsx)("span", {
            className: "absolute left-1/2 w-px -translate-x-1/2 bg-bg-tertiary",
            style: { top: `${l}%`, height: `${o}%` },
          }),
          (0, t.jsx)("span", {
            className: "absolute inset-x-[30%] rounded-[1px] bg-bg-tertiary",
            style: { top: `${i}%`, height: `${a}%` },
          }),
        ],
      },
      r,
    );
  }
  function x(e) {
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
  function C(e, r) {
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
          k,
          S,
          N,
          P,
          j,
          T,
          A = (0, r.c)(29),
          {
            view: _,
            className: M,
            plot: I,
            "aria-label": U,
            fill: $,
            heightPx: B,
            header: E,
            footer: L,
            lineToolbarClassName: D,
          } = e,
          V = void 0 === _ ? "candle" : _,
          F = void 0 !== $ && $,
          R = void 0 === E || E,
          O = void 0 === L || L,
          W = "line" === V;
        A[0] !== V ? ((l = i(V)), (A[0] = V), (A[1] = l)) : (l = A[1]);
        let q = l;
        A[2] !== F || A[3] !== B || A[4] !== q
          ? ((c = F ? void 0 : null != B ? { height: B } : { minHeight: q }),
            (A[2] = F),
            (A[3] = B),
            (A[4] = q),
            (A[5] = c))
          : (c = A[5]);
        let z = c,
          G = F && "h-full";
        return (
          A[6] !== M || A[7] !== G
            ? ((k = (0, o.c)("flex w-full flex-col overflow-hidden", G, M)),
              (A[6] = M),
              (A[7] = G),
              (A[8] = k))
            : (k = A[8]),
          A[9] !== R || A[10] !== W || A[11] !== D
            ? ((S = W
                ? (0, t.jsx)("div", {
                    "aria-hidden": !0,
                    "data-skeleton-part": "line-toolbar",
                    className: (0, o.c)(
                      "mb-2 flex h-9 shrink-0 items-center gap-1",
                      D,
                    ),
                    children: Array.from({ length: 5 }).map(C),
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
                          children: (0, t.jsx)(y, { widths: d, className: h }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(y, { widths: u, className: h }),
                        }),
                      ],
                    })
                  : null),
              (A[9] = R),
              (A[10] = W),
              (A[11] = D),
              (A[12] = S))
            : (S = A[12]),
          A[13] !== W || A[14] !== I
            ? ((N =
                I ??
                (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("div", {
                      "data-skeleton-part": "gridlines",
                      className:
                        "absolute bottom-7 left-[9px] right-[54px] top-1",
                      children: [a.map(w), n.map(x)],
                    }),
                    W
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
                          children: s.map(v),
                        }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "price-scale",
                      className:
                        "absolute bottom-7 right-0 top-1 w-[54px] animate-pulse border-l border-border-secondary",
                      children: a.map(g),
                    }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "time-scale",
                      className:
                        "absolute bottom-0 left-[9px] right-[54px] h-7 animate-pulse border-t border-border-secondary",
                      children: n.map(f),
                    }),
                  ],
                })),
              (A[13] = W),
              (A[14] = I),
              (A[15] = N))
            : (N = A[15]),
          A[16] !== N
            ? ((P = (0, t.jsx)("div", {
                "aria-hidden": !0,
                "data-skeleton-part": "pane",
                className: "relative min-h-0 w-full flex-1",
                children: N,
              })),
              (A[16] = N),
              (A[17] = P))
            : (P = A[17]),
          A[18] !== O || A[19] !== W
            ? ((j =
                !W && O
                  ? (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-skeleton-part": "footer",
                      className:
                        "flex h-[28px] shrink-0 items-center justify-between px-3",
                      children: [
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(y, { widths: m, className: b }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(y, { widths: p, className: b }),
                        }),
                      ],
                    })
                  : null),
              (A[18] = O),
              (A[19] = W),
              (A[20] = j))
            : (j = A[20]),
          A[21] !== U ||
          A[22] !== z ||
          A[23] !== P ||
          A[24] !== j ||
          A[25] !== k ||
          A[26] !== S ||
          A[27] !== V
            ? ((T = (0, t.jsxs)("div", {
                "aria-busy": "true",
                "aria-label": U,
                "data-testid": "coin-chart-skeleton",
                "data-view": V,
                className: k,
                style: z,
                children: [S, P, j],
              })),
              (A[21] = U),
              (A[22] = z),
              (A[23] = P),
              (A[24] = j),
              (A[25] = k),
              (A[26] = S),
              (A[27] = V),
              (A[28] = T))
            : (T = A[28]),
          T
        );
      },
    ],
    570998,
  );
};
