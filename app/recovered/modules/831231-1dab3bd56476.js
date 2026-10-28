// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(426091),
    n = e.i(352386),
    i = e.i(326929),
    a = e.i(835894),
    s = e.i(570998),
    o = e.i(409844);
  let c = () => () => void 0,
    d = () => null;
  function u(e) {
    let r,
      i,
      u,
      x = (0, l.c)(6),
      { heightPx: h } = e,
      p = (0, n.useRef)(null),
      g = (0, a.x)(f),
      b = (0, a.x)(m),
      v = (0, n.useSyncExternalStore)(c, o.H, d) ?? h;
    return (
      x[0] !== g || x[1] !== b
        ? ((r = () => {
            let e = p.current;
            if (e) return (g(e), () => b(e));
          }),
          (i = [g, b]),
          (x[0] = g),
          (x[1] = b),
          (x[2] = r),
          (x[3] = i))
        : ((r = x[2]), (i = x[3])),
      (0, n.useLayoutEffect)(r, i),
      x[4] !== v
        ? ((u = (0, t.jsx)("div", {
            ref: p,
            "data-testid": "coin-chart-shell-slot",
            className: "relative w-full overflow-hidden",
            style: { height: v },
            children: (0, t.jsx)(s.f, { heightPx: v }),
          })),
          (x[4] = v),
          (x[5] = u))
        : (u = x[5]),
      u
    );
  }
  function m(e) {
    return e.releaseShell;
  }
  function f(e) {
    return e.registerShell;
  }
  var x = e.i(951425),
    h = e.i(375670);
  function p(e) {
    let r,
      n,
      i,
      a,
      s = (0, l.c)(5),
      { className: o } = e,
      c = `flex flex-col gap-1 text-left ${void 0 === o ? "" : o}`;
    return (
      s[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)(h.f, { className: "h-5 w-20 bg-bg-tertiary" })),
          (n = (0, t.jsx)(h.f, {
            className: "h-8 w-32 bg-bg-tertiary md:h-11 md:w-40",
          })),
          (i = (0, t.jsx)(h.f, { className: "h-5 w-36 bg-bg-tertiary" })),
          (s[0] = r),
          (s[1] = n),
          (s[2] = i))
        : ((r = s[0]), (n = s[1]), (i = s[2])),
      s[3] !== c
        ? ((a = (0, t.jsxs)("div", {
            "aria-hidden": !0,
            className: c,
            "data-testid": "market-cap-display-skeleton",
            children: [r, n, i],
          })),
          (s[3] = c),
          (s[4] = a))
        : (a = s[4]),
      a
    );
  }
  var g = e.i(954644),
    b = e.i(256272),
    v = e.i(745674),
    y = e.i(248496),
    _ = e.i(944927);
  function j(e) {
    let n,
      i,
      a,
      s = (0, l.c)(7),
      { heightClassName: o, className: c } = e,
      d = void 0 === o ? "h-32" : o;
    return (
      s[0] !== d
        ? ((n = (0, r.c)("w-full", d)), (s[0] = d), (s[1] = n))
        : (n = s[1]),
      s[2] !== n
        ? ((i = (0, t.jsx)(y.l, { className: n })), (s[2] = n), (s[3] = i))
        : (i = s[3]),
      s[4] !== c || s[5] !== i
        ? ((a = (0, t.jsx)(b.g, { className: c, children: i })),
          (s[4] = c),
          (s[5] = i),
          (s[6] = a))
        : (a = s[6]),
      a
    );
  }
  function w(e) {
    let n,
      i,
      a,
      s,
      o,
      c,
      d,
      u = (0, l.c)(17),
      { rows: m, aside: f, pairRow: x, className: h, "data-testid": p } = e,
      v = void 0 === m ? 1 : m,
      _ = void 0 === f || f,
      j = void 0 !== x && x,
      w = void 0 === p ? "panel-band-skeleton" : p;
    return (
      u[0] !== h
        ? ((n = (0, r.c)(g.B, h)), (u[0] = h), (u[1] = n))
        : (n = u[1]),
      u[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)(y.l, { className: "h-3 w-24" })), (u[2] = i))
        : (i = u[2]),
      u[3] !== _
        ? ((a = _ ? (0, t.jsx)(y.l, { className: "h-3 w-14" }) : null),
          (u[3] = _),
          (u[4] = a))
        : (a = u[4]),
      u[5] !== a
        ? ((s = (0, t.jsxs)("div", { className: g.c, children: [i, a] })),
          (u[5] = a),
          (u[6] = s))
        : (s = u[6]),
      u[7] !== j
        ? ((o = j ? (0, t.jsx)(C, {}) : null), (u[7] = j), (u[8] = o))
        : (o = u[8]),
      u[9] !== v
        ? ((c = Array.from({ length: v }, k).map(N)), (u[9] = v), (u[10] = c))
        : (c = u[10]),
      u[11] !== c || u[12] !== n || u[13] !== s || u[14] !== o || u[15] !== w
        ? ((d = (0, t.jsxs)(b.g, {
            "aria-hidden": !0,
            className: n,
            "data-testid": w,
            children: [s, o, c],
          })),
          (u[11] = c),
          (u[12] = n),
          (u[13] = s),
          (u[14] = o),
          (u[15] = w),
          (u[16] = d))
        : (d = u[16]),
      d
    );
  }
  function N(e) {
    return (0, t.jsxs)(
      "div",
      {
        className: g.x,
        "data-testid": "panel-band-skeleton-row",
        children: [
          (0, t.jsx)(y.l, { className: "h-3 w-20" }),
          (0, t.jsx)(y.l, { className: "h-3 w-16" }),
        ],
      },
      e,
    );
  }
  function k(e, t) {
    return `row-${t}`;
  }
  let S = (0, r.c)(x.x.terminal, "justify-between gap-2");
  function C() {
    let e,
      r,
      n,
      i = (0, l.c)(3);
    return (
      i[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, t.jsx)(y.l, { variant: "art", size: x.s.terminal })),
          (i[0] = e))
        : (e = i[0]),
      i[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsxs)("span", {
            className: S,
            children: [
              (0, t.jsx)(y.l, { height: 13, width: 96 }),
              (0, t.jsx)(y.l, { className: "ml-auto", height: 13, width: 40 }),
            ],
          })),
          (i[1] = r))
        : (r = i[1]),
      i[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsxs)("div", {
            className: "-mx-3 flex min-h-10 items-center gap-2 px-3 py-1",
            "data-testid": "panel-band-skeleton-pair-row",
            children: [
              e,
              (0, t.jsxs)("span", {
                className: "flex min-w-0 flex-1 flex-col",
                children: [
                  r,
                  (0, t.jsxs)("span", {
                    className:
                      "flex h-4 min-w-0 items-center justify-between gap-2",
                    children: [
                      (0, t.jsx)(y.l, { height: 11, width: 64 }),
                      (0, t.jsx)(y.l, {
                        className: "ml-auto",
                        height: 11,
                        width: 32,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })),
          (i[2] = n))
        : (n = i[2]),
      n
    );
  }
  function M(e) {
    let r,
      n,
      i = (0, l.c)(3),
      { className: a } = e;
    return (
      i[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsxs)("div", {
            className: "flex h-4 items-center justify-between gap-3",
            children: [
              (0, t.jsx)(y.l, { className: "h-3 w-16" }),
              (0, t.jsx)(y.l, { className: "h-3 w-24" }),
            ],
          })),
          (i[0] = r))
        : (r = i[0]),
      i[1] !== a
        ? ((n = (0, t.jsx)(b.g, {
            "aria-hidden": !0,
            className: a,
            "data-testid": "panel-line-skeleton",
            children: r,
          })),
          (i[1] = a),
          (i[2] = n))
        : (n = i[2]),
      n
    );
  }
  let I = [
    { key: "limit-orders", kind: "band", rows: 2 },
    { key: "holders", kind: "holders" },
    { key: "stats", kind: "band", rows: 5 },
    { key: "creator", kind: "line" },
    { key: "ath", kind: "line" },
    { key: "pool", kind: "band", rows: 1 },
  ];
  function P(e) {
    return "holders" === e.kind
      ? (0, t.jsxs)(
          _.CoinPagePanel,
          {
            panelClassName: "flex h-8 items-center justify-between px-3",
            children: [
              (0, t.jsx)(y.l, { className: "h-3 w-14" }),
              (0, t.jsx)(y.l, { className: "h-3 w-10" }),
            ],
          },
          e.key,
        )
      : "line" === e.kind
        ? (0, t.jsx)(_.CoinPagePanel, { children: (0, t.jsx)(M, {}) }, e.key)
        : (0, t.jsx)(
            _.CoinPagePanel,
            { children: (0, t.jsx)(w, { rows: e.rows }) },
            e.key,
          );
  }
  let E = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"],
    A = ["c1", "c2", "c3", "c4"];
  function $(e) {
    return (0, t.jsxs)(
      "div",
      {
        className: (0, r.c)("flex h-9 items-center gap-6 px-3", v.W),
        children: [
          (0, t.jsx)(y.l, { className: "h-3 w-36" }),
          (0, t.jsx)(y.l, { className: "h-3 w-16" }),
          (0, t.jsx)(y.l, { className: "h-3 w-16" }),
          (0, t.jsx)(y.l, { className: "hidden h-3 w-20 sm:block" }),
        ],
      },
      e,
    );
  }
  function T(e) {
    return (0, t.jsx)(y.l, { className: "h-3 w-12" }, e);
  }
  e.s(
    [
      "CardBoxSkeleton",
      0,
      j,
      "CoinHeaderSkeleton",
      0,
      function () {
        let e,
          r = (0, l.c)(2),
          n = "panel" === (0, b.u)();
        return (
          r[0] !== n
            ? ((e = (0, t.jsx)("div", {
                "aria-hidden": !0,
                className: "flex flex-col gap-3",
                "data-header-skeleton-variant": "default",
                children: n
                  ? (0, t.jsxs)("div", {
                      className: "flex items-center gap-x-4 pr-8",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex shrink-0 items-center gap-x-1.5",
                          children: [
                            (0, t.jsx)("div", { className: "size-5 shrink-0" }),
                            (0, t.jsx)(y.l, {
                              variant: "art",
                              size: 40,
                              className: "mr-1.5",
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex flex-col gap-y-1",
                              children: [
                                (0, t.jsx)(y.l, { className: "h-[21px] w-44" }),
                                (0, t.jsx)(y.l, { className: "h-5 w-52" }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsx)(y.l, { className: "h-8 min-w-0 flex-1" }),
                      ],
                    })
                  : (0, t.jsxs)("div", {
                      className: "flex flex-col gap-3",
                      children: [
                        (0, t.jsxs)("div", {
                          className:
                            "flex items-center justify-between isolate flex-wrap gap-4",
                          children: [
                            (0, t.jsxs)("div", {
                              className: "flex min-w-0 items-center gap-4",
                              children: [
                                (0, t.jsx)("div", {
                                  className:
                                    "w-coin-image-header flex-shrink-0",
                                  children: (0, t.jsx)(y.l, {
                                    className:
                                      "aspect-square w-full rounded-xl",
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "flex min-w-0 flex-1 flex-col gap-0.5",
                                  children: [
                                    (0, t.jsx)(y.l, {
                                      className:
                                        "h-5 w-48 max-w-full md:h-6 md:w-64",
                                    }),
                                    (0, t.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, t.jsx)(y.l, {
                                          className: "h-4 w-16 md:h-5",
                                        }),
                                        (0, t.jsx)(y.l, {
                                          className: "h-4 w-20",
                                        }),
                                      ],
                                    }),
                                    (0, t.jsx)(y.l, {
                                      className: "h-4 w-40 max-w-full",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className: "flex flex-wrap items-center gap-2",
                              children: [
                                (0, t.jsx)(y.l, {
                                  className:
                                    "h-9 w-9 rounded-xl sm:h-10 sm:w-10",
                                }),
                                (0, t.jsx)(y.l, {
                                  className:
                                    "h-9 w-9 rounded-xl sm:h-10 sm:w-10",
                                }),
                                (0, t.jsx)(y.l, {
                                  className:
                                    "hidden h-9 w-9 rounded-xl sm:h-10 sm:w-10 md:block",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsx)(y.l, {
                          className: "h-16 w-full rounded-xl",
                        }),
                      ],
                    }),
              })),
              (r[0] = n),
              (r[1] = e))
            : (e = r[1]),
          e
        );
      },
      "CoinMarketActivitySkeleton",
      0,
      function () {
        let e,
          r = (0, l.c)(1);
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsxs)(b.g, {
                "aria-hidden": !0,
                "data-testid": "coin-market-activity-skeleton",
                children: [
                  (0, t.jsxs)("div", {
                    className: "mb-3 flex items-end justify-between gap-4",
                    children: [
                      (0, t.jsx)(p, { className: "flex-shrink-0" }),
                      (0, t.jsx)(y.l, {
                        className: "h-10 w-full max-w-[360px]",
                      }),
                    ],
                  }),
                  (0, t.jsx)(u, { heightPx: i.d }),
                ],
              })),
              (r[0] = e))
            : (e = r[0]),
          e
        );
      },
      "HoldersTradesTabsSkeleton",
      0,
      function () {
        let e,
          r = (0, l.c)(3);
        if ("panel" === (0, b.u)()) {
          let e, l;
          return (
            r[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = (0, t.jsxs)("div", {
                  className:
                    "flex h-9 items-center gap-5 border-b border-border-secondary px-3",
                  children: [
                    (0, t.jsx)(y.l, { className: "h-3 w-14" }),
                    (0, t.jsx)(y.l, { className: "h-3 w-14" }),
                    (0, t.jsx)(y.l, { className: "h-3 w-14" }),
                  ],
                })),
                (r[0] = e))
              : (e = r[0]),
            r[1] === Symbol.for("react.memo_cache_sentinel")
              ? ((l = (0, t.jsxs)("div", {
                  "aria-hidden": !0,
                  className: "flex flex-col",
                  "data-testid": "terminal-tables-skeleton",
                  children: [
                    e,
                    (0, t.jsx)("div", {
                      className:
                        "flex h-8 items-center gap-2 border-b border-border-secondary px-3",
                      children: A.map(T),
                    }),
                    E.map($),
                  ],
                })),
                (r[1] = l))
              : (l = r[1]),
            l
          );
        }
        return (
          r[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsxs)("div", {
                "aria-hidden": !0,
                className: "flex flex-col gap-3",
                children: [
                  (0, t.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, t.jsx)(y.l, { className: "h-8 w-24" }),
                      (0, t.jsx)(y.l, { className: "h-8 w-24" }),
                    ],
                  }),
                  (0, t.jsx)(y.l, { className: "h-96 w-full" }),
                ],
              })),
              (r[2] = e))
            : (e = r[2]),
          e
        );
      },
      "MobileTradeOverlaySkeleton",
      0,
      function () {
        let e,
          r = (0, l.c)(1);
        return (
          r[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)("div", {
                "aria-hidden": !0,
                className: "relative pb-4",
                children: (0, t.jsx)(j, { heightClassName: "h-[420px]" }),
              })),
              (r[0] = e))
            : (e = r[0]),
          e
        );
      },
      "PanelBandSkeleton",
      0,
      w,
      "RightSidebarSkeleton",
      0,
      function () {
        let e,
          n,
          i,
          a,
          s = (0, l.c)(6),
          o = "panel" !== (0, b.u)() && "gap-3";
        return (
          s[0] !== o
            ? ((e = (0, r.c)("flex flex-col", o)), (s[0] = o), (s[1] = e))
            : (e = s[1]),
          s[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = (0, t.jsx)(_.CoinPagePanel, {
                children: (0, t.jsx)(j, { heightClassName: "h-[420px]" }),
              })),
              (i = I.map(P)),
              (s[2] = n),
              (s[3] = i))
            : ((n = s[2]), (i = s[3])),
          s[4] !== e
            ? ((a = (0, t.jsxs)("div", {
                "aria-hidden": !0,
                className: e,
                children: [n, i],
              })),
              (s[4] = e),
              (s[5] = a))
            : (a = s[5]),
          a
        );
      },
      "useLoadingDeadline",
      0,
      function (e, t) {
        let r,
          i,
          a = (0, l.c)(4),
          s = void 0 === t ? 8e3 : t,
          [o, c] = (0, n.useState)(!1),
          [d, u] = (0, n.useState)(e);
        return (
          d !== e && (u(e), e || c(!1)),
          a[0] !== s || a[1] !== e
            ? ((r = () => {
                if (!e) return;
                let t = setTimeout(() => c(!0), s);
                return () => clearTimeout(t);
              }),
              (i = [e, s]),
              (a[0] = s),
              (a[1] = e),
              (a[2] = r),
              (a[3] = i))
            : ((r = a[2]), (i = a[3])),
          (0, n.useEffect)(r, i),
          e && o
        );
      },
    ],
    831231,
  );
};
