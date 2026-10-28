// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    l = e.i(782067),
    r = e.i(771708),
    a = e.i(662610),
    n = e.i(585750);
  function o(e) {
    let a,
      o,
      s,
      d,
      u,
      c = (0, i.c)(10);
    (c[0] !== e
      ? (({ address: a, ...o } = e), (c[0] = e), (c[1] = a), (c[2] = o))
      : ((a = c[1]), (o = c[2])),
      c[3] !== a ? ((s = { address: a }), (c[3] = a), (c[4] = s)) : (s = c[4]));
    let { data: m } = (0, l.T)(s),
      p = m?.group_badges;
    c[5] !== p ? ((d = (0, n.f)(p)), (c[5] = p), (c[6] = d)) : (d = c[6]);
    let f = d;
    return f
      ? (c[7] !== o || c[8] !== f
          ? ((u = (0, t.jsx)(r.f, { squad: f, ...o })),
            (c[7] = o),
            (c[8] = f),
            (c[9] = u))
          : (u = c[9]),
        u)
      : null;
  }
  e.s([
    "f",
    0,
    function (e) {
      let l,
        r,
        n,
        s = (0, i.c)(6);
      return (s[0] !== e
        ? (({ address: l, ...r } = e), (s[0] = e), (s[1] = l), (s[2] = r))
        : ((l = s[1]), (r = s[2])),
      (0, a.f)() && l)
        ? (s[3] !== l || s[4] !== r
            ? ((n = (0, t.jsx)(o, { address: l, ...r })),
              (s[3] = l),
              (s[4] = r),
              (s[5] = n))
            : (n = s[5]),
          n)
        : null;
    },
  ]);
};
