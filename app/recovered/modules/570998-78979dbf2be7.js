// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(248496),
    l = e.i(338319);
  let a = (e = "candle") => ("line" === e ? 600 : 500);
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
      a,
    ],
    326929,
  );
  let n = [10, 30, 50, 70, 90],
    o = [8, 22, 36, 50, 64, 78, 92],
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
    h = `h-[11px] shrink-0 rounded-sm ${i.e} animate-none`,
    f = `h-3.5 shrink-0 rounded-sm ${i.e} animate-none`;
  function y(e) {
    let i,
      l,
      a = (0, r.c)(7),
      { widths: n, className: o } = e;
    if (a[0] !== o || a[1] !== n) {
      let e;
      (a[3] !== o
        ? ((e = (e, r) =>
            (0, t.jsx)("span", { className: o, style: { width: e } }, r)),
          (a[3] = o),
          (a[4] = e))
        : (e = a[4]),
        (i = n.map(e)),
        (a[0] = o),
        (a[1] = n),
        (a[2] = i));
    } else i = a[2];
    return (
      a[5] !== i
        ? ((l = (0, t.jsx)(t.Fragment, { children: i })),
          (a[5] = i),
          (a[6] = l))
        : (l = a[6]),
      l
    );
  }
  function b(e) {
    return (0, t.jsx)(
      "span",
      {
        className: (0, l.c)(
          h,
          "absolute top-1/2 w-7 -translate-x-1/2 -translate-y-1/2",
        ),
        style: { left: `${e}%` },
      },
      e,
    );
  }
  function v(e) {
    return (0, t.jsx)(
      "span",
      {
        className: (0, l.c)(h, "absolute right-2 w-8 -translate-y-1/2"),
        style: { top: `${e}%` },
      },
      e,
    );
  }
  function g(e, r) {
    let [i, l, a, n] = e;
    return (0, t.jsxs)(
      "span",
      {
        "data-skeleton-candle": !0,
        className: "absolute inset-y-0",
        style: { left: `${r * c}%`, width: `${c}%` },
        children: [
          (0, t.jsx)("span", {
            className: "absolute left-1/2 w-px -translate-x-1/2 bg-bg-tertiary",
            style: { top: `${i}%`, height: `${l}%` },
          }),
          (0, t.jsx)("span", {
            className: "absolute inset-x-[30%] rounded-[1px] bg-bg-tertiary",
            style: { top: `${a}%`, height: `${n}%` },
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
  function C(e) {
    return (0, t.jsx)(
      "span",
      {
        className: "absolute inset-x-0 border-t border-border-secondary",
        style: { top: `${e}%` },
      },
      e,
    );
  }
  function k(e, r) {
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
        let i,
          c,
          w,
          S,
          _,
          P,
          N,
          T,
          M = (0, r.c)(29),
          {
            view: j,
            className: A,
            plot: I,
            "aria-label": E,
            fill: L,
            heightPx: U,
            header: $,
            footer: D,
            lineToolbarClassName: B,
          } = e,
          F = void 0 === j ? "candle" : j,
          V = void 0 !== L && L,
          O = void 0 === $ || $,
          R = void 0 === D || D,
          H = "line" === F;
        M[0] !== F ? ((i = a(F)), (M[0] = F), (M[1] = i)) : (i = M[1]);
        let W = i;
        M[2] !== V || M[3] !== U || M[4] !== W
          ? ((c = V ? void 0 : null != U ? { height: U } : { minHeight: W }),
            (M[2] = V),
            (M[3] = U),
            (M[4] = W),
            (M[5] = c))
          : (c = M[5]);
        let G = c,
          z = V && "h-full";
        return (
          M[6] !== A || M[7] !== z
            ? ((w = (0, l.c)("flex w-full flex-col overflow-hidden", z, A)),
              (M[6] = A),
              (M[7] = z),
              (M[8] = w))
            : (w = M[8]),
          M[9] !== O || M[10] !== H || M[11] !== B
            ? ((S = H
                ? (0, t.jsx)("div", {
                    "aria-hidden": !0,
                    "data-skeleton-part": "line-toolbar",
                    className: (0, l.c)(
                      "mb-2 flex h-9 shrink-0 items-center gap-1",
                      B,
                    ),
                    children: Array.from({ length: 5 }).map(k),
                  })
                : O
                  ? (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-skeleton-part": "header",
                      className:
                        "flex h-[38px] shrink-0 items-center justify-between px-2",
                      children: [
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-2",
                          children: (0, t.jsx)(y, { widths: d, className: f }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(y, { widths: u, className: f }),
                        }),
                      ],
                    })
                  : null),
              (M[9] = O),
              (M[10] = H),
              (M[11] = B),
              (M[12] = S))
            : (S = M[12]),
          M[13] !== H || M[14] !== I
            ? ((_ =
                I ??
                (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("div", {
                      "data-skeleton-part": "gridlines",
                      className:
                        "absolute bottom-7 left-[9px] right-[54px] top-1",
                      children: [n.map(C), o.map(x)],
                    }),
                    H
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
                          children: s.map(g),
                        }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "price-scale",
                      className:
                        "absolute bottom-7 right-0 top-1 w-[54px] animate-pulse border-l border-border-secondary",
                      children: n.map(v),
                    }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "time-scale",
                      className:
                        "absolute bottom-0 left-[9px] right-[54px] h-7 animate-pulse border-t border-border-secondary",
                      children: o.map(b),
                    }),
                  ],
                })),
              (M[13] = H),
              (M[14] = I),
              (M[15] = _))
            : (_ = M[15]),
          M[16] !== _
            ? ((P = (0, t.jsx)("div", {
                "aria-hidden": !0,
                "data-skeleton-part": "pane",
                className: "relative min-h-0 w-full flex-1",
                children: _,
              })),
              (M[16] = _),
              (M[17] = P))
            : (P = M[17]),
          M[18] !== R || M[19] !== H
            ? ((N =
                !H && R
                  ? (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-skeleton-part": "footer",
                      className:
                        "flex h-[28px] shrink-0 items-center justify-between px-3",
                      children: [
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(y, { widths: m, className: h }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(y, { widths: p, className: h }),
                        }),
                      ],
                    })
                  : null),
              (M[18] = R),
              (M[19] = H),
              (M[20] = N))
            : (N = M[20]),
          M[21] !== E ||
          M[22] !== G ||
          M[23] !== P ||
          M[24] !== N ||
          M[25] !== w ||
          M[26] !== S ||
          M[27] !== F
            ? ((T = (0, t.jsxs)("div", {
                "aria-busy": "true",
                "aria-label": E,
                "data-testid": "coin-chart-skeleton",
                "data-view": F,
                className: w,
                style: G,
                children: [S, P, N],
              })),
              (M[21] = E),
              (M[22] = G),
              (M[23] = P),
              (M[24] = N),
              (M[25] = w),
              (M[26] = S),
              (M[27] = F),
              (M[28] = T))
            : (T = M[28]),
          T
        );
      },
    ],
    570998,
  );
};
