// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(248496),
    n = e.i(338319);
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
    s = [8, 22, 36, 50, 64, 78, 92],
    o = [
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
    c = 100 / o.length,
    d = [20, 22, 18, 20, 14],
    u = [84, 64, 56],
    m = [18, 18, 20, 20, 16],
    f = [84, 14, 22, 28],
    x = `h-[11px] shrink-0 rounded-sm ${r.e} animate-none`,
    h = `h-3.5 shrink-0 rounded-sm ${r.e} animate-none`;
  function p(e) {
    let r,
      n,
      i = (0, l.c)(7),
      { widths: a, className: s } = e;
    if (i[0] !== s || i[1] !== a) {
      let e;
      (i[3] !== s
        ? ((e = (e, l) =>
            (0, t.jsx)("span", { className: s, style: { width: e } }, l)),
          (i[3] = s),
          (i[4] = e))
        : (e = i[4]),
        (r = a.map(e)),
        (i[0] = s),
        (i[1] = a),
        (i[2] = r));
    } else r = i[2];
    return (
      i[5] !== r
        ? ((n = (0, t.jsx)(t.Fragment, { children: r })),
          (i[5] = r),
          (i[6] = n))
        : (n = i[6]),
      n
    );
  }
  function g(e) {
    return (0, t.jsx)(
      "span",
      {
        className: (0, n.c)(
          x,
          "absolute top-1/2 w-7 -translate-x-1/2 -translate-y-1/2",
        ),
        style: { left: `${e}%` },
      },
      e,
    );
  }
  function b(e) {
    return (0, t.jsx)(
      "span",
      {
        className: (0, n.c)(x, "absolute right-2 w-8 -translate-y-1/2"),
        style: { top: `${e}%` },
      },
      e,
    );
  }
  function v(e, l) {
    let [r, n, i, a] = e;
    return (0, t.jsxs)(
      "span",
      {
        "data-skeleton-candle": !0,
        className: "absolute inset-y-0",
        style: { left: `${l * c}%`, width: `${c}%` },
        children: [
          (0, t.jsx)("span", {
            className: "absolute left-1/2 w-px -translate-x-1/2 bg-bg-tertiary",
            style: { top: `${r}%`, height: `${n}%` },
          }),
          (0, t.jsx)("span", {
            className: "absolute inset-x-[30%] rounded-[1px] bg-bg-tertiary",
            style: { top: `${i}%`, height: `${a}%` },
          }),
        ],
      },
      l,
    );
  }
  function y(e) {
    return (0, t.jsx)(
      "span",
      {
        className: "absolute inset-y-0 border-l border-border-secondary",
        style: { left: `${e}%` },
      },
      e,
    );
  }
  function _(e) {
    return (0, t.jsx)(
      "span",
      {
        className: "absolute inset-x-0 border-t border-border-secondary",
        style: { top: `${e}%` },
      },
      e,
    );
  }
  function j(e, l) {
    return (0, t.jsx)(
      "span",
      { className: "h-[26px] w-8 rounded-md bg-bg-tertiary" },
      l,
    );
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          c,
          w,
          N,
          k,
          S,
          C,
          M,
          I = (0, l.c)(29),
          {
            view: P,
            className: E,
            plot: A,
            "aria-label": $,
            fill: T,
            heightPx: R,
            header: U,
            footer: D,
            lineToolbarClassName: F,
          } = e,
          L = void 0 === P ? "candle" : P,
          B = void 0 !== T && T,
          O = void 0 === U || U,
          q = void 0 === D || D,
          z = "line" === L;
        I[0] !== L ? ((r = i(L)), (I[0] = L), (I[1] = r)) : (r = I[1]);
        let K = r;
        I[2] !== B || I[3] !== R || I[4] !== K
          ? ((c = B ? void 0 : null != R ? { height: R } : { minHeight: K }),
            (I[2] = B),
            (I[3] = R),
            (I[4] = K),
            (I[5] = c))
          : (c = I[5]);
        let V = c,
          Q = B && "h-full";
        return (
          I[6] !== E || I[7] !== Q
            ? ((w = (0, n.c)("flex w-full flex-col overflow-hidden", Q, E)),
              (I[6] = E),
              (I[7] = Q),
              (I[8] = w))
            : (w = I[8]),
          I[9] !== O || I[10] !== z || I[11] !== F
            ? ((N = z
                ? (0, t.jsx)("div", {
                    "aria-hidden": !0,
                    "data-skeleton-part": "line-toolbar",
                    className: (0, n.c)(
                      "mb-2 flex h-9 shrink-0 items-center gap-1",
                      F,
                    ),
                    children: Array.from({ length: 5 }).map(j),
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
                          children: (0, t.jsx)(p, { widths: d, className: h }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(p, { widths: u, className: h }),
                        }),
                      ],
                    })
                  : null),
              (I[9] = O),
              (I[10] = z),
              (I[11] = F),
              (I[12] = N))
            : (N = I[12]),
          I[13] !== z || I[14] !== A
            ? ((k =
                A ??
                (0, t.jsxs)(t.Fragment, {
                  children: [
                    (0, t.jsxs)("div", {
                      "data-skeleton-part": "gridlines",
                      className:
                        "absolute bottom-7 left-[9px] right-[54px] top-1",
                      children: [a.map(_), s.map(y)],
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
                          children: o.map(v),
                        }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "price-scale",
                      className:
                        "absolute bottom-7 right-0 top-1 w-[54px] animate-pulse border-l border-border-secondary",
                      children: a.map(b),
                    }),
                    (0, t.jsx)("div", {
                      "data-skeleton-part": "time-scale",
                      className:
                        "absolute bottom-0 left-[9px] right-[54px] h-7 animate-pulse border-t border-border-secondary",
                      children: s.map(g),
                    }),
                  ],
                })),
              (I[13] = z),
              (I[14] = A),
              (I[15] = k))
            : (k = I[15]),
          I[16] !== k
            ? ((S = (0, t.jsx)("div", {
                "aria-hidden": !0,
                "data-skeleton-part": "pane",
                className: "relative min-h-0 w-full flex-1",
                children: k,
              })),
              (I[16] = k),
              (I[17] = S))
            : (S = I[17]),
          I[18] !== q || I[19] !== z
            ? ((C =
                !z && q
                  ? (0, t.jsxs)("div", {
                      "aria-hidden": !0,
                      "data-skeleton-part": "footer",
                      className:
                        "flex h-[28px] shrink-0 items-center justify-between px-3",
                      children: [
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(p, { widths: m, className: x }),
                        }),
                        (0, t.jsx)("div", {
                          className: "flex items-center gap-3",
                          children: (0, t.jsx)(p, { widths: f, className: x }),
                        }),
                      ],
                    })
                  : null),
              (I[18] = q),
              (I[19] = z),
              (I[20] = C))
            : (C = I[20]),
          I[21] !== $ ||
          I[22] !== V ||
          I[23] !== S ||
          I[24] !== C ||
          I[25] !== w ||
          I[26] !== N ||
          I[27] !== L
            ? ((M = (0, t.jsxs)("div", {
                "aria-busy": "true",
                "aria-label": $,
                "data-testid": "coin-chart-skeleton",
                "data-view": L,
                className: w,
                style: V,
                children: [N, S, C],
              })),
              (I[21] = $),
              (I[22] = V),
              (I[23] = S),
              (I[24] = C),
              (I[25] = w),
              (I[26] = N),
              (I[27] = L),
              (I[28] = M))
            : (M = I[28]),
          M
        );
      },
    ],
    570998,
  );
};
