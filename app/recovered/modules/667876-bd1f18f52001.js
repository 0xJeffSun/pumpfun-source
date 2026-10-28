// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(606933),
    i = e.i(352386),
    l = e.i(725776),
    a = e.i(555501),
    o = e.i(338319);
  function s(e) {
    let r,
      i,
      s = (0, n.c)(5),
      { mint: u, chainId: d, size: c, className: f } = e;
    return (0, a.v)(u, d)
      ? (s[0] !== f
          ? ((r = (0, o.c)("shrink-0", f)), (s[0] = f), (s[1] = r))
          : (r = s[1]),
        s[2] !== c || s[3] !== r
          ? ((i = (0, t.jsx)(l.f, { size: c, className: r })),
            (s[2] = c),
            (s[3] = r),
            (s[4] = i))
          : (i = s[4]),
        i)
      : null;
  }
  e.s([
    "f",
    0,
    function (e) {
      let l,
        a,
        o,
        u = (0, n.c)(6);
      u[0] !== e
        ? (({ size: a, ...l } = e), (u[0] = e), (u[1] = l), (u[2] = a))
        : ((l = u[1]), (a = u[2]));
      let d = void 0 === a ? 14 : a;
      return void 0 === (0, i.useContext)(r.QueryClientContext)
        ? null
        : (u[3] !== l || u[4] !== d
            ? ((o = (0, t.jsx)(s, { size: d, ...l })),
              (u[3] = l),
              (u[4] = d),
              (u[5] = o))
            : (o = u[5]),
          o);
    },
  ]);
};
