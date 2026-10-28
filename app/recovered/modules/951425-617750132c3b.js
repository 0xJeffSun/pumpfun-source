// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(844510),
    a = e.i(248496),
    n = e.i(338319);
  let s = "group/coin-row",
    l = {
      terminal: `${r.a} ${s}`,
      comfortable: `${r.Q} ${s} relative flex min-h-14 items-center gap-3 py-2`,
    },
    o = { terminal: 24, comfortable: 36 },
    c = { terminal: "py-2", comfortable: "py-3" },
    m = { terminal: 32, comfortable: 40 },
    d = { terminal: "px-2", comfortable: "px-3" },
    h = { terminal: "ml-2", comfortable: "ml-3" },
    u = (e, t = !1) =>
      (0, n.c)(
        e && "-mx-[var(--screeners-pad,0px)]",
        "flex flex-col",
        t && r.c,
      ),
    f = (e) => Array.from({ length: e }, (e, t) => t),
    x = {
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
    l,
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
    s,
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
        s,
        c,
        m = (0, i.c)(13),
        { density: d, rows: h, bleed: p } = e,
        g = void 0 === h ? 8 : h,
        y = void 0 === p || p,
        b = x[d];
      if (
        (m[0] !== y ? ((r = u(y)), (m[0] = y), (m[1] = r)) : (r = m[1]),
        m[2] !== d || m[3] !== b || m[4] !== g)
      ) {
        let e;
        (m[6] !== d || m[7] !== b
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, n.c)(l[d], "hover:bg-transparent"),
                  children: [
                    (0, t.jsx)(a.l, { variant: "art", size: o[d] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(a.l, { height: b.name, width: 112 }),
                        (0, t.jsx)(a.l, { height: b.meta, width: 48 }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex shrink-0 flex-col items-end gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(a.l, { height: b.name, width: 48 }),
                        (0, t.jsx)(a.l, { height: b.meta, width: 40 }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (m[6] = d),
            (m[7] = b),
            (m[8] = e))
          : (e = m[8]),
          (s = f(g).map(e)),
          (m[2] = d),
          (m[3] = b),
          (m[4] = g),
          (m[5] = s));
      } else s = m[5];
      return (
        m[9] !== d || m[10] !== r || m[11] !== s
          ? ((c = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-coin-row-skeleton",
              "data-density": d,
              className: r,
              children: s,
            })),
            (m[9] = d),
            (m[10] = r),
            (m[11] = s),
            (m[12] = c))
          : (c = m[12]),
        c
      );
    },
    "y",
    0,
    m,
    "_",
    0,
    c,
    "j",
    0,
    h,
    "$",
    0,
    d,
    "E",
    0,
    function (e) {
      let s,
        l,
        o,
        g = (0, i.c)(13),
        { density: y, rows: b, bleed: w } = e,
        v = void 0 === b ? 6 : b,
        _ = void 0 === w || w,
        j = x[y];
      if (
        (g[0] !== _ ? ((s = u(_, !0)), (g[0] = _), (g[1] = s)) : (s = g[1]),
        g[2] !== y || g[3] !== j || g[4] !== v)
      ) {
        let e;
        (g[6] !== y || g[7] !== j
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, n.c)(
                    r.Q,
                    c[y],
                    "flex items-start hover:bg-transparent",
                  ),
                  children: [
                    (0, t.jsx)(a.l, { variant: "art", size: m[y] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-start",
                          children: [
                            (0, t.jsxs)("div", {
                              className: (0, n.c)("min-w-0 flex-1", d[y]),
                              children: [
                                (0, t.jsx)("div", {
                                  className: p[y],
                                  children: (0, t.jsx)(a.l, {
                                    height: j.name,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "mt-0.5 flex h-4 items-center gap-2",
                                  children: [
                                    (0, t.jsx)(a.l, {
                                      height: j.meta,
                                      width: 48,
                                    }),
                                    (0, t.jsx)(a.l, {
                                      height: j.meta,
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
                                  children: (0, t.jsx)(a.l, {
                                    height: j.meta,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex h-4 items-center",
                                  children: (0, t.jsx)(a.l, {
                                    height: j.meta,
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
                              className: (0, n.c)(
                                "flex h-4 items-center",
                                h[y],
                              ),
                              children: (0, t.jsx)(a.l, {
                                height: j.meta,
                                width: 144,
                              }),
                            }),
                            (0, t.jsx)("div", {
                              className: "flex h-4 items-center",
                              children: (0, t.jsx)(a.l, {
                                height: j.meta,
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
            (g[6] = y),
            (g[7] = j),
            (g[8] = e))
          : (e = g[8]),
          (l = f(v).map(e)),
          (g[2] = y),
          (g[3] = j),
          (g[4] = v),
          (g[5] = l));
      } else l = g[5];
      return (
        g[9] !== y || g[10] !== s || g[11] !== l
          ? ((o = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-pro-row-skeleton",
              "data-density": y,
              className: s,
              children: l,
            })),
            (g[9] = y),
            (g[10] = s),
            (g[11] = l),
            (g[12] = o))
          : (o = g[12]),
        o
      );
    },
  ]);
};
