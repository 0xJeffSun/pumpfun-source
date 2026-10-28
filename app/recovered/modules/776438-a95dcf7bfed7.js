// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(338319);
  let l = {
      terminal: "text-[11px] leading-4 font-normal text-text-quaternary",
      comfortable: "text-xs leading-4 font-normal text-text-quaternary",
    },
    r = {
      terminal:
        "text-[13px] leading-4 font-medium tabular-nums text-text-primary",
      comfortable:
        "text-sm leading-5 font-medium tabular-nums text-text-primary",
    },
    n = {
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
    l,
    "D",
    0,
    function (e) {
      let o,
        s,
        d,
        c,
        u,
        m,
        f,
        p,
        h,
        b,
        y,
        x,
        v,
        g,
        w,
        k,
        C = (0, i.c)(34);
      C[0] !== e
        ? (({
            density: d,
            label: f,
            children: o,
            hint: m,
            align: b,
            className: s,
            labelClassName: p,
            figureClassName: c,
            figureTestId: u,
            ...h
          } = e),
          (C[0] = e),
          (C[1] = o),
          (C[2] = s),
          (C[3] = d),
          (C[4] = c),
          (C[5] = u),
          (C[6] = m),
          (C[7] = f),
          (C[8] = p),
          (C[9] = h),
          (C[10] = b))
        : ((o = C[1]),
          (s = C[2]),
          (d = C[3]),
          (c = C[4]),
          (u = C[5]),
          (m = C[6]),
          (f = C[7]),
          (p = C[8]),
          (h = C[9]),
          (b = C[10]));
      let N = n[void 0 === b ? "start" : b];
      C[11] !== s || C[12] !== N
        ? ((y = (0, a.c)("flex min-w-0 flex-col gap-0.5", N, s)),
          (C[11] = s),
          (C[12] = N),
          (C[13] = y))
        : (y = C[13]);
      let j = l[d];
      (C[14] !== p || C[15] !== j
        ? ((x = (0, a.c)("flex min-w-0 items-center gap-1", j, p)),
          (C[14] = p),
          (C[15] = j),
          (C[16] = x))
        : (x = C[16]),
        C[17] !== m || C[18] !== f || C[19] !== x
          ? ((v = (0, t.jsxs)("span", { className: x, children: [f, m] })),
            (C[17] = m),
            (C[18] = f),
            (C[19] = x),
            (C[20] = v))
          : (v = C[20]));
      let I = r[d];
      return (
        C[21] !== c || C[22] !== I
          ? ((g = (0, a.c)("min-w-0 max-w-full truncate", I, c)),
            (C[21] = c),
            (C[22] = I),
            (C[23] = g))
          : (g = C[23]),
        C[24] !== o || C[25] !== u || C[26] !== g
          ? ((w = (0, t.jsx)("span", {
              "data-testid": u,
              className: g,
              children: o,
            })),
            (C[24] = o),
            (C[25] = u),
            (C[26] = g),
            (C[27] = w))
          : (w = C[27]),
        C[28] !== d || C[29] !== h || C[30] !== y || C[31] !== v || C[32] !== w
          ? ((k = (0, t.jsxs)("div", {
              ...h,
              "data-stat-tile": !0,
              "data-density": d,
              className: y,
              children: [v, w],
            })),
            (C[28] = d),
            (C[29] = h),
            (C[30] = y),
            (C[31] = v),
            (C[32] = w),
            (C[33] = k))
          : (k = C[33]),
        k
      );
    },
  ]);
};
