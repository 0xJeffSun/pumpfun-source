// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(338319),
    l = e.i(606178),
    o = e.i(787773),
    s = e.i(51206);
  e.s([
    "f",
    0,
    function (e) {
      let d,
        c,
        u,
        p,
        m,
        x,
        b,
        f,
        h = (0, i.c)(27),
        {
          density: v,
          children: y,
          title: g,
          onRetry: _,
          action: w,
          className: k,
        } = e,
        { t: N } = (0, a.f)(),
        I = o.I[v],
        S = l.U[v];
      (h[0] !== k || h[1] !== I || h[2] !== S
        ? ((d = (0, n.c)(o.k, I, S, k)),
          (h[0] = k),
          (h[1] = I),
          (h[2] = S),
          (h[3] = d))
        : (d = h[3]),
        h[4] !== v || h[5] !== g
          ? ((c = g
              ? (0, t.jsx)("p", { className: o.h[v], children: g })
              : null),
            (h[4] = v),
            (h[5] = g),
            (h[6] = c))
          : (c = h[6]));
      let A = o.Q[v];
      return (
        h[7] !== y || h[8] !== A
          ? ((u = (0, t.jsx)("p", { className: A, children: y })),
            (h[7] = y),
            (h[8] = A),
            (h[9] = u))
          : (u = h[9]),
        h[10] !== v || h[11] !== _ || h[12] !== N
          ? ((p = _
              ? (0, t.jsx)(s._, {
                  density: v,
                  size: 24,
                  variant: "ghost",
                  "aria-label": N("common.retry"),
                  onClick: _,
                  children: (0, t.jsx)(r.k8, { "aria-hidden": !0 }),
                })
              : null),
            (h[10] = v),
            (h[11] = _),
            (h[12] = N),
            (h[13] = p))
          : (p = h[13]),
        h[14] !== u || h[15] !== p
          ? ((m = (0, t.jsxs)("div", {
              className: "flex items-center gap-1",
              children: [u, p],
            })),
            (h[14] = u),
            (h[15] = p),
            (h[16] = m))
          : (m = h[16]),
        h[17] !== c || h[18] !== m
          ? ((x = (0, t.jsxs)("div", {
              className: "flex flex-col items-center gap-1",
              children: [c, m],
            })),
            (h[17] = c),
            (h[18] = m),
            (h[19] = x))
          : (x = h[19]),
        h[20] !== w
          ? ((b = w
              ? (0, t.jsx)("div", {
                  className: "flex items-center justify-center",
                  children: w,
                })
              : null),
            (h[20] = w),
            (h[21] = b))
          : (b = h[21]),
        h[22] !== v || h[23] !== b || h[24] !== d || h[25] !== x
          ? ((f = (0, t.jsxs)("div", {
              role: "status",
              "data-density": v,
              "data-error-band": !0,
              className: d,
              children: [x, b],
            })),
            (h[22] = v),
            (h[23] = b),
            (h[24] = d),
            (h[25] = x),
            (h[26] = f))
          : (f = h[26]),
        f
      );
    },
  ]);
};
