// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(690877),
    r = e.i(897453),
    n = e.i(11862),
    i = e.i(440072);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        s,
        o,
        c = (0, t.c)(10),
        { user: d, mint: u, enabled: m } = e;
      (c[0] !== u || c[1] !== d
        ? ((a = i.f.byUserAndMint(d ?? "", u ?? "")),
          (c[0] = u),
          (c[1] = d),
          (c[2] = a))
        : (a = c[2]),
        c[3] !== u || c[4] !== d
          ? ((s = () => (0, n.f)({ user: d ?? "", mint: u ?? "" })),
            (c[3] = u),
            (c[4] = d),
            (c[5] = s))
          : (s = c[5]));
      let f = (void 0 === m || m) && !!d && !!u;
      return (
        c[6] !== a || c[7] !== s || c[8] !== f
          ? ((o = { queryKey: a, queryFn: s, enabled: f, ...r.f }),
            (c[6] = a),
            (c[7] = s),
            (c[8] = f),
            (c[9] = o))
          : (o = c[9]),
        (0, l.useQuery)(o)
      );
    },
  ]);
};
