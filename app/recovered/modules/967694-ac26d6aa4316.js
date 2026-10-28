// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(338319),
    s = e.i(606178),
    l = e.i(787773),
    o = e.i(51206);
  e.s([
    "f",
    0,
    function (e) {
      let c,
        m,
        d,
        h,
        u,
        f,
        x,
        p,
        g = (0, i.c)(27),
        {
          density: y,
          children: b,
          title: w,
          onRetry: v,
          action: _,
          className: j,
        } = e,
        { t: N } = (0, a.f)(),
        k = l.I[y],
        E = s.U[y];
      (g[0] !== j || g[1] !== k || g[2] !== E
        ? ((c = (0, n.c)(l.k, k, E, j)),
          (g[0] = j),
          (g[1] = k),
          (g[2] = E),
          (g[3] = c))
        : (c = g[3]),
        g[4] !== y || g[5] !== w
          ? ((m = w
              ? (0, t.jsx)("p", { className: l.h[y], children: w })
              : null),
            (g[4] = y),
            (g[5] = w),
            (g[6] = m))
          : (m = g[6]));
      let S = l.Q[y];
      return (
        g[7] !== b || g[8] !== S
          ? ((d = (0, t.jsx)("p", { className: S, children: b })),
            (g[7] = b),
            (g[8] = S),
            (g[9] = d))
          : (d = g[9]),
        g[10] !== y || g[11] !== v || g[12] !== N
          ? ((h = v
              ? (0, t.jsx)(o._, {
                  density: y,
                  size: 24,
                  variant: "ghost",
                  "aria-label": N("common.retry"),
                  onClick: v,
                  children: (0, t.jsx)(r.k8, { "aria-hidden": !0 }),
                })
              : null),
            (g[10] = y),
            (g[11] = v),
            (g[12] = N),
            (g[13] = h))
          : (h = g[13]),
        g[14] !== d || g[15] !== h
          ? ((u = (0, t.jsxs)("div", {
              className: "flex items-center gap-1",
              children: [d, h],
            })),
            (g[14] = d),
            (g[15] = h),
            (g[16] = u))
          : (u = g[16]),
        g[17] !== m || g[18] !== u
          ? ((f = (0, t.jsxs)("div", {
              className: "flex flex-col items-center gap-1",
              children: [m, u],
            })),
            (g[17] = m),
            (g[18] = u),
            (g[19] = f))
          : (f = g[19]),
        g[20] !== _
          ? ((x = _
              ? (0, t.jsx)("div", {
                  className: "flex items-center justify-center",
                  children: _,
                })
              : null),
            (g[20] = _),
            (g[21] = x))
          : (x = g[21]),
        g[22] !== y || g[23] !== x || g[24] !== c || g[25] !== f
          ? ((p = (0, t.jsxs)("div", {
              role: "status",
              "data-density": y,
              "data-error-band": !0,
              className: c,
              children: [f, x],
            })),
            (g[22] = y),
            (g[23] = x),
            (g[24] = c),
            (g[25] = f),
            (g[26] = p))
          : (p = g[26]),
        p
      );
    },
  ]);
};
