// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(782067),
    l = e.i(771708),
    s = e.i(662610),
    i = e.i(585750);
  function n(e) {
    let s,
      n,
      o,
      d,
      u,
      c = (0, r.c)(10);
    (c[0] !== e
      ? (({ address: s, ...n } = e), (c[0] = e), (c[1] = s), (c[2] = n))
      : ((s = c[1]), (n = c[2])),
      c[3] !== s ? ((o = { address: s }), (c[3] = s), (c[4] = o)) : (o = c[4]));
    let { data: f } = (0, a.T)(o),
      m = f?.group_badges;
    c[5] !== m ? ((d = (0, i.f)(m)), (c[5] = m), (c[6] = d)) : (d = c[6]);
    let p = d;
    return p
      ? (c[7] !== n || c[8] !== p
          ? ((u = (0, t.jsx)(l.f, { squad: p, ...n })),
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
      let a,
        l,
        i,
        o = (0, r.c)(6);
      return (o[0] !== e
        ? (({ address: a, ...l } = e), (o[0] = e), (o[1] = a), (o[2] = l))
        : ((a = o[1]), (l = o[2])),
      (0, s.f)() && a)
        ? (o[3] !== a || o[4] !== l
            ? ((i = (0, t.jsx)(n, { address: a, ...l })),
              (o[3] = a),
              (o[4] = l),
              (o[5] = i))
            : (i = o[5]),
          i)
        : null;
    },
  ]);
};
