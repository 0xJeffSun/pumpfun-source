// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(844510),
    r = e.i(248496),
    a = e.i(338319);
  let s = "group/coin-row",
    n = {
      terminal: `${i.a} ${s}`,
      comfortable: `${i.Q} ${s} relative flex min-h-14 items-center gap-3 py-2`,
    },
    o = { terminal: 24, comfortable: 36 },
    d = { terminal: "py-2", comfortable: "py-3" },
    m = { terminal: 32, comfortable: 40 },
    c = { terminal: "px-2", comfortable: "px-3" },
    u = { terminal: "ml-2", comfortable: "ml-3" },
    f = (e, t = !1) =>
      (0, a.c)(
        e && "-mx-[var(--screeners-pad,0px)]",
        "flex flex-col",
        t && i.c,
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
    n,
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
      let i,
        s,
        d,
        m = (0, l.c)(13),
        { density: c, rows: u, bleed: p } = e,
        v = void 0 === u ? 8 : u,
        b = void 0 === p || p,
        g = h[c];
      if (
        (m[0] !== b ? ((i = f(b)), (m[0] = b), (m[1] = i)) : (i = m[1]),
        m[2] !== c || m[3] !== g || m[4] !== v)
      ) {
        let e;
        (m[6] !== c || m[7] !== g
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, a.c)(n[c], "hover:bg-transparent"),
                  children: [
                    (0, t.jsx)(r.l, { variant: "art", size: o[c] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(r.l, { height: g.name, width: 112 }),
                        (0, t.jsx)(r.l, { height: g.meta, width: 48 }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex shrink-0 flex-col items-end gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(r.l, { height: g.name, width: 48 }),
                        (0, t.jsx)(r.l, { height: g.meta, width: 40 }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (m[6] = c),
            (m[7] = g),
            (m[8] = e))
          : (e = m[8]),
          (s = x(v).map(e)),
          (m[2] = c),
          (m[3] = g),
          (m[4] = v),
          (m[5] = s));
      } else s = m[5];
      return (
        m[9] !== c || m[10] !== i || m[11] !== s
          ? ((d = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-coin-row-skeleton",
              "data-density": c,
              className: i,
              children: s,
            })),
            (m[9] = c),
            (m[10] = i),
            (m[11] = s),
            (m[12] = d))
          : (d = m[12]),
        d
      );
    },
    "y",
    0,
    m,
    "_",
    0,
    d,
    "j",
    0,
    u,
    "$",
    0,
    c,
    "E",
    0,
    function (e) {
      let s,
        n,
        o,
        v = (0, l.c)(13),
        { density: b, rows: g, bleed: w } = e,
        y = void 0 === g ? 6 : g,
        j = void 0 === w || w,
        N = h[b];
      if (
        (v[0] !== j ? ((s = f(j, !0)), (v[0] = j), (v[1] = s)) : (s = v[1]),
        v[2] !== b || v[3] !== N || v[4] !== y)
      ) {
        let e;
        (v[6] !== b || v[7] !== N
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, a.c)(
                    i.Q,
                    d[b],
                    "flex items-start hover:bg-transparent",
                  ),
                  children: [
                    (0, t.jsx)(r.l, { variant: "art", size: m[b] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-start",
                          children: [
                            (0, t.jsxs)("div", {
                              className: (0, a.c)("min-w-0 flex-1", c[b]),
                              children: [
                                (0, t.jsx)("div", {
                                  className: p[b],
                                  children: (0, t.jsx)(r.l, {
                                    height: N.name,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "mt-0.5 flex h-4 items-center gap-2",
                                  children: [
                                    (0, t.jsx)(r.l, {
                                      height: N.meta,
                                      width: 48,
                                    }),
                                    (0, t.jsx)(r.l, {
                                      height: N.meta,
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
                                  children: (0, t.jsx)(r.l, {
                                    height: N.meta,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex h-4 items-center",
                                  children: (0, t.jsx)(r.l, {
                                    height: N.meta,
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
                              className: (0, a.c)(
                                "flex h-4 items-center",
                                u[b],
                              ),
                              children: (0, t.jsx)(r.l, {
                                height: N.meta,
                                width: 144,
                              }),
                            }),
                            (0, t.jsx)("div", {
                              className: "flex h-4 items-center",
                              children: (0, t.jsx)(r.l, {
                                height: N.meta,
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
            (v[6] = b),
            (v[7] = N),
            (v[8] = e))
          : (e = v[8]),
          (n = x(y).map(e)),
          (v[2] = b),
          (v[3] = N),
          (v[4] = y),
          (v[5] = n));
      } else n = v[5];
      return (
        v[9] !== b || v[10] !== s || v[11] !== n
          ? ((o = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-pro-row-skeleton",
              "data-density": b,
              className: s,
              children: n,
            })),
            (v[9] = b),
            (v[10] = s),
            (v[11] = n),
            (v[12] = o))
          : (o = v[12]),
        o
      );
    },
  ]);
};
