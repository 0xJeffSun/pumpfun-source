// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(426091),
    i = e.i(225641),
    a = e.i(947187);
  e.s([
    "f",
    0,
    function (e) {
      let o,
        s,
        l,
        c,
        d,
        m,
        u,
        b,
        h,
        f = (0, r.c)(26);
      f[0] !== e
        ? (({ href: c, children: s, className: l, onClick: d, ...o } = e),
          (f[0] = e),
          (f[1] = o),
          (f[2] = s),
          (f[3] = l),
          (f[4] = c),
          (f[5] = d))
        : ((o = f[1]), (s = f[2]), (l = f[3]), (c = f[4]), (d = f[5]));
      let { requestNavigation: x, dialog: p } = (0, i.f)();
      f[6] !== c || f[7] !== d || f[8] !== x
        ? ((m = (e) => {
            (e.preventDefault(), e.stopPropagation(), d?.(e), x(c));
          }),
          (f[6] = c),
          (f[7] = d),
          (f[8] = x),
          (f[9] = m))
        : (m = f[9]);
      let y = m;
      f[10] !== c ? ((u = (0, a._)(c)), (f[10] = c), (f[11] = u)) : (u = f[11]);
      let g = u;
      if (!g) {
        let e, r;
        return (
          f[12] !== l
            ? ((e = (0, n.c)("cursor-not-allowed opacity-60", l)),
              (f[12] = l),
              (f[13] = e))
            : (e = f[13]),
          f[14] !== s || f[15] !== e
            ? ((r = (0, t.jsx)("span", { className: e, children: s })),
              (f[14] = s),
              (f[15] = e),
              (f[16] = r))
            : (r = f[16]),
          r
        );
      }
      return (
        f[17] !== o || f[18] !== s || f[19] !== l || f[20] !== y || f[21] !== g
          ? ((b = (0, t.jsx)("a", {
              href: g,
              target: "_blank",
              rel: "noopener noreferrer",
              className: l,
              ...o,
              onClick: y,
              children: s,
            })),
            (f[17] = o),
            (f[18] = s),
            (f[19] = l),
            (f[20] = y),
            (f[21] = g),
            (f[22] = b))
          : (b = f[22]),
        f[23] !== p || f[24] !== b
          ? ((h = (0, t.jsxs)(t.Fragment, { children: [b, p] })),
            (f[23] = p),
            (f[24] = b),
            (f[25] = h))
          : (h = f[25]),
        h
      );
    },
  ]);
};
