// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(338319);
  let i = {
      terminal: "text-[11px] leading-4 font-normal text-text-quaternary",
      comfortable: "text-xs leading-4 font-normal text-text-quaternary",
    },
    a = {
      terminal:
        "text-[13px] leading-4 font-medium tabular-nums text-text-primary",
      comfortable:
        "text-sm leading-5 font-medium tabular-nums text-text-primary",
    },
    s = {
      start: "items-start text-left",
      center: "items-center text-center",
      end: "items-end text-right",
    };
  e.s([
    "F",
    0,
    "grid gap-x-6 gap-y-3",
    "X",
    0,
    i,
    "D",
    0,
    function (e) {
      let n,
        o,
        d,
        c,
        u,
        m,
        p,
        f,
        x,
        h,
        g,
        y,
        v,
        b,
        w,
        j,
        N = (0, l.c)(34);
      N[0] !== e
        ? (({
            density: d,
            label: p,
            children: n,
            hint: m,
            align: h,
            className: o,
            labelClassName: f,
            figureClassName: c,
            figureTestId: u,
            ...x
          } = e),
          (N[0] = e),
          (N[1] = n),
          (N[2] = o),
          (N[3] = d),
          (N[4] = c),
          (N[5] = u),
          (N[6] = m),
          (N[7] = p),
          (N[8] = f),
          (N[9] = x),
          (N[10] = h))
        : ((n = N[1]),
          (o = N[2]),
          (d = N[3]),
          (c = N[4]),
          (u = N[5]),
          (m = N[6]),
          (p = N[7]),
          (f = N[8]),
          (x = N[9]),
          (h = N[10]));
      let I = s[void 0 === h ? "start" : h];
      N[11] !== o || N[12] !== I
        ? ((g = (0, r.c)("flex min-w-0 flex-col gap-0.5", I, o)),
          (N[11] = o),
          (N[12] = I),
          (N[13] = g))
        : (g = N[13]);
      let _ = i[d];
      (N[14] !== f || N[15] !== _
        ? ((y = (0, r.c)("flex min-w-0 items-center gap-1", _, f)),
          (N[14] = f),
          (N[15] = _),
          (N[16] = y))
        : (y = N[16]),
        N[17] !== m || N[18] !== p || N[19] !== y
          ? ((v = (0, t.jsxs)("span", { className: y, children: [p, m] })),
            (N[17] = m),
            (N[18] = p),
            (N[19] = y),
            (N[20] = v))
          : (v = N[20]));
      let k = a[d];
      return (
        N[21] !== c || N[22] !== k
          ? ((b = (0, r.c)("min-w-0 max-w-full truncate", k, c)),
            (N[21] = c),
            (N[22] = k),
            (N[23] = b))
          : (b = N[23]),
        N[24] !== n || N[25] !== u || N[26] !== b
          ? ((w = (0, t.jsx)("span", {
              "data-testid": u,
              className: b,
              children: n,
            })),
            (N[24] = n),
            (N[25] = u),
            (N[26] = b),
            (N[27] = w))
          : (w = N[27]),
        N[28] !== d || N[29] !== x || N[30] !== g || N[31] !== v || N[32] !== w
          ? ((j = (0, t.jsxs)("div", {
              ...x,
              "data-stat-tile": !0,
              "data-density": d,
              className: g,
              children: [v, w],
            })),
            (N[28] = d),
            (N[29] = x),
            (N[30] = g),
            (N[31] = v),
            (N[32] = w),
            (N[33] = j))
          : (j = N[33]),
        j
      );
    },
  ]);
};
