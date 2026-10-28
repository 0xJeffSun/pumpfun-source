// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(844510),
    a = e.i(248496),
    i = e.i(338319);
  let s = "group/coin-row",
    n = {
      terminal: `${l.a} ${s}`,
      comfortable: `${l.Q} ${s} relative flex min-h-14 items-center gap-3 py-2`,
    },
    o = { terminal: 24, comfortable: 36 },
    u = { terminal: "py-2", comfortable: "py-3" },
    c = { terminal: 32, comfortable: 40 },
    d = { terminal: "px-2", comfortable: "px-3" },
    m = { terminal: "ml-2", comfortable: "ml-3" },
    f = (e, t = !1) =>
      (0, i.c)(
        e && "-mx-[var(--screeners-pad,0px)]",
        "flex flex-col",
        t && l.c,
      ),
    p = (e) => Array.from({ length: e }, (e, t) => t),
    h = {
      terminal: { name: 12, meta: 10 },
      comfortable: { name: 14, meta: 12 },
    },
    g = {
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
      let l,
        s,
        u,
        c = (0, r.c)(13),
        { density: d, rows: m, bleed: g } = e,
        x = void 0 === m ? 8 : m,
        b = void 0 === g || g,
        w = h[d];
      if (
        (c[0] !== b ? ((l = f(b)), (c[0] = b), (c[1] = l)) : (l = c[1]),
        c[2] !== d || c[3] !== w || c[4] !== x)
      ) {
        let e;
        (c[6] !== d || c[7] !== w
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, i.c)(n[d], "hover:bg-transparent"),
                  children: [
                    (0, t.jsx)(a.l, { variant: "art", size: o[d] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(a.l, { height: w.name, width: 112 }),
                        (0, t.jsx)(a.l, { height: w.meta, width: 48 }),
                      ],
                    }),
                    (0, t.jsxs)("div", {
                      className:
                        "flex shrink-0 flex-col items-end gap-1 py-0.5",
                      children: [
                        (0, t.jsx)(a.l, { height: w.name, width: 48 }),
                        (0, t.jsx)(a.l, { height: w.meta, width: 40 }),
                      ],
                    }),
                  ],
                },
                e,
              )),
            (c[6] = d),
            (c[7] = w),
            (c[8] = e))
          : (e = c[8]),
          (s = p(x).map(e)),
          (c[2] = d),
          (c[3] = w),
          (c[4] = x),
          (c[5] = s));
      } else s = c[5];
      return (
        c[9] !== d || c[10] !== l || c[11] !== s
          ? ((u = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-coin-row-skeleton",
              "data-density": d,
              className: l,
              children: s,
            })),
            (c[9] = d),
            (c[10] = l),
            (c[11] = s),
            (c[12] = u))
          : (u = c[12]),
        u
      );
    },
    "y",
    0,
    c,
    "_",
    0,
    u,
    "j",
    0,
    m,
    "$",
    0,
    d,
    "E",
    0,
    function (e) {
      let s,
        n,
        o,
        x = (0, r.c)(13),
        { density: b, rows: w, bleed: y } = e,
        v = void 0 === w ? 6 : w,
        E = void 0 === y || y,
        k = h[b];
      if (
        (x[0] !== E ? ((s = f(E, !0)), (x[0] = E), (x[1] = s)) : (s = x[1]),
        x[2] !== b || x[3] !== k || x[4] !== v)
      ) {
        let e;
        (x[6] !== b || x[7] !== k
          ? ((e = (e) =>
              (0, t.jsxs)(
                "div",
                {
                  className: (0, i.c)(
                    l.Q,
                    u[b],
                    "flex items-start hover:bg-transparent",
                  ),
                  children: [
                    (0, t.jsx)(a.l, { variant: "art", size: c[b] }),
                    (0, t.jsxs)("div", {
                      className: "flex min-w-0 flex-1 flex-col",
                      children: [
                        (0, t.jsxs)("div", {
                          className: "flex items-start",
                          children: [
                            (0, t.jsxs)("div", {
                              className: (0, i.c)("min-w-0 flex-1", d[b]),
                              children: [
                                (0, t.jsx)("div", {
                                  className: g[b],
                                  children: (0, t.jsx)(a.l, {
                                    height: k.name,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsxs)("div", {
                                  className:
                                    "mt-0.5 flex h-4 items-center gap-2",
                                  children: [
                                    (0, t.jsx)(a.l, {
                                      height: k.meta,
                                      width: 48,
                                    }),
                                    (0, t.jsx)(a.l, {
                                      height: k.meta,
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
                                    height: k.meta,
                                    width: 96,
                                  }),
                                }),
                                (0, t.jsx)("div", {
                                  className: "flex h-4 items-center",
                                  children: (0, t.jsx)(a.l, {
                                    height: k.meta,
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
                              children: (0, t.jsx)(a.l, {
                                height: k.meta,
                                width: 144,
                              }),
                            }),
                            (0, t.jsx)("div", {
                              className: "flex h-4 items-center",
                              children: (0, t.jsx)(a.l, {
                                height: k.meta,
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
            (x[6] = b),
            (x[7] = k),
            (x[8] = e))
          : (e = x[8]),
          (n = p(v).map(e)),
          (x[2] = b),
          (x[3] = k),
          (x[4] = v),
          (x[5] = n));
      } else n = x[5];
      return (
        x[9] !== b || x[10] !== s || x[11] !== n
          ? ((o = (0, t.jsx)("div", {
              "aria-hidden": !0,
              "data-testid": "rail-pro-row-skeleton",
              "data-density": b,
              className: s,
              children: n,
            })),
            (x[9] = b),
            (x[10] = s),
            (x[11] = n),
            (x[12] = o))
          : (o = x[12]),
        o
      );
    },
  ]);
};
