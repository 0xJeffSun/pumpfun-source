// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(426091),
    l = e.i(225641),
    s = e.i(947187);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        n,
        o,
        d,
        u,
        c,
        f,
        m,
        p,
        h = (0, r.c)(26);
      h[0] !== e
        ? (({ href: d, children: n, className: o, onClick: u, ...i } = e),
          (h[0] = e),
          (h[1] = i),
          (h[2] = n),
          (h[3] = o),
          (h[4] = d),
          (h[5] = u))
        : ((i = h[1]), (n = h[2]), (o = h[3]), (d = h[4]), (u = h[5]));
      let { requestNavigation: g, dialog: b } = (0, l.f)();
      h[6] !== d || h[7] !== u || h[8] !== g
        ? ((c = (e) => {
            (e.preventDefault(), e.stopPropagation(), u?.(e), g(d));
          }),
          (h[6] = d),
          (h[7] = u),
          (h[8] = g),
          (h[9] = c))
        : (c = h[9]);
      let w = c;
      h[10] !== d ? ((f = (0, s._)(d)), (h[10] = d), (h[11] = f)) : (f = h[11]);
      let y = f;
      if (!y) {
        let e, r;
        return (
          h[12] !== o
            ? ((e = (0, a.c)("cursor-not-allowed opacity-60", o)),
              (h[12] = o),
              (h[13] = e))
            : (e = h[13]),
          h[14] !== n || h[15] !== e
            ? ((r = (0, t.jsx)("span", { className: e, children: n })),
              (h[14] = n),
              (h[15] = e),
              (h[16] = r))
            : (r = h[16]),
          r
        );
      }
      return (
        h[17] !== i || h[18] !== n || h[19] !== o || h[20] !== w || h[21] !== y
          ? ((m = (0, t.jsx)("a", {
              href: y,
              target: "_blank",
              rel: "noopener noreferrer",
              className: o,
              ...i,
              onClick: w,
              children: n,
            })),
            (h[17] = i),
            (h[18] = n),
            (h[19] = o),
            (h[20] = w),
            (h[21] = y),
            (h[22] = m))
          : (m = h[22]),
        h[23] !== b || h[24] !== m
          ? ((p = (0, t.jsxs)(t.Fragment, { children: [m, b] })),
            (h[23] = b),
            (h[24] = m),
            (h[25] = p))
          : (p = h[25]),
        p
      );
    },
  ]);
};
