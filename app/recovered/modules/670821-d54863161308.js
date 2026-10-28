// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    i = e.i(897453),
    r = e.i(11862),
    a = e.i(440072);
  e.s([
    "f",
    0,
    (e) => {
      let s,
        l,
        o,
        c = (0, t.c)(8),
        { user: d, enabled: u } = e;
      (c[0] !== d
        ? ((s = a.f.byUser(d ?? "")), (c[0] = d), (c[1] = s))
        : (s = c[1]),
        c[2] !== d
          ? ((l = () => (0, r.f)({ user: d ?? "" })), (c[2] = d), (c[3] = l))
          : (l = c[3]));
      let m = (void 0 === u || u) && !!d;
      return (
        c[4] !== s || c[5] !== l || c[6] !== m
          ? ((o = { queryKey: s, queryFn: l, enabled: m, ...i.f }),
            (c[4] = s),
            (c[5] = l),
            (c[6] = m),
            (c[7] = o))
          : (o = c[7]),
        (0, n.useQuery)(o)
      );
    },
  ]);
};
