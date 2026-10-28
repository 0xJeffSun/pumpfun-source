// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(732486),
    t = e.i(445242),
    r = e.i(782067),
    s = e.i(771708),
    l = e.i(662610),
    i = e.i(585750);
  function n(e) {
    let l,
      n,
      o,
      d,
      u,
      c = (0, t.c)(10);
    (c[0] !== e
      ? (({ address: l, ...n } = e), (c[0] = e), (c[1] = l), (c[2] = n))
      : ((l = c[1]), (n = c[2])),
      c[3] !== l ? ((o = { address: l }), (c[3] = l), (c[4] = o)) : (o = c[4]));
    let { data: m } = (0, r.T)(o),
      f = m?.group_badges;
    c[5] !== f ? ((d = (0, i.f)(f)), (c[5] = f), (c[6] = d)) : (d = c[6]);
    let p = d;
    return p
      ? (c[7] !== n || c[8] !== p
          ? ((u = (0, a.jsx)(s.f, { squad: p, ...n })),
            (c[7] = n),
            (c[8] = p),
            (c[9] = u))
          : (u = c[9]),
        u)
      : null;
  }
  e.s([
    "f",
    0,
    function (e) {
      let r,
        s,
        i,
        o = (0, t.c)(6);
      return (o[0] !== e
        ? (({ address: r, ...s } = e), (o[0] = e), (o[1] = r), (o[2] = s))
        : ((r = o[1]), (s = o[2])),
      (0, l.f)() && r)
        ? (o[3] !== r || o[4] !== s
            ? ((i = (0, a.jsx)(n, { address: r, ...s })),
              (o[3] = r),
              (o[4] = s),
              (o[5] = i))
            : (i = o[5]),
          i)
        : null;
    },
  ]);
};
