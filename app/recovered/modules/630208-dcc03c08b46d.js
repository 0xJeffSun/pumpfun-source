// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(897453),
    i = e.i(11862),
    a = e.i(440072);
  e.s([
    "f",
    0,
    (e) => {
      let o,
        l,
        s,
        u = (0, t.c)(10),
        { user: d, mint: c, enabled: f } = e;
      (u[0] !== c || u[1] !== d
        ? ((o = a.f.byUserAndMint(d ?? "", c ?? "")),
          (u[0] = c),
          (u[1] = d),
          (u[2] = o))
        : (o = u[2]),
        u[3] !== c || u[4] !== d
          ? ((l = () => (0, i.f)({ user: d ?? "", mint: c ?? "" })),
            (u[3] = c),
            (u[4] = d),
            (u[5] = l))
          : (l = u[5]));
      let h = (void 0 === f || f) && !!d && !!c;
      return (
        u[6] !== o || u[7] !== l || u[8] !== h
          ? ((s = { queryKey: o, queryFn: l, enabled: h, ...r.f }),
            (u[6] = o),
            (u[7] = l),
            (u[8] = h),
            (u[9] = s))
          : (s = u[9]),
        (0, n.useQuery)(s)
      );
    },
  ]);
};
