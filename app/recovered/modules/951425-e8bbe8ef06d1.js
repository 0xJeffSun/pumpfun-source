// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(844510),
    n = e.i(248496),
    i = e.i(338319);
  let a = "group/coin-row",
    s = {
      terminal: `${r.a} ${a}`,
      comfortable: `${r.Q} ${a} relative flex min-h-14 items-center gap-3 py-2`,
    },
    o = { terminal: 24, comfortable: 36 },
    c = { terminal: "py-2", comfortable: "py-3" },
    d = { terminal: 32, comfortable: 40 },
    u = { terminal: "px-2", comfortable: "px-3" },
    m = { terminal: "ml-2", comfortable: "ml-3" },
    f = (e, t = !1) =>
      (0, i.c)(
        e && "-mx-[var(--screeners-pad,0px)]",
        "flex flex-col",
        t && r.c,
      ),
    x = (e) => Array.from({ length: e }, (e, t) => t),
    h = {
      terminal: { name: 12, meta: 10 },
      comfortable: { name: 14, meta: 12 },
    },
    p = {
      terminal: "flex h-4 items-center",
      comfortable: "flex h-5 items-center",
    };
  e.s([
    "s",
    0,
    o,
    "w",
    0,
    s,
    "e",
    0,
    {
      terminal:
        "text-[13px] font-medium leading-4 tabular-nums text-text-primary",
      comfortable:
        "text-sm font-medium leading-5 tabular-nums text-text-primary",
    },
    "q",
    0,
    a,
    "B",
    0,
    {
      terminal: "text-[11px] leading-4 text-text-quaternary",
      comfortable: "text-xs leading-4 text-text-quaternary",
    },
    "Y",
    0,
    { terminal: "gap-1.5", comfortable: "gap-2" },
    "G",
    0,
    {
      terminal: "h-4 w-0 shrink-0 -mr-1.5",
      comfortable: "h-4 w-0 shrink-0 -mr-2",
    },
    "z",
    0,
    "flex h-4 min-w-0 flex-initial flex-wrap content-start items-center overflow-hidden",
    "A",
    0,
    "flex min-w-0 items-center",
    "X",
    0,
    "min-w-0 flex-1 basis-0 truncate",
    "n",
    0,
    {
      terminal: "min-w-0 text-[13px] leading-4",
      comfortable: "min-w-0 text-sm leading-5",
    },
    "x",
    0,
    {
      terminal: "flex h-4 min-w-0 items-center gap-1",
      comfortable: "flex h-5 min-w-0 items-center gap-1",
    },
    "C",
    0,
    {
      terminal: "text-[11px] leading-4 tabular-nums",
      comfortable: "text-xs leading-4 tabular-nums",
    },
    "N",
    0,
    "flex h-4 items-center justify-end",
    "D",
    0,
    "ml-auto flex shrink-0 items-center",
    "o",
    0,
    { terminal: "ml-1.5", comfortable: "ml-2" },
    "t",
    0,
    function (e) {
      let r,
        a,
        c,
        d = (0, l.c)(13),
        { density: u, rows: m, bleed: p } = e,
        g = void 0 === m ? 8 : m,
        b = void 0 === p || p,
        v = h[u];
      if (
        (d[0] !== b ? ((r = f(b)), (d[0] = b), (d[1] = r)) : (r = d[1]),
        d[2] !== u || d[3] !== v || d[4] !== g)
      ) {
        let e;
        (d[6] !== u || d[7] !== v
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, i.c)(s[u], "hover:bg-transparent"),
                  children: [
                    (0, t.jsx)(n.l, { variant: "art", size: o[u] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(n.l, { height: v.name, width: 112 }),
                        (0, t.jsx)(n.l, { height: v.meta, width: 48 }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex shrink-0 flex-col items-end gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(n.l, { height: v.name, width: 48 }),
                        (0, t.jsx)(n.l, { height: v.meta, width: 40 }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (d[6] = u),
            (d[7] = v),
            (d[8] = e))
          : (e = d[8]),
          (a = x(g).map(e)),
          (d[2] = u),
          (d[3] = v),
          (d[4] = g),
          (d[5] = a));
      } else a = d[5];
      return (
        d[9] !== u || d[10] !== r || d[11] !== a
          ? ((c = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-coin-row-skeleton",
              "data-density": u,
              className: r,
              children: a,
            })),
            (d[9] = u),
            (d[10] = r),
            (d[11] = a),
            (d[12] = c))
          : (c = d[12]),
        c
      );
    },
    "y",
    0,
    d,
    "_",
    0,
    c,
    "j",
    0,
    m,
    "$",
    0,
    u,
    "E",
    0,
    function (e) {
      let a,
        s,
        o,
        g = (0, l.c)(13),
        { density: b, rows: v, bleed: y } = e,
        _ = void 0 === v ? 6 : v,
        j = void 0 === y || y,
        w = h[b];
      if (
        (g[0] !== j ? ((a = f(j, !0)), (g[0] = j), (g[1] = a)) : (a = g[1]),
        g[2] !== b || g[3] !== w || g[4] !== _)
      ) {
        let e;
        (g[6] !== b || g[7] !== w
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, i.c)(
                    r.Q,
                    c[b],
                    "flex items-start hover:bg-transparent",
                  ),
                  children: [
                    (0, t.jsx)(n.l, { variant: "art", size: d[b] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-start",
                          children: [
                            (0, t.jsxs)("div", {
                              className: (0, i.c)("min-w-0 flex-1", u[b]),
                              children: [
                                (0, t.jsx)("div", {
                                  className: p[b],
                                  children: (0, t.jsx)(n.l, {
                                    height: w.name,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "mt-0.5 flex h-4 items-center gap-2",
                                  children: [
                                    (0, t.jsx)(n.l, {
                                      height: w.meta,
                                      width: 48,
                                    }),
                                    (0, t.jsx)(n.l, {
                                      height: w.meta,
                                      width: 28,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, t.jsxs)("div", {
                              className:
                                "flex w-28 shrink-0 flex-col items-end gap-1.5 pl-2",
                              children: [
                                (0, t.jsx)("div", {
                                  className: "flex h-4 items-center",
                                  children: (0, t.jsx)(n.l, {
                                    height: w.meta,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex h-4 items-center",
                                  children: (0, t.jsx)(n.l, {
                                    height: w.meta,
                                    width: 56,
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, t.jsxs)("div", {
                          className: "mt-0.5 flex items-center justify-between",
                          children: [
                            (0, t.jsx)("div", {
                              className: (0, i.c)(
                                "flex h-4 items-center",
                                m[b],
                              ),
                              children: (0, t.jsx)(n.l, {
                                height: w.meta,
                                width: 144,
                              }),
                            }),
                            (0, t.jsx)("div", {
                              className: "flex h-4 items-center",
                              children: (0, t.jsx)(n.l, {
                                height: w.meta,
                                width: 32,
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (g[6] = b),
            (g[7] = w),
            (g[8] = e))
          : (e = g[8]),
          (s = x(_).map(e)),
          (g[2] = b),
          (g[3] = w),
          (g[4] = _),
          (g[5] = s));
      } else s = g[5];
      return (
        g[9] !== b || g[10] !== a || g[11] !== s
          ? ((o = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-pro-row-skeleton",
              "data-density": b,
              className: a,
              children: s,
            })),
            (g[9] = b),
            (g[10] = a),
            (g[11] = s),
            (g[12] = o))
          : (o = g[12]),
        o
      );
    },
  ]);
};
