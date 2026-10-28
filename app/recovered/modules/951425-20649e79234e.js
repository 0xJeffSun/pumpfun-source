// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(844510),
    l = e.i(248496),
    n = e.i(338319);
  let a = "group/coin-row",
    s = {
      terminal: `${i.a} ${a}`,
      comfortable: `${i.Q} ${a} relative flex min-h-14 items-center gap-3 py-2`,
    },
    o = { terminal: 24, comfortable: 36 },
    d = { terminal: "py-2", comfortable: "py-3" },
    c = { terminal: 32, comfortable: 40 },
    u = { terminal: "px-2", comfortable: "px-3" },
    m = { terminal: "ml-2", comfortable: "ml-3" },
    h = (e, t = !1) =>
      (0, n.c)(
        e && "-mx-[var(--screeners-pad,0px)]",
        "flex flex-col",
        t && i.c,
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
      let i,
        a,
        d,
        c = (0, r.c)(13),
        { density: u, rows: m, bleed: p } = e,
        y = void 0 === m ? 8 : m,
        v = void 0 === p || p,
        w = x[u];
      if (
        (c[0] !== v ? ((i = h(v)), (c[0] = v), (c[1] = i)) : (i = c[1]),
        c[2] !== u || c[3] !== w || c[4] !== y)
      ) {
        let e;
        (c[6] !== u || c[7] !== w
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, n.c)(s[u], "hover:bg-transparent"),
                  children: [
                    (0, t.jsx)(l.l, { variant: "art", size: o[u] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(l.l, { height: w.name, width: 112 }),
                        (0, t.jsx)(l.l, { height: w.meta, width: 48 }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex shrink-0 flex-col items-end gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(l.l, { height: w.name, width: 48 }),
                        (0, t.jsx)(l.l, { height: w.meta, width: 40 }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (c[6] = u),
            (c[7] = w),
            (c[8] = e))
          : (e = c[8]),
          (a = f(y).map(e)),
          (c[2] = u),
          (c[3] = w),
          (c[4] = y),
          (c[5] = a));
      } else a = c[5];
      return (
        c[9] !== u || c[10] !== i || c[11] !== a
          ? ((d = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-coin-row-skeleton",
              "data-density": u,
              className: i,
              children: a,
            })),
            (c[9] = u),
            (c[10] = i),
            (c[11] = a),
            (c[12] = d))
          : (d = c[12]),
        d
      );
    },
    "y",
    0,
    c,
    "_",
    0,
    d,
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
        y = (0, r.c)(13),
        { density: v, rows: w, bleed: b } = e,
        g = void 0 === w ? 6 : w,
        j = void 0 === b || b,
        _ = x[v];
      if (
        (y[0] !== j ? ((a = h(j, !0)), (y[0] = j), (y[1] = a)) : (a = y[1]),
        y[2] !== v || y[3] !== _ || y[4] !== g)
      ) {
        let e;
        (y[6] !== v || y[7] !== _
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, n.c)(
                    i.Q,
                    d[v],
                    "flex items-start hover:bg-transparent",
                  ),
                  children: [
                    (0, t.jsx)(l.l, { variant: "art", size: c[v] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-start",
                          children: [
                            (0, t.jsxs)("div", {
                              className: (0, n.c)("min-w-0 flex-1", u[v]),
                              children: [
                                (0, t.jsx)("div", {
                                  className: p[v],
                                  children: (0, t.jsx)(l.l, {
                                    height: _.name,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "mt-0.5 flex h-4 items-center gap-2",
                                  children: [
                                    (0, t.jsx)(l.l, {
                                      height: _.meta,
                                      width: 48,
                                    }),
                                    (0, t.jsx)(l.l, {
                                      height: _.meta,
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
                                  children: (0, t.jsx)(l.l, {
                                    height: _.meta,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex h-4 items-center",
                                  children: (0, t.jsx)(l.l, {
                                    height: _.meta,
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
                                m[v],
                              ),
                              children: (0, t.jsx)(l.l, {
                                height: _.meta,
                                width: 144,
                              }),
                            }),
                            (0, t.jsx)("div", {
                              className: "flex h-4 items-center",
                              children: (0, t.jsx)(l.l, {
                                height: _.meta,
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
            (y[6] = v),
            (y[7] = _),
            (y[8] = e))
          : (e = y[8]),
          (s = f(g).map(e)),
          (y[2] = v),
          (y[3] = _),
          (y[4] = g),
          (y[5] = s));
      } else s = y[5];
      return (
        y[9] !== v || y[10] !== a || y[11] !== s
          ? ((o = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-pro-row-skeleton",
              "data-density": v,
              className: a,
              children: s,
            })),
            (y[9] = v),
            (y[10] = a),
            (y[11] = s),
            (y[12] = o))
          : (o = y[12]),
        o
      );
    },
  ]);
};
