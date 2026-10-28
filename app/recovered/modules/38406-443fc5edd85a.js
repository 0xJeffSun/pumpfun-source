// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(79631),
    r = e.i(889451),
    i = e.i(384886);
  e.s([
    "f",
    0,
    (e) => {
      let a,
        o,
        l = (0, t.c)(9),
        { mint: s, authorAddress: u, positionPnl: d, chainId: c } = e,
        f = !!d,
        h = (0, i.h)(s, c),
        {
          positionFor: m,
          isLoading: g,
          isError: p,
        } = (0, n._)({ userId: u, mints: [h], enabled: !f }),
        b = r.y,
        w = d ?? m(h) ?? m(s);
      l[0] !== b || l[1] !== w
        ? ((a = b(w)), (l[0] = b), (l[1] = w), (l[2] = a))
        : (a = l[2]);
      let _ = a,
        y = !!(_ && !_.isClosed),
        z = !f && g,
        v = !f && p,
        x = !z && !v && _?.isClosed === !0,
        M = !!s && !!u && !z && !v && x;
      return (
        l[3] !== y || l[4] !== x || l[5] !== v || l[6] !== z || l[7] !== M
          ? ((o = {
              hasOpenPosition: y,
              isClosed: x,
              isLoading: z,
              isError: v,
              shouldHide: M,
            }),
            (l[3] = y),
            (l[4] = x),
            (l[5] = v),
            (l[6] = z),
            (l[7] = M),
            (l[8] = o))
          : (o = l[8]),
        o
      );
    },
  ]);
};
