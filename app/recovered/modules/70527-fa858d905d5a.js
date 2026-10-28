// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    i = e.i(38279),
    r = e.i(313724);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        a,
        u,
        o = (0, t.c)(10),
        { limit: s, offset: d, queryOptions: c, userAddress: f } = e,
        m = void 0 === s ? i.v.USER_CREATED_COINS.LIMIT : s,
        p = void 0 === d ? i.v.USER_CREATED_COINS.OFFSET : d,
        h = !!f;
      return (
        o[0] !== m || o[1] !== p || o[2] !== f
          ? ((l = () => (0, r.f)({ userAddress: f, limit: m, offset: p })),
            (a = i.Q.USER_CREATED_COINS({
              userAddress: f,
              limit: m,
              offset: p,
            })),
            (o[0] = m),
            (o[1] = p),
            (o[2] = f),
            (o[3] = l),
            (o[4] = a))
          : ((l = o[3]), (a = o[4])),
        o[5] !== h || o[6] !== c || o[7] !== l || o[8] !== a
          ? ((u = { enabled: h, queryFn: l, queryKey: a, ...c }),
            (o[5] = h),
            (o[6] = c),
            (o[7] = l),
            (o[8] = a),
            (o[9] = u))
          : (u = o[9]),
        (0, n.useQuery)(u)
      );
    },
  ]);
};
