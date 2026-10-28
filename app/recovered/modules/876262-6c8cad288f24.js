// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    i = e.i(663628),
    r = e.i(188902),
    l = e.i(639374);
  let a = new Map(),
    u = { owner: (e) => ["ownerTokenAccountTotals", e] };
  e.s([
    "Y",
    0,
    u,
    "q",
    0,
    function (e) {
      let o,
        s,
        d,
        c,
        f = (0, t.c)(11),
        { owner: m, enabled: p } = e,
        h = void 0 === p || p;
      return (
        f[0] !== m ? ((o = u.owner(m)), (f[0] = m), (f[1] = o)) : (o = f[1]),
        f[2] !== h || f[3] !== m
          ? ((s = h && !!m && (0, l.f)(m ?? "")),
            (f[2] = h),
            (f[3] = m),
            (f[4] = s))
          : (s = f[4]),
        f[5] !== m
          ? ((d = (e) => {
              let { signal: t } = e;
              return (0, i.z)({ owner: m, endpoint: (0, r.L)(), signal: t });
            }),
            (f[5] = m),
            (f[6] = d))
          : (d = f[6]),
        f[7] !== o || f[8] !== s || f[9] !== d
          ? ((c = {
              queryKey: o,
              enabled: s,
              staleTime: 3e4,
              gcTime: 3e5,
              retry: !1,
              queryFn: d,
            }),
            (f[7] = o),
            (f[8] = s),
            (f[9] = d),
            (f[10] = c))
          : (c = f[10]),
        (0, n.useQuery)(c).data ?? a
      );
    },
  ]);
};
