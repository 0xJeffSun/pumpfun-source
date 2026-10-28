// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(439587),
    n = e.i(426091);
  let a = { comfortable: "", terminal: "!text-[12px] !leading-4" };
  e.s([
    "f",
    0,
    function (e) {
      let o,
        l,
        s,
        d,
        c,
        u,
        m,
        h,
        p,
        f,
        b,
        g = (0, r.c)(23);
      g[0] !== e
        ? (({
            content: l,
            children: o,
            density: m,
            side: u,
            delay: d,
            contentClassName: s,
            ...c
          } = e),
          (g[0] = e),
          (g[1] = o),
          (g[2] = l),
          (g[3] = s),
          (g[4] = d),
          (g[5] = c),
          (g[6] = u),
          (g[7] = m))
        : ((o = g[1]),
          (l = g[2]),
          (s = g[3]),
          (d = g[4]),
          (c = g[5]),
          (u = g[6]),
          (m = g[7]));
      let x = void 0 === m ? "comfortable" : m,
        v = a[x];
      g[8] !== s || g[9] !== v
        ? ((h = (0, n.c)(v, s)), (g[8] = s), (g[9] = v), (g[10] = h))
        : (h = g[10]);
      let y = h;
      g[11] !== o || g[12] !== d
        ? ((p = (0, t.jsx)(i._, { delay: d, render: o })),
          (g[11] = o),
          (g[12] = d),
          (g[13] = p))
        : (p = g[13]);
      let w = "" === y ? void 0 : y;
      return (
        g[14] !== l || g[15] !== x || g[16] !== u || g[17] !== w
          ? ((f = (0, t.jsx)(i.Y, {
              className: w,
              "data-density": x,
              side: u,
              children: l,
            })),
            (g[14] = l),
            (g[15] = x),
            (g[16] = u),
            (g[17] = w),
            (g[18] = f))
          : (f = g[18]),
        g[19] !== c || g[20] !== p || g[21] !== f
          ? ((b = (0, t.jsxs)(i.W, { ...c, children: [p, f] })),
            (g[19] = c),
            (g[20] = p),
            (g[21] = f),
            (g[22] = b))
          : (b = g[22]),
        b
      );
    },
  ]);
};
