// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(844510),
    a = e.i(248496),
    r = e.i(338319);
  let n = "group/coin-row",
    l = {
      terminal: `${s.a} ${n}`,
      comfortable: `${s.Q} ${n} relative flex min-h-14 items-center gap-3 py-2`,
    },
    o = { terminal: 24, comfortable: 36 },
    c = { terminal: "py-2", comfortable: "py-3" },
    d = { terminal: 32, comfortable: 40 },
    x = { terminal: "px-2", comfortable: "px-3" },
    h = { terminal: "ml-2", comfortable: "ml-3" },
    u = (e, t = !1) =>
      (0, r.c)(
        e && "-mx-[var(--screeners-pad,0px)]",
        "flex flex-col",
        t && s.c,
      ),
    f = (e) => Array.from({ length: e }, (e, t) => t),
    b = {
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
    n,
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
      let s,
        n,
        c,
        d = (0, i.c)(13),
        { density: x, rows: h, bleed: p } = e,
        m = void 0 === h ? 8 : h,
        y = void 0 === p || p,
        v = b[x];
      if (
        (d[0] !== y ? ((s = u(y)), (d[0] = y), (d[1] = s)) : (s = d[1]),
        d[2] !== x || d[3] !== v || d[4] !== m)
      ) {
        let e;
        (d[6] !== x || d[7] !== v
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, r.c)(l[x], "hover:bg-transparent"),
                  children: [
                    (0, t.jsx)(a.l, { variant: "art", size: o[x] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(a.l, { height: v.name, width: 112 }),
                        (0, t.jsx)(a.l, { height: v.meta, width: 48 }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex shrink-0 flex-col items-end gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(a.l, { height: v.name, width: 48 }),
                        (0, t.jsx)(a.l, { height: v.meta, width: 40 }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (d[6] = x),
            (d[7] = v),
            (d[8] = e))
          : (e = d[8]),
          (n = f(m).map(e)),
          (d[2] = x),
          (d[3] = v),
          (d[4] = m),
          (d[5] = n));
      } else n = d[5];
      return (
        d[9] !== x || d[10] !== s || d[11] !== n
          ? ((c = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-coin-row-skeleton",
              "data-density": x,
              className: s,
              children: n,
            })),
            (d[9] = x),
            (d[10] = s),
            (d[11] = n),
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
    h,
    "$",
    0,
    x,
    "E",
    0,
    function (e) {
      let n,
        l,
        o,
        m = (0, i.c)(13),
        { density: y, rows: v, bleed: g } = e,
        w = void 0 === v ? 6 : v,
        _ = void 0 === g || g,
        N = b[y];
      if (
        (m[0] !== _ ? ((n = u(_, !0)), (m[0] = _), (m[1] = n)) : (n = m[1]),
        m[2] !== y || m[3] !== N || m[4] !== w)
      ) {
        let e;
        (m[6] !== y || m[7] !== N
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, r.c)(
                    s.Q,
                    c[y],
                    "flex items-start hover:bg-transparent",
                  ),
                  children: [
                    (0, t.jsx)(a.l, { variant: "art", size: d[y] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-start",
                          children: [
                            (0, t.jsxs)("div", {
                              className: (0, r.c)("min-w-0 flex-1", x[y]),
                              children: [
                                (0, t.jsx)("div", {
                                  className: p[y],
                                  children: (0, t.jsx)(a.l, {
                                    height: N.name,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "mt-0.5 flex h-4 items-center gap-2",
                                  children: [
                                    (0, t.jsx)(a.l, {
                                      height: N.meta,
                                      width: 48,
                                    }),
                                    (0, t.jsx)(a.l, {
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
                                  children: (0, t.jsx)(a.l, {
                                    height: N.meta,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex h-4 items-center",
                                  children: (0, t.jsx)(a.l, {
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
                              className: (0, r.c)(
                                "flex h-4 items-center",
                                h[y],
                              ),
                              children: (0, t.jsx)(a.l, {
                                height: N.meta,
                                width: 144,
                              }),
                            }),
                            (0, t.jsx)("div", {
                              className: "flex h-4 items-center",
                              children: (0, t.jsx)(a.l, {
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
            (m[6] = y),
            (m[7] = N),
            (m[8] = e))
          : (e = m[8]),
          (l = f(w).map(e)),
          (m[2] = y),
          (m[3] = N),
          (m[4] = w),
          (m[5] = l));
      } else l = m[5];
      return (
        m[9] !== y || m[10] !== n || m[11] !== l
          ? ((o = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-pro-row-skeleton",
              "data-density": y,
              className: n,
              children: l,
            })),
            (m[9] = y),
            (m[10] = n),
            (m[11] = l),
            (m[12] = o))
          : (o = m[12]),
        o
      );
    },
  ]);
};
