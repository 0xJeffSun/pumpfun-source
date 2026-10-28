// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(574472),
    n = e.i(690877),
    s = e.i(4911),
    l = e.i(896342),
    r = e.i(460261);
  let a = [r.M],
    o = (e, t) => ["bridgeTokenTradability", e, t.toLowerCase()];
  e.s([
    "c",
    0,
    o,
    "Q",
    0,
    (e) => {
      let u,
        d,
        c,
        m,
        _,
        h,
        g,
        p = (0, t.c)(20),
        { mint: b, chainId: f, enabled: z } = e,
        w = void 0 === z || z,
        { address: y, userId: v } = (0, i.F)();
      (p[0] !== y || p[1] !== w || p[2] !== f || p[3] !== b || p[4] !== v
        ? ((d = (0, r.b)(f)),
          (u =
            w &&
            (0, l._)() &&
            null !== d &&
            a.includes(d) &&
            !!y &&
            !!v &&
            (0, s.f)(b)),
          (m = n.useQuery),
          (c = o(d, b)),
          (p[0] = y),
          (p[1] = w),
          (p[2] = f),
          (p[3] = b),
          (p[4] = v),
          (p[5] = u),
          (p[6] = d),
          (p[7] = c),
          (p[8] = m))
        : ((u = p[5]), (d = p[6]), (c = p[7]), (m = p[8])),
        p[9] !== b || p[10] !== d
          ? ((_ = (e) => {
              let { signal: t } = e;
              return (0, l.l)({ evmChainId: d, evmToken: b }, { signal: t });
            }),
            (p[9] = b),
            (p[10] = d),
            (p[11] = _))
          : (_ = p[11]),
        p[12] !== u || p[13] !== c || p[14] !== _
          ? ((h = {
              queryKey: c,
              queryFn: _,
              enabled: u,
              staleTime: 3e5,
              retry: !1,
            }),
            (p[12] = u),
            (p[13] = c),
            (p[14] = _),
            (p[15] = h))
          : (h = p[15]));
      let x = m(h),
        k = x.data?.tradable,
        j = x.data?.tokenized_stock,
        S = u && x.isPending;
      return (
        p[16] !== k || p[17] !== j || p[18] !== S
          ? ((g = { tradable: k, tokenizedStock: j, isLoading: S }),
            (p[16] = k),
            (p[17] = j),
            (p[18] = S),
            (p[19] = g))
          : (g = p[19]),
        g
      );
    },
  ]);
};
