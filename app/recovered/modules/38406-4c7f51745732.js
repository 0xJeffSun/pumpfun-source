// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(79631),
    i = e.i(889451),
    l = e.i(384886);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        n,
        o = (0, t.c)(9),
        { mint: s, authorAddress: c, positionPnl: d, chainId: u } = e,
        m = !!d,
        p = (0, l.h)(s, u),
        {
          positionFor: h,
          isLoading: f,
          isError: y,
        } = (0, r._)({ userId: c, mints: [p], enabled: !m }),
        b = i.y,
        v = d ?? h(p) ?? h(s);
      o[0] !== b || o[1] !== v
        ? ((a = b(v)), (o[0] = b), (o[1] = v), (o[2] = a))
        : (a = o[2]);
      let g = a,
        x = !!(g && !g.isClosed),
        C = !m && f,
        k = !m && y,
        w = !C && !k && g?.isClosed === !0,
        S = !!s && !!c && !C && !k && w;
      return (
        o[3] !== x || o[4] !== w || o[5] !== k || o[6] !== C || o[7] !== S
          ? ((n = {
              hasOpenPosition: x,
              isClosed: w,
              isLoading: C,
              isError: k,
              shouldHide: S,
            }),
            (o[3] = x),
            (o[4] = w),
            (o[5] = k),
            (o[6] = C),
            (o[7] = S),
            (o[8] = n))
          : (n = o[8]),
        n
      );
    },
  ]);
};
