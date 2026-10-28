// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(38279),
    i = e.i(313724);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        o,
        s,
        l = (0, t.c)(10),
        { limit: u, offset: c, queryOptions: d, userAddress: f } = e,
        h = void 0 === u ? r.v.USER_CREATED_COINS.LIMIT : u,
        p = void 0 === c ? r.v.USER_CREATED_COINS.OFFSET : c,
        m = !!f;
      return (
        l[0] !== h || l[1] !== p || l[2] !== f
          ? ((a = () => (0, i.f)({ userAddress: f, limit: h, offset: p })),
            (o = r.Q.USER_CREATED_COINS({
              userAddress: f,
              limit: h,
              offset: p,
            })),
            (l[0] = h),
            (l[1] = p),
            (l[2] = f),
            (l[3] = a),
            (l[4] = o))
          : ((a = l[3]), (o = l[4])),
        l[5] !== m || l[6] !== d || l[7] !== a || l[8] !== o
          ? ((s = { enabled: m, queryFn: a, queryKey: o, ...d }),
            (l[5] = m),
            (l[6] = d),
            (l[7] = a),
            (l[8] = o),
            (l[9] = s))
          : (s = l[9]),
        (0, n.useQuery)(s)
      );
    },
  ]);
};
