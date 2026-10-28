// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(690877),
    r = e.i(38279),
    n = e.i(997887);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        o,
        s,
        l = (0, t.c)(10),
        {
          coinAddress: u,
          includeDataLivestream: c,
          chainId: d,
          queryOptions: f,
        } = e,
        m = void 0 === c ? r.v.COIN.INCLUDE_DATA_LIVESTREAM : c,
        h = !!u;
      return (
        l[0] !== d || l[1] !== u || l[2] !== m
          ? ((a = () =>
              (0, n.k)({
                coinAddress: u,
                includeDataLivestream: m,
                chainId: d,
              })),
            (o = r.Q.COIN({
              coinAddress: u,
              includeDataLivestream: m,
              chainId: d,
            })),
            (l[0] = d),
            (l[1] = u),
            (l[2] = m),
            (l[3] = a),
            (l[4] = o))
          : ((a = l[3]), (o = l[4])),
        l[5] !== h || l[6] !== f || l[7] !== a || l[8] !== o
          ? ((s = {
              enabled: h,
              queryFn: a,
              queryKey: o,
              refetchOnWindowFocus: !1,
              refetchOnMount: !1,
              ...f,
            }),
            (l[5] = h),
            (l[6] = f),
            (l[7] = a),
            (l[8] = o),
            (l[9] = s))
          : (s = l[9]),
        (0, i.useQuery)(s)
      );
    },
  ]);
};
