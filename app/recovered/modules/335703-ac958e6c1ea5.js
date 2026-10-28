// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(352386),
    r = e.i(116549);
  let n = () => {
    let e = (0, r.k)(),
      t = (0, r.x)();
    return "none" === e ? null : t;
  };
  e.s(["f", 0, n], 309265);
  let l = (e) => {
    let t,
      r,
      l = (0, i.c)(4),
      { ref: s } = e,
      o = n(),
      d = "comfortable" === o,
      [c, u] = (0, a.useState)(!1);
    return (
      l[0] !== d || l[1] !== s
        ? ((t = () => {
            let e = s.current;
            if (!d || !e) return;
            let t = (e) => {
              if (e <= 0) return;
              let t = e > 0 && e < 360;
              u((e) => (e === t ? e : t));
            };
            if (
              (t(e.getBoundingClientRect().width), "u" < typeof ResizeObserver)
            )
              return;
            let i = new ResizeObserver((i) => {
              t(i[0]?.contentRect.width ?? e.getBoundingClientRect().width);
            });
            return (i.observe(e), () => i.disconnect());
          }),
          (r = [d, s]),
          (l[0] = d),
          (l[1] = s),
          (l[2] = t),
          (l[3] = r))
        : ((t = l[2]), (r = l[3])),
      (0, a.useLayoutEffect)(t, r),
      d && c ? "terminal" : o
    );
  };
  e.s(["f", 0, l], 985688);
  var s = e.i(248496),
    o = e.i(338319);
  function d(e) {
    let a,
      r,
      n,
      l,
      d,
      c,
      u = (0, i.c)(8),
      { className: m } = e;
    return (
      u[0] !== m
        ? ((a = (0, o.c)(
            "flex w-full items-center gap-3 rounded-xl border border-border-secondary bg-bg-secondary p-3",
            m,
          )),
          (u[0] = m),
          (u[1] = a))
        : (a = u[1]),
      u[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)(s.l, { variant: "art", size: 40 })), (u[2] = r))
        : (r = u[2]),
      u[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, t.jsxs)("div", {
            className: "flex min-w-0 grow items-center gap-2",
            children: [
              r,
              (0, t.jsxs)("div", {
                className: "flex min-w-0 flex-col gap-1.5",
                children: [
                  (0, t.jsx)(s.l, { height: 14, width: 112 }),
                  (0, t.jsx)(s.l, { height: 12, width: 64 }),
                ],
              }),
            ],
          })),
          (u[3] = n))
        : (n = u[3]),
      u[4] === Symbol.for("react.memo_cache_sentinel")
        ? ((l = (0, t.jsxs)("div", {
            className: "flex flex-col items-end gap-1",
            children: [
              (0, t.jsx)(s.l, { height: 10, width: 40 }),
              (0, t.jsx)(s.l, { height: 14, width: 64 }),
            ],
          })),
          (u[4] = l))
        : (l = u[4]),
      u[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, t.jsxs)("div", {
            className: "flex shrink-0 items-center gap-3",
            children: [
              l,
              (0, t.jsxs)("div", {
                className: "flex flex-col items-end gap-1",
                children: [
                  (0, t.jsx)(s.l, { height: 10, width: 32 }),
                  (0, t.jsx)(s.l, { height: 14, width: 56 }),
                ],
              }),
            ],
          })),
          (u[5] = d))
        : (d = u[5]),
      u[6] !== a
        ? ((c = (0, t.jsxs)("div", {
            "data-testid": "callout-position-insert-skeleton",
            className: a,
            children: [n, d],
          })),
          (u[6] = a),
          (u[7] = c))
        : (c = u[7]),
      c
    );
  }
  function c(e) {
    let a,
      r,
      n,
      l,
      d = (0, i.c)(6),
      { className: c } = e;
    return (
      d[0] !== c
        ? ((a = (0, o.c)(
            "flex w-full items-center gap-2 rounded-xl bg-bg-secondary p-3",
            c,
          )),
          (d[0] = c),
          (d[1] = a))
        : (a = d[1]),
      d[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((r = (0, t.jsx)(s.l, { variant: "art", size: 40 })),
          (n = (0, t.jsx)(s.l, { className: "flex-1", height: 14 })),
          (d[2] = r),
          (d[3] = n))
        : ((r = d[2]), (n = d[3])),
      d[4] !== a
        ? ((l = (0, t.jsxs)("div", {
            "data-testid": "callout-position-flat-insert-skeleton",
            className: a,
            children: [r, n],
          })),
          (d[4] = a),
          (d[5] = l))
        : (l = d[5]),
      l
    );
  }
  e.s(
    [
      "F",
      0,
      function (e) {
        let r,
          n,
          u,
          m = (0, i.c)(18),
          {
            density: p,
            rows: h,
            insert: f,
            contentGap: g,
            className: x,
            rowClassName: v,
            "data-testid": y,
          } = e,
          w = void 0 === h ? 4 : h,
          b = void 0 === f ? "framed" : f,
          j = void 0 === g ? "sm" : g,
          N = void 0 === y ? "callout-feed-card-skeleton" : y,
          C = (0, a.useRef)(null),
          S = l({ ref: C }) ?? p,
          M = "terminal" === S;
        if (
          (m[0] !== x
            ? ((r = (0, o.c)("flex flex-col", x)), (m[0] = x), (m[1] = r))
            : (r = m[1]),
          m[2] !== j || m[3] !== b || m[4] !== v || m[5] !== w || m[6] !== M)
        ) {
          let e;
          (m[8] !== j || m[9] !== b || m[10] !== v || m[11] !== M
            ? ((e = (e, i) =>
                (0, t.jsxs)(
                  "div",
                  {
                    className: (0, o.c)(
                      "flex",
                      M ? "gap-2 py-2" : "gap-3 py-4",
                      v,
                    ),
                    children: [
                      (0, t.jsx)(s.l, { variant: "circle", size: M ? 32 : 36 }),
                      (0, t.jsxs)("div", {
                        className: (0, o.c)(
                          "flex min-w-0 flex-1 flex-col",
                          M ? "gap-1" : "gap-1.5",
                        ),
                        children: [
                          (0, t.jsxs)("div", {
                            className: (0, o.c)(
                              "flex h-6 items-center",
                              M ? "gap-1.5" : "gap-2",
                            ),
                            children: [
                              (0, t.jsx)(s.l, {
                                height: M ? 12 : 14,
                                width: M ? 96 : 112,
                              }),
                              (0, t.jsx)(s.l, {
                                height: M ? 10 : 12,
                                width: M ? 40 : 48,
                              }),
                            ],
                          }),
                          (0, t.jsx)("div", {
                            className: "flex items-center py-0.5",
                            children: (0, t.jsx)(s.l, {
                              height: 14,
                              className: "w-4/5",
                            }),
                          }),
                          (0, t.jsxs)("div", {
                            className: (0, o.c)(
                              "flex w-full flex-col pt-1",
                              M ? "gap-1.5" : "md" === j ? "gap-3" : "gap-2",
                            ),
                            children: [
                              M
                                ? (0, t.jsx)(s.l, {
                                    height: 48,
                                    className: "w-full",
                                  })
                                : "flat" === b
                                  ? (0, t.jsx)(c, {})
                                  : (0, t.jsx)(d, {}),
                              (0, t.jsxs)("div", {
                                className: "flex h-6 items-center gap-2",
                                children: [
                                  (0, t.jsx)(s.l, { size: 14 }),
                                  (0, t.jsx)(s.l, { size: 14 }),
                                  (0, t.jsx)(s.l, { size: 14 }),
                                  (0, t.jsx)(s.l, { size: 14 }),
                                  (0, t.jsx)(s.l, {
                                    height: 10,
                                    width: 56,
                                    className: "ml-auto",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  i,
                )),
              (m[8] = j),
              (m[9] = b),
              (m[10] = v),
              (m[11] = M),
              (m[12] = e))
            : (e = m[12]),
            (n = Array.from({ length: w }, e)),
            (m[2] = j),
            (m[3] = b),
            (m[4] = v),
            (m[5] = w),
            (m[6] = M),
            (m[7] = n));
        } else n = m[7];
        return (
          m[13] !== S || m[14] !== r || m[15] !== n || m[16] !== N
            ? ((u = (0, t.jsx)("div", {
                ref: C,
                "aria-hidden": !0,
                "data-testid": N,
                "data-density": S,
                className: r,
                children: n,
              })),
              (m[13] = S),
              (m[14] = r),
              (m[15] = n),
              (m[16] = N),
              (m[17] = u))
            : (u = m[17]),
          u
        );
      },
      "R",
      0,
      c,
      "A",
      0,
      d,
    ],
    186434,
  );
  var u = e.i(79631),
    m = e.i(672287),
    p = e.i(889451),
    h = e.i(384886),
    f = e.i(223363);
  let g = (0, a.memo)(function (e) {
      let a,
        r,
        n = (0, i.c)(16),
        {
          mint: l,
          pnl: s,
          symbol: o,
          name: d,
          imageUri: c,
          chainId: u,
          variant: h,
          density: g,
          className: x,
        } = e,
        v = (0, m.f)(l);
      n[0] !== v || n[1] !== s
        ? ((a = (0, p.j)(s, v) ?? (0, p.y)(s)),
          (n[0] = v),
          (n[1] = s),
          (n[2] = a))
        : (a = n[2]);
      let y = a,
        w = y?.positionUsd ?? null,
        b = y?.isClosed ?? !1,
        j = y?.exitProceedsUsd ?? null,
        N = y?.netPnlUsd ?? null;
      return (
        n[3] !== u ||
        n[4] !== x ||
        n[5] !== g ||
        n[6] !== c ||
        n[7] !== l ||
        n[8] !== d ||
        n[9] !== o ||
        n[10] !== w ||
        n[11] !== b ||
        n[12] !== j ||
        n[13] !== N ||
        n[14] !== h
          ? ((r = (0, t.jsx)(f.f, {
              mint: l,
              symbol: o,
              name: d,
              imageUri: c,
              chainId: u,
              positionUsd: w,
              isClosed: b,
              exitProceedsUsd: j,
              netPnlUsd: N,
              variant: h,
              density: g,
              className: x,
            })),
            (n[3] = u),
            (n[4] = x),
            (n[5] = g),
            (n[6] = c),
            (n[7] = l),
            (n[8] = d),
            (n[9] = o),
            (n[10] = w),
            (n[11] = b),
            (n[12] = j),
            (n[13] = N),
            (n[14] = h),
            (n[15] = r))
          : (r = n[15]),
        r
      );
    }),
    x = (0, a.memo)((e) => {
      let a,
        r = (0, i.c)(16),
        {
          mint: n,
          authorAddress: l,
          positionPnl: o,
          positionRead: m,
          symbol: p,
          name: f,
          imageUri: x,
          chainId: v,
          variant: y,
          density: w,
          className: b,
          pollIntervalMs: j,
        } = e,
        N = void 0 === w ? "terminal" : w,
        C = !!o,
        S = !C && null == m,
        M = (0, h.h)(n, v),
        { positionFor: T, isLoading: k } = (0, u._)({
          userId: l,
          mints: [M],
          enabled: S,
          refetchIntervalMs: S ? j : void 0,
        }),
        R = o ?? (S ? (T(M) ?? T(n)) : m?.position),
        _ = S ? k : (m?.isLoading ?? !1);
      if (!C && _) {
        let e, i;
        return (
          r[0] !== N || r[1] !== y
            ? ((e =
                "strip" === y
                  ? (0, t.jsx)(s.l, { className: "h-12 w-full" })
                  : "comfortable" === N && (y ?? "feed") === "feed"
                    ? (0, t.jsx)(d, {})
                    : "comfortable" === N
                      ? (0, t.jsx)(c, {})
                      : (0, t.jsx)(s.l, {
                          className: "h-[60px] w-full rounded-xl",
                        })),
              (r[0] = N),
              (r[1] = y),
              (r[2] = e))
            : (e = r[2]),
          r[3] !== b || r[4] !== e
            ? ((i = (0, t.jsx)("div", {
                "aria-hidden": !0,
                "data-testid": "callout-position-skeleton",
                className: b,
                children: e,
              })),
              (r[3] = b),
              (r[4] = e),
              (r[5] = i))
            : (i = r[5]),
          i
        );
      }
      return (
        r[6] !== v ||
        r[7] !== b ||
        r[8] !== N ||
        r[9] !== x ||
        r[10] !== n ||
        r[11] !== f ||
        r[12] !== R ||
        r[13] !== p ||
        r[14] !== y
          ? ((a = (0, t.jsx)(g, {
              mint: n,
              pnl: R,
              symbol: p,
              name: f,
              imageUri: x,
              chainId: v,
              variant: y,
              density: N,
              className: b,
            })),
            (r[6] = v),
            (r[7] = b),
            (r[8] = N),
            (r[9] = x),
            (r[10] = n),
            (r[11] = f),
            (r[12] = R),
            (r[13] = p),
            (r[14] = y),
            (r[15] = a))
          : (a = r[15]),
        a
      );
    });
  e.s(["f", 0, x], 335703);
};
