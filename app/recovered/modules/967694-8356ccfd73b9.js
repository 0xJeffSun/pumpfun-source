// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(745018);
  e.i(12692);
  var n = e.i(398902),
    l = e.i(338319),
    r = e.i(606178),
    o = e.i(787773),
    a = e.i(51206);
  e.s([
    "f",
    0,
    function (e) {
      let c,
        d,
        h,
        u,
        m,
        f,
        p,
        g,
        x = (0, i.c)(27),
        {
          density: b,
          children: v,
          title: y,
          onRetry: w,
          action: C,
          className: j,
        } = e,
        { t: S } = (0, n.f)(),
        z = o.I[b],
        k = r.U[b];
      (x[0] !== j || x[1] !== z || x[2] !== k
        ? ((c = (0, l.c)(o.k, z, k, j)),
          (x[0] = j),
          (x[1] = z),
          (x[2] = k),
          (x[3] = c))
        : (c = x[3]),
        x[4] !== b || x[5] !== y
          ? ((d = y
              ? (0, t.jsx)("p", { className: o.h[b], children: y })
              : null),
            (x[4] = b),
            (x[5] = y),
            (x[6] = d))
          : (d = x[6]));
      let M = o.Q[b];
      return (
        x[7] !== v || x[8] !== M
          ? ((h = (0, t.jsx)("p", { className: M, children: v })),
            (x[7] = v),
            (x[8] = M),
            (x[9] = h))
          : (h = x[9]),
        x[10] !== b || x[11] !== w || x[12] !== S
          ? ((u = w
              ? (0, t.jsx)(a._, {
                  density: b,
                  size: 24,
                  variant: "ghost",
                  "aria-label": S("common.retry"),
                  onClick: w,
                  children: (0, t.jsx)(s.k8, { "aria-hidden": !0 }),
                })
              : null),
            (x[10] = b),
            (x[11] = w),
            (x[12] = S),
            (x[13] = u))
          : (u = x[13]),
        x[14] !== h || x[15] !== u
          ? ((m = (0, t.jsxs)("div", {
              className: "flex items-center gap-1",
              children: [h, u],
            })),
            (x[14] = h),
            (x[15] = u),
            (x[16] = m))
          : (m = x[16]),
        x[17] !== d || x[18] !== m
          ? ((f = (0, t.jsxs)("div", {
              className: "flex flex-col items-center gap-1",
              children: [d, m],
            })),
            (x[17] = d),
            (x[18] = m),
            (x[19] = f))
          : (f = x[19]),
        x[20] !== C
          ? ((p = C
              ? (0, t.jsx)("div", {
                  className: "flex items-center justify-center",
                  children: C,
                })
              : null),
            (x[20] = C),
            (x[21] = p))
          : (p = x[21]),
        x[22] !== b || x[23] !== p || x[24] !== c || x[25] !== f
          ? ((g = (0, t.jsxs)("div", {
              role: "status",
              "data-density": b,
              "data-error-band": !0,
              className: c,
              children: [f, p],
            })),
            (x[22] = b),
            (x[23] = p),
            (x[24] = c),
            (x[25] = f),
            (x[26] = g))
          : (g = x[26]),
        g
      );
    },
  ]);
};
