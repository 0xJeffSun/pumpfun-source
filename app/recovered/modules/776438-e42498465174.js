// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(338319);
  let a = {
      terminal: "text-[11px] leading-4 font-normal text-text-quaternary",
      comfortable: "text-xs leading-4 font-normal text-text-quaternary",
    },
    n = {
      terminal:
        "text-[13px] leading-4 font-medium tabular-nums text-text-primary",
      comfortable:
        "text-sm leading-5 font-medium tabular-nums text-text-primary",
    },
    l = {
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
    a,
    "D",
    0,
    function (e) {
      let o,
        s,
        d,
        c,
        u,
        p,
        m,
        x,
        b,
        f,
        h,
        v,
        y,
        g,
        _,
        w,
        k = (0, i.c)(34);
      k[0] !== e
        ? (({
            density: d,
            label: m,
            children: o,
            hint: p,
            align: f,
            className: s,
            labelClassName: x,
            figureClassName: c,
            figureTestId: u,
            ...b
          } = e),
          (k[0] = e),
          (k[1] = o),
          (k[2] = s),
          (k[3] = d),
          (k[4] = c),
          (k[5] = u),
          (k[6] = p),
          (k[7] = m),
          (k[8] = x),
          (k[9] = b),
          (k[10] = f))
        : ((o = k[1]),
          (s = k[2]),
          (d = k[3]),
          (c = k[4]),
          (u = k[5]),
          (p = k[6]),
          (m = k[7]),
          (x = k[8]),
          (b = k[9]),
          (f = k[10]));
      let N = l[void 0 === f ? "start" : f];
      k[11] !== s || k[12] !== N
        ? ((h = (0, r.c)("flex min-w-0 flex-col gap-0.5", N, s)),
          (k[11] = s),
          (k[12] = N),
          (k[13] = h))
        : (h = k[13]);
      let I = a[d];
      (k[14] !== x || k[15] !== I
        ? ((v = (0, r.c)("flex min-w-0 items-center gap-1", I, x)),
          (k[14] = x),
          (k[15] = I),
          (k[16] = v))
        : (v = k[16]),
        k[17] !== p || k[18] !== m || k[19] !== v
          ? ((y = (0, t.jsxs)("span", { className: v, children: [m, p] })),
            (k[17] = p),
            (k[18] = m),
            (k[19] = v),
            (k[20] = y))
          : (y = k[20]));
      let S = n[d];
      return (
        k[21] !== c || k[22] !== S
          ? ((g = (0, r.c)("min-w-0 max-w-full truncate", S, c)),
            (k[21] = c),
            (k[22] = S),
            (k[23] = g))
          : (g = k[23]),
        k[24] !== o || k[25] !== u || k[26] !== g
          ? ((_ = (0, t.jsx)("span", {
              "data-testid": u,
              className: g,
              children: o,
            })),
            (k[24] = o),
            (k[25] = u),
            (k[26] = g),
            (k[27] = _))
          : (_ = k[27]),
        k[28] !== d || k[29] !== b || k[30] !== h || k[31] !== y || k[32] !== _
          ? ((w = (0, t.jsxs)("div", {
              ...b,
              "data-stat-tile": !0,
              "data-density": d,
              className: h,
              children: [y, _],
            })),
            (k[28] = d),
            (k[29] = b),
            (k[30] = h),
            (k[31] = y),
            (k[32] = _),
            (k[33] = w))
          : (w = k[33]),
        w
      );
    },
  ]);
};
