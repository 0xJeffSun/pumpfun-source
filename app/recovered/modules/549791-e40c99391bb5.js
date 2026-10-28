// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(690877),
    n = e.i(339179),
    s = e.i(485759);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        r,
        a,
        o = (0, t.c)(14),
        { owner: u, chainId: d, token: c, evmWallet: m, enabled: _ } = e;
      (o[0] !== d || o[1] !== m || o[2] !== u || o[3] !== c
        ? ((l = s.f.eligibility({
            owner: u ?? "",
            chainId: d ?? "",
            token: c ?? "",
            evmWallet: m ?? "",
          })),
          (o[0] = d),
          (o[1] = m),
          (o[2] = u),
          (o[3] = c),
          (o[4] = l))
        : (l = o[4]),
        o[5] !== d || o[6] !== m || o[7] !== u || o[8] !== c
          ? ((r = () =>
              (0, n.l)({
                owner: u ?? "",
                chainId: d ?? "",
                token: c ?? "",
                evmWallet: m,
              })),
            (o[5] = d),
            (o[6] = m),
            (o[7] = u),
            (o[8] = c),
            (o[9] = r))
          : (r = o[9]));
      let h = (void 0 === _ || _) && !!u && !!d && !!c;
      return (
        o[10] !== l || o[11] !== r || o[12] !== h
          ? ((a = {
              queryKey: l,
              queryFn: r,
              enabled: h,
              staleTime: 1e4,
              retry: !1,
            }),
            (o[10] = l),
            (o[11] = r),
            (o[12] = h),
            (o[13] = a))
          : (a = o[13]),
        (0, i.useQuery)(a)
      );
    },
  ]);
};
