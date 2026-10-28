// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(930519),
    r = e.i(342e3),
    n = e.i(646908),
    i = e.i(978854),
    a = e.i(605587);
  function s(e) {
    return e.setLatest;
  }
  e.s([
    "f",
    0,
    (e) => {
      let o,
        c,
        d,
        u,
        m,
        f = (0, t.c)(20),
        {
          mint: x,
          chainId: h,
          throttleMs: p,
          enabled: g,
          foldMarketData: b,
          feedTape: v,
        } = e,
        y = void 0 === p ? 16 : p,
        _ = void 0 === g || g,
        j = void 0 === b || b,
        w = void 0 === v || v,
        N = (0, i.m)(s);
      f[0] !== h || f[1] !== x
        ? ((o = (0, a.N)({ mint: x, chainId: h })),
          (f[0] = h),
          (f[1] = x),
          (f[2] = o))
        : (o = f[2]);
      let k = o;
      f[3] !== h
        ? ((c = (0, n.L)(h) || (0, n.B)(h) || (0, n._)(h)),
          (f[3] = h),
          (f[4] = c))
        : (c = f[4]);
      let S = c;
      f[5] !== w || f[6] !== j || f[7] !== x || f[8] !== N
        ? ((d = (e) => {
            e.mintAddress === x && N(x, e, { fold: j, buffer: w });
          }),
          (f[5] = w),
          (f[6] = j),
          (f[7] = x),
          (f[8] = N),
          (f[9] = d))
        : (d = f[9]);
      let C = d,
        M = _ && !k && !S && !!x;
      (f[10] !== x || f[11] !== C || f[12] !== M || f[13] !== y
        ? ((u = { mint: x, onTrade: C, throttleMs: y, isEnabled: M }),
          (f[10] = x),
          (f[11] = C),
          (f[12] = M),
          (f[13] = y),
          (f[14] = u))
        : (u = f[14]),
        (0, r.f)(u));
      let I = _ && k;
      (f[15] !== h || f[16] !== x || f[17] !== C || f[18] !== I
        ? ((m = { mint: x, chainId: h, onTrade: C, isEnabled: I }),
          (f[15] = h),
          (f[16] = x),
          (f[17] = C),
          (f[18] = I),
          (f[19] = m))
        : (m = f[19]),
        (0, l.f)(m));
    },
  ]);
};
