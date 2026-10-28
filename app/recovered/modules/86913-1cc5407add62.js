// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(574472),
    i = e.i(690877),
    a = e.i(4911),
    r = e.i(896342),
    s = e.i(460261);
  let l = [s.M],
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
        g,
        p,
        f,
        h = (0, t.c)(20),
        { mint: _, chainId: b, enabled: y } = e,
        v = void 0 === y || y,
        { address: w, userId: x } = (0, n.F)();
      (h[0] !== w || h[1] !== v || h[2] !== b || h[3] !== _ || h[4] !== x
        ? ((d = (0, s.b)(b)),
          (u =
            v &&
            (0, r._)() &&
            null !== d &&
            l.includes(d) &&
            !!w &&
            !!x &&
            (0, a.f)(_)),
          (m = i.useQuery),
          (c = o(d, _)),
          (h[0] = w),
          (h[1] = v),
          (h[2] = b),
          (h[3] = _),
          (h[4] = x),
          (h[5] = u),
          (h[6] = d),
          (h[7] = c),
          (h[8] = m))
        : ((u = h[5]), (d = h[6]), (c = h[7]), (m = h[8])),
        h[9] !== _ || h[10] !== d
          ? ((g = (e) => {
              let { signal: t } = e;
              return (0, r.l)({ evmChainId: d, evmToken: _ }, { signal: t });
            }),
            (h[9] = _),
            (h[10] = d),
            (h[11] = g))
          : (g = h[11]),
        h[12] !== u || h[13] !== c || h[14] !== g
          ? ((p = {
              queryKey: c,
              queryFn: g,
              enabled: u,
              staleTime: 3e5,
              retry: !1,
            }),
            (h[12] = u),
            (h[13] = c),
            (h[14] = g),
            (h[15] = p))
          : (p = h[15]));
      let z = m(p),
        A = z.data?.tradable,
        S = z.data?.tokenized_stock,
        k = u && z.isPending;
      return (
        h[16] !== A || h[17] !== S || h[18] !== k
          ? ((f = { tradable: A, tokenizedStock: S, isLoading: k }),
            (h[16] = A),
            (h[17] = S),
            (h[18] = k),
            (h[19] = f))
          : (f = h[19]),
        f
      );
    },
  ]);
};
