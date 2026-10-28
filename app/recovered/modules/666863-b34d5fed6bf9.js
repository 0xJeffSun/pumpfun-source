// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    i = e.i(456753);
  e.s([
    "f",
    0,
    (e, a, n, s) => {
      let l,
        o,
        c,
        m = (0, t.c)(11),
        d = (0, r.useRef)(null),
        { observe: u, unobserve: h, addSeenCoin: x } = (0, i.j)();
      m[0] !== x ||
      m[1] !== a ||
      m[2] !== e ||
      m[3] !== u ||
      m[4] !== n ||
      m[5] !== s
        ? ((l = () => {
            d.current &&
              void 0 !== a &&
              u(
                d.current,
                e,
                () => {
                  x({
                    coinId: e,
                    itemPosition: a.itemPosition,
                    marketCap: a.marketCap,
                    sourceScreen: a.sourceScreen,
                    rec_id: a.rec_id,
                    recommendationRank: a.recommendationRank,
                    searchTerm: n,
                    sourceElement: a.sourceElement ?? s,
                  });
                },
                a.rec_id,
              );
          }),
          (m[0] = x),
          (m[1] = a),
          (m[2] = e),
          (m[3] = u),
          (m[4] = n),
          (m[5] = s),
          (m[6] = l))
        : (l = m[6]);
      let f = l;
      return (
        m[7] !== f || m[8] !== h
          ? ((o = () => {
              f();
              let e = d.current;
              return () => {
                e && h(e);
              };
            }),
            (c = [f, h]),
            (m[7] = f),
            (m[8] = h),
            (m[9] = o),
            (m[10] = c))
          : ((o = m[9]), (c = m[10])),
        (0, r.useEffect)(o, c),
        d
      );
    },
  ]);
};
