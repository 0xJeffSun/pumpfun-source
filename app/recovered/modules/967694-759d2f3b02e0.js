// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var l = e.i(398902),
    r = e.i(338319),
    n = e.i(606178),
    o = e.i(787773),
    s = e.i(51206);
  e.s([
    "f",
    0,
    function (e) {
      let d,
        c,
        u,
        m,
        f,
        p,
        h,
        b,
        y = (0, i.c)(27),
        {
          density: x,
          children: v,
          title: g,
          onRetry: w,
          action: k,
          className: C,
        } = e,
        { t: N } = (0, l.f)(),
        j = o.I[x],
        I = n.U[x];
      (y[0] !== C || y[1] !== j || y[2] !== I
        ? ((d = (0, r.c)(o.k, j, I, C)),
          (y[0] = C),
          (y[1] = j),
          (y[2] = I),
          (y[3] = d))
        : (d = y[3]),
        y[4] !== x || y[5] !== g
          ? ((c = g
              ? (0, t.jsx)("p", { className: o.h[x], children: g })
              : null),
            (y[4] = x),
            (y[5] = g),
            (y[6] = c))
          : (c = y[6]));
      let _ = o.Q[x];
      return (
        y[7] !== v || y[8] !== _
          ? ((u = (0, t.jsx)("p", { className: _, children: v })),
            (y[7] = v),
            (y[8] = _),
            (y[9] = u))
          : (u = y[9]),
        y[10] !== x || y[11] !== w || y[12] !== N
          ? ((m = w
              ? (0, t.jsx)(s._, {
                  density: x,
                  size: 24,
                  variant: "ghost",
                  "aria-label": N("common.retry"),
                  onClick: w,
                  children: (0, t.jsx)(a.k8, { "aria-hidden": !0 }),
                })
              : null),
            (y[10] = x),
            (y[11] = w),
            (y[12] = N),
            (y[13] = m))
          : (m = y[13]),
        y[14] !== u || y[15] !== m
          ? ((f = (0, t.jsxs)("div", {
              className: "flex items-center gap-1",
              children: [u, m],
            })),
            (y[14] = u),
            (y[15] = m),
            (y[16] = f))
          : (f = y[16]),
        y[17] !== c || y[18] !== f
          ? ((p = (0, t.jsxs)("div", {
              className: "flex flex-col items-center gap-1",
              children: [c, f],
            })),
            (y[17] = c),
            (y[18] = f),
            (y[19] = p))
          : (p = y[19]),
        y[20] !== k
          ? ((h = k
              ? (0, t.jsx)("div", {
                  className: "flex items-center justify-center",
                  children: k,
                })
              : null),
            (y[20] = k),
            (y[21] = h))
          : (h = y[21]),
        y[22] !== x || y[23] !== h || y[24] !== d || y[25] !== p
          ? ((b = (0, t.jsxs)("div", {
              role: "status",
              "data-density": x,
              "data-error-band": !0,
              className: d,
              children: [p, h],
            })),
            (y[22] = x),
            (y[23] = h),
            (y[24] = d),
            (y[25] = p),
            (y[26] = b))
          : (b = y[26]),
        b
      );
    },
  ]);
};
