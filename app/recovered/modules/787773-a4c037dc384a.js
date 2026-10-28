// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(338319),
    o = e.i(606178);
  let i = "flex w-full flex-col items-center justify-center text-center",
    a = {
      terminal: "min-h-[72px] gap-2 py-3",
      comfortable: "min-h-24 gap-3 py-5",
    },
    s = {
      terminal: "text-[13px] leading-4 font-medium text-text-primary",
      comfortable: "text-sm leading-5 font-medium text-text-primary",
    },
    l = {
      terminal: "text-xs leading-4 text-text-tertiary",
      comfortable: "text-[13px] leading-[18px] text-text-tertiary",
    };
  e.s([
    "k",
    0,
    i,
    "Q",
    0,
    l,
    "I",
    0,
    a,
    "h",
    0,
    s,
    "L",
    0,
    function (e) {
      let c,
        u,
        p,
        d,
        f,
        g,
        m = (0, n.c)(20),
        { density: b, children: h, title: v, action: x, className: y } = e,
        _ = a[b],
        k = o.U[b];
      (m[0] !== y || m[1] !== _ || m[2] !== k
        ? ((c = (0, r.c)(i, _, k, y)),
          (m[0] = y),
          (m[1] = _),
          (m[2] = k),
          (m[3] = c))
        : (c = m[3]),
        m[4] !== b || m[5] !== v
          ? ((u = v ? (0, t.jsx)("p", { className: s[b], children: v }) : null),
            (m[4] = b),
            (m[5] = v),
            (m[6] = u))
          : (u = m[6]));
      let z = l[b];
      return (
        m[7] !== h || m[8] !== z
          ? ((p = (0, t.jsx)("p", { className: z, children: h })),
            (m[7] = h),
            (m[8] = z),
            (m[9] = p))
          : (p = m[9]),
        m[10] !== u || m[11] !== p
          ? ((d = (0, t.jsxs)("div", {
              className: "flex flex-col items-center gap-1",
              children: [u, p],
            })),
            (m[10] = u),
            (m[11] = p),
            (m[12] = d))
          : (d = m[12]),
        m[13] !== x
          ? ((f = x
              ? (0, t.jsx)("div", {
                  className: "flex items-center justify-center",
                  children: x,
                })
              : null),
            (m[13] = x),
            (m[14] = f))
          : (f = m[14]),
        m[15] !== b || m[16] !== c || m[17] !== d || m[18] !== f
          ? ((g = (0, t.jsxs)("div", {
              "data-density": b,
              "data-empty-band": !0,
              className: c,
              children: [d, f],
            })),
            (m[15] = b),
            (m[16] = c),
            (m[17] = d),
            (m[18] = f),
            (m[19] = g))
          : (g = m[19]),
        g
      );
    },
  ]);
};
