// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(79631),
    l = e.i(889451),
    a = e.i(384886);
  e.s([
    "f",
    0,
    (e) => {
      let i,
        n,
        s = (0, t.c)(9),
        { mint: o, authorAddress: d, positionPnl: c, chainId: u } = e,
        m = !!c,
        f = (0, a.h)(o, u),
        {
          positionFor: p,
          isLoading: h,
          isError: v,
        } = (0, r._)({ userId: d, mints: [f], enabled: !m }),
        b = l.y,
        g = c ?? p(f) ?? p(o);
      s[0] !== b || s[1] !== g
        ? ((i = b(g)), (s[0] = b), (s[1] = g), (s[2] = i))
        : (i = s[2]);
      let y = i,
        x = !!(y && !y.isClosed),
        w = !m && h,
        _ = !m && v,
        A = !w && !_ && y?.isClosed === !0,
        j = !!o && !!d && !w && !_ && A;
      return (
        s[3] !== x || s[4] !== A || s[5] !== _ || s[6] !== w || s[7] !== j
          ? ((n = {
              hasOpenPosition: x,
              isClosed: A,
              isLoading: w,
              isError: _,
              shouldHide: j,
            }),
            (s[3] = x),
            (s[4] = A),
            (s[5] = _),
            (s[6] = w),
            (s[7] = j),
            (s[8] = n))
          : (n = s[8]),
        n
      );
    },
  ]);
};
