// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    r = e.i(606933),
    i = e.i(280740),
    a = e.i(897453),
    o = e.i(85324),
    l = e.i(339179),
    s = e.i(485759);
  e.s([
    "f",
    0,
    (e) => {
      let u,
        d,
        c,
        f,
        h,
        m,
        g = (0, t.c)(18),
        { owner: p, chainId: b, token: w, enabled: _ } = e,
        y = void 0 === _ || _,
        z = (0, r.useQueryClient)();
      g[0] !== b || g[1] !== y || g[2] !== p || g[3] !== z || g[4] !== w
        ? ((d = s.f.byOwnerChainToken({
            owner: p ?? "",
            chainId: b ?? "",
            token: w ?? "",
          })),
          (u = y && !!p && !!b && !!w),
          (c = o.q),
          (f = (0, a.I)(z.getQueryData(d))),
          (g[0] = b),
          (g[1] = y),
          (g[2] = p),
          (g[3] = z),
          (g[4] = w),
          (g[5] = u),
          (g[6] = d),
          (g[7] = c),
          (g[8] = f))
        : ((u = g[5]), (d = g[6]), (c = g[7]), (f = g[8]));
      let v = c(f, u);
      return (
        g[9] !== b || g[10] !== p || g[11] !== w
          ? ((h = () =>
              (0, l.n)({ owner: p ?? "", chainId: b ?? "", token: w ?? "" })),
            (g[9] = b),
            (g[10] = p),
            (g[11] = w),
            (g[12] = h))
          : (h = g[12]),
        g[13] !== u || g[14] !== d || g[15] !== v || g[16] !== h
          ? ((m = {
              queryKey: d,
              queryFn: h,
              enabled: u,
              staleTime: i.T,
              retry: !1,
              refetchInterval: v,
              refetchIntervalInBackground: !1,
              refetchOnWindowFocus: !0,
            }),
            (g[13] = u),
            (g[14] = d),
            (g[15] = v),
            (g[16] = h),
            (g[17] = m))
          : (m = g[17]),
        (0, n.useQuery)(m)
      );
    },
  ]);
};
