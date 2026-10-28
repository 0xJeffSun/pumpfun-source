// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(426091),
    i = e.i(225641),
    l = e.i(947187);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        s,
        o,
        c,
        u,
        d,
        m,
        h,
        f,
        p = (0, n.c)(26);
      p[0] !== e
        ? (({ href: c, children: s, className: o, onClick: u, ...a } = e),
          (p[0] = e),
          (p[1] = a),
          (p[2] = s),
          (p[3] = o),
          (p[4] = c),
          (p[5] = u))
        : ((a = p[1]), (s = p[2]), (o = p[3]), (c = p[4]), (u = p[5]));
      let { requestNavigation: g, dialog: b } = (0, i.f)();
      p[6] !== c || p[7] !== u || p[8] !== g
        ? ((d = (e) => {
            (e.preventDefault(), e.stopPropagation(), u?.(e), g(c));
          }),
          (p[6] = c),
          (p[7] = u),
          (p[8] = g),
          (p[9] = d))
        : (d = p[9]);
      let _ = d;
      p[10] !== c ? ((m = (0, l._)(c)), (p[10] = c), (p[11] = m)) : (m = p[11]);
      let x = m;
      if (!x) {
        let e, n;
        return (
          p[12] !== o
            ? ((e = (0, r.c)("cursor-not-allowed opacity-60", o)),
              (p[12] = o),
              (p[13] = e))
            : (e = p[13]),
          p[14] !== s || p[15] !== e
            ? ((n = (0, t.jsx)("span", { className: e, children: s })),
              (p[14] = s),
              (p[15] = e),
              (p[16] = n))
            : (n = p[16]),
          n
        );
      }
      return (
        p[17] !== a || p[18] !== s || p[19] !== o || p[20] !== _ || p[21] !== x
          ? ((h = (0, t.jsx)("a", {
              href: x,
              target: "_blank",
              rel: "noopener noreferrer",
              className: o,
              ...a,
              onClick: _,
              children: s,
            })),
            (p[17] = a),
            (p[18] = s),
            (p[19] = o),
            (p[20] = _),
            (p[21] = x),
            (p[22] = h))
          : (h = p[22]),
        p[23] !== b || p[24] !== h
          ? ((f = (0, t.jsxs)(t.Fragment, { children: [h, b] })),
            (p[23] = b),
            (p[24] = h),
            (p[25] = f))
          : (f = p[25]),
        f
      );
    },
  ]);
};
