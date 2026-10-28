// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(690877),
    r = e.i(606933),
    n = e.i(280740),
    i = e.i(897453),
    a = e.i(85324),
    s = e.i(339179),
    o = e.i(485759);
  e.s([
    "f",
    0,
    (e) => {
      let c,
        d,
        u,
        m,
        f,
        x,
        h = (0, t.c)(18),
        { owner: p, chainId: g, token: b, enabled: v } = e,
        y = void 0 === v || v,
        _ = (0, r.useQueryClient)();
      h[0] !== g || h[1] !== y || h[2] !== p || h[3] !== _ || h[4] !== b
        ? ((d = o.f.byOwnerChainToken({
            owner: p ?? "",
            chainId: g ?? "",
            token: b ?? "",
          })),
          (c = y && !!p && !!g && !!b),
          (u = a.q),
          (m = (0, i.I)(_.getQueryData(d))),
          (h[0] = g),
          (h[1] = y),
          (h[2] = p),
          (h[3] = _),
          (h[4] = b),
          (h[5] = c),
          (h[6] = d),
          (h[7] = u),
          (h[8] = m))
        : ((c = h[5]), (d = h[6]), (u = h[7]), (m = h[8]));
      let j = u(m, c);
      return (
        h[9] !== g || h[10] !== p || h[11] !== b
          ? ((f = () =>
              (0, s.n)({ owner: p ?? "", chainId: g ?? "", token: b ?? "" })),
            (h[9] = g),
            (h[10] = p),
            (h[11] = b),
            (h[12] = f))
          : (f = h[12]),
        h[13] !== c || h[14] !== d || h[15] !== j || h[16] !== f
          ? ((x = {
              queryKey: d,
              queryFn: f,
              enabled: c,
              staleTime: n.T,
              retry: !1,
              refetchInterval: j,
              refetchIntervalInBackground: !1,
              refetchOnWindowFocus: !0,
            }),
            (h[13] = c),
            (h[14] = d),
            (h[15] = j),
            (h[16] = f),
            (h[17] = x))
          : (x = h[17]),
        (0, l.useQuery)(x)
      );
    },
  ]);
};
