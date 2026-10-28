// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var n = e.i(398902),
    r = e.i(338319),
    s = e.i(606178),
    l = e.i(787773),
    o = e.i(51206);
  e.s([
    "f",
    0,
    function (e) {
      let c,
        d,
        m,
        u,
        p,
        f,
        x,
        g,
        h = (0, i.c)(27),
        {
          density: b,
          children: y,
          title: v,
          onRetry: w,
          action: _,
          className: k,
        } = e,
        { t: j } = (0, n.f)(),
        C = l.I[b],
        N = s.U[b];
      (h[0] !== k || h[1] !== C || h[2] !== N
        ? ((c = (0, r.c)(l.k, C, N, k)),
          (h[0] = k),
          (h[1] = C),
          (h[2] = N),
          (h[3] = c))
        : (c = h[3]),
        h[4] !== b || h[5] !== v
          ? ((d = v
              ? (0, t.jsx)("p", { className: l.h[b], children: v })
              : null),
            (h[4] = b),
            (h[5] = v),
            (h[6] = d))
          : (d = h[6]));
      let S = l.Q[b];
      return (
        h[7] !== y || h[8] !== S
          ? ((m = (0, t.jsx)("p", { className: S, children: y })),
            (h[7] = y),
            (h[8] = S),
            (h[9] = m))
          : (m = h[9]),
        h[10] !== b || h[11] !== w || h[12] !== j
          ? ((u = w
              ? (0, t.jsx)(o._, {
                  density: b,
                  size: 24,
                  variant: "ghost",
                  "aria-label": j("common.retry"),
                  onClick: w,
                  children: (0, t.jsx)(a.k8, { "aria-hidden": !0 }),
                })
              : null),
            (h[10] = b),
            (h[11] = w),
            (h[12] = j),
            (h[13] = u))
          : (u = h[13]),
        h[14] !== m || h[15] !== u
          ? ((p = (0, t.jsxs)("div", {
              className: "flex items-center gap-1",
              children: [m, u],
            })),
            (h[14] = m),
            (h[15] = u),
            (h[16] = p))
          : (p = h[16]),
        h[17] !== d || h[18] !== p
          ? ((f = (0, t.jsxs)("div", {
              className: "flex flex-col items-center gap-1",
              children: [d, p],
            })),
            (h[17] = d),
            (h[18] = p),
            (h[19] = f))
          : (f = h[19]),
        h[20] !== _
          ? ((x = _
              ? (0, t.jsx)("div", {
                  className: "flex items-center justify-center",
                  children: _,
                })
              : null),
            (h[20] = _),
            (h[21] = x))
          : (x = h[21]),
        h[22] !== b || h[23] !== x || h[24] !== c || h[25] !== f
          ? ((g = (0, t.jsxs)("div", {
              role: "status",
              "data-density": b,
              "data-error-band": !0,
              className: c,
              children: [f, x],
            })),
            (h[22] = b),
            (h[23] = x),
            (h[24] = c),
            (h[25] = f),
            (h[26] = g))
          : (g = h[26]),
        g
      );
    },
  ]);
};
