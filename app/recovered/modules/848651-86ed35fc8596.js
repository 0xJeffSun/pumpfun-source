// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(375670),
    i = e.i(65231);
  let s = [
      { media: !0, summaryLines: 0 },
      { media: !1, summaryLines: 3 },
      { media: !0, summaryLines: 0 },
      { media: !1, summaryLines: 2 },
    ],
    a = (e) => {
      let s,
        a,
        o,
        l,
        u,
        d,
        m,
        p,
        w,
        g,
        b = (0, r.c)(17),
        { media: h, summaryLines: v } = e;
      return (
        b[0] !== h
          ? ((s = h
              ? (0, t.jsx)(n.f, {
                  className: "aspect-[4/3] w-full rounded-none bg-bg-tertiary",
                })
              : null),
            (b[0] = h),
            (b[1] = s))
          : (s = b[1]),
        b[2] !== h
          ? ((a = h
              ? null
              : (0, t.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    (0, t.jsx)(n.f, {
                      className: "h-6 w-16 rounded-full bg-bg-tertiary",
                    }),
                    (0, t.jsx)(n.f, {
                      className: "h-6 w-24 rounded-full bg-bg-tertiary",
                    }),
                  ],
                })),
            (b[2] = h),
            (b[3] = a))
          : (a = b[3]),
        b[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = (0, t.jsx)(n.f, { className: "h-4 w-11/12 bg-bg-tertiary" })),
            (l = (0, t.jsx)(n.f, { className: "h-4 w-3/4 bg-bg-tertiary" })),
            (b[4] = o),
            (b[5] = l))
          : ((o = b[4]), (l = b[5])),
        b[6] !== v
          ? ((u = Array.from({ length: v }, c).map(f)), (b[6] = v), (b[7] = u))
          : (u = b[7]),
        b[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, t.jsx)(n.f, { className: "h-5 w-28 bg-bg-tertiary" })),
            (m = (0, t.jsx)(n.f, {
              className: "h-12 w-full rounded-lg bg-bg-tertiary",
            })),
            (b[8] = d),
            (b[9] = m))
          : ((d = b[8]), (m = b[9])),
        b[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = (0, t.jsxs)("div", {
              className: "flex items-center justify-between gap-2",
              children: [
                (0, t.jsx)(n.f, { className: "h-3 w-20 bg-bg-tertiary" }),
                (0, t.jsx)(n.f, {
                  className: "h-7 w-14 rounded-full bg-bg-tertiary",
                }),
              ],
            })),
            (b[10] = p))
          : (p = b[10]),
        b[11] !== a || b[12] !== u
          ? ((w = (0, t.jsxs)("div", {
              className: "flex flex-col gap-2.5 p-3.5 sm:gap-[9px] sm:p-3.5",
              children: [a, o, l, u, d, m, p],
            })),
            (b[11] = a),
            (b[12] = u),
            (b[13] = w))
          : (w = b[13]),
        b[14] !== s || b[15] !== w
          ? ((g = (0, t.jsxs)("article", {
              className: `${i.v} pointer-events-none`,
              children: [s, w],
            })),
            (b[14] = s),
            (b[15] = w),
            (b[16] = g))
          : (g = b[16]),
        g
      );
    };
  function o(e, t) {
    return `bounties-feed-skeleton-${t}`;
  }
  function l(e) {
    return (0, t.jsxs)(
      "div",
      {
        className:
          "flex min-h-[112px] gap-3 border-b border-border-secondary px-4 py-3 sm:px-6 sm:py-3.5",
        children: [
          (0, t.jsx)(n.f, {
            className: "size-[84px] shrink-0 rounded-[10px] bg-bg-tertiary",
          }),
          (0, t.jsxs)("div", {
            className: "flex min-w-0 flex-1 flex-col gap-2.5",
            children: [
              (0, t.jsx)(n.f, { className: "h-4 w-3/4 bg-bg-tertiary" }),
              (0, t.jsx)(n.f, { className: "h-3 w-1/2 bg-bg-tertiary" }),
              (0, t.jsx)(n.f, { className: "h-3 w-5/6 bg-bg-tertiary" }),
              (0, t.jsxs)("div", {
                className: "mt-auto flex items-center justify-between gap-3",
                children: [
                  (0, t.jsx)(n.f, { className: "h-3 w-24 bg-bg-tertiary" }),
                  (0, t.jsx)(n.f, {
                    className: "h-7 w-16 rounded-full bg-bg-tertiary",
                  }),
                ],
              }),
            ],
          }),
        ],
      },
      e,
    );
  }
  function u(e, r) {
    let n = s[r % s.length];
    return (0, t.jsx)(
      "div",
      {
        className: i.K,
        children: (0, t.jsx)(a, {
          media: n.media,
          summaryLines: n.summaryLines,
        }),
      },
      e,
    );
  }
  function d(e, r) {
    let n = s[r % s.length];
    return (0, t.jsx)(a, { media: n.media, summaryLines: n.summaryLines }, e);
  }
  function c(e, t) {
    return `summary-line-${t}`;
  }
  function f(e) {
    return (0, t.jsx)(n.f, { className: "h-3 w-full bg-bg-tertiary" }, e);
  }
  e.s([
    "f",
    0,
    (e) => {
      let n,
        s,
        a,
        c,
        f = (0, r.c)(20),
        {
          viewMode: m,
          cardLayout: p,
          count: w,
          label: g,
          masonryClassName: b,
        } = e,
        h = void 0 === p ? "masonry" : p,
        v = void 0 === g ? "Loading bounties" : g,
        y = void 0 === b ? i.o : b,
        x = w ?? ("list" === m ? 8 : 10);
      f[0] !== x
        ? ((n = Array.from({ length: x }, o)), (f[0] = x), (f[1] = n))
        : (n = f[1]);
      let S = n;
      if ("list" === m) {
        let e, r, n;
        return (
          f[2] !== v
            ? ((e = (0, t.jsx)("span", { className: "sr-only", children: v })),
              (f[2] = v),
              (f[3] = e))
            : (e = f[3]),
          f[4] !== S
            ? ((r = (0, t.jsx)("div", {
                className: "flex w-full min-w-0 flex-col",
                children: S.map(l),
              })),
              (f[4] = S),
              (f[5] = r))
            : (r = f[5]),
          f[6] !== v || f[7] !== e || f[8] !== r
            ? ((n = (0, t.jsxs)("div", {
                "aria-label": v,
                className: "w-full min-w-0",
                role: "status",
                children: [e, r],
              })),
              (f[6] = v),
              (f[7] = e),
              (f[8] = r),
              (f[9] = n))
            : (n = f[9]),
          n
        );
      }
      return (
        f[10] !== v
          ? ((s = (0, t.jsx)("span", { className: "sr-only", children: v })),
            (f[10] = v),
            (f[11] = s))
          : (s = f[11]),
        f[12] !== h || f[13] !== y || f[14] !== S
          ? ((a =
              "masonry" === h
                ? (0, t.jsx)("div", {
                    className: "@container w-full min-w-0",
                    children: (0, t.jsx)("div", {
                      className: y,
                      children: S.map(u),
                    }),
                  })
                : (0, t.jsx)("div", { className: i.J, children: S.map(d) })),
            (f[12] = h),
            (f[13] = y),
            (f[14] = S),
            (f[15] = a))
          : (a = f[15]),
        f[16] !== v || f[17] !== s || f[18] !== a
          ? ((c = (0, t.jsxs)("div", {
              "aria-label": v,
              className: "w-full min-w-0",
              role: "status",
              children: [s, a],
            })),
            (f[16] = v),
            (f[17] = s),
            (f[18] = a),
            (f[19] = c))
          : (c = f[19]),
        c
      );
    },
  ]);
};
