// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386),
    r = e.i(456753);
  e.s([
    "f",
    0,
    (e, a, n, s) => {
      let l,
        o,
        c,
        m = (0, t.c)(11),
        u = (0, i.useRef)(null),
        { observe: d, unobserve: f, addSeenCoin: p } = (0, r.j)();
      m[0] !== p ||
      m[1] !== a ||
      m[2] !== e ||
      m[3] !== d ||
      m[4] !== n ||
      m[5] !== s
        ? ((l = () => {
            u.current &&
              void 0 !== a &&
              d(
                u.current,
                e,
                () => {
                  p({
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
          (m[0] = p),
          (m[1] = a),
          (m[2] = e),
          (m[3] = d),
          (m[4] = n),
          (m[5] = s),
          (m[6] = l))
        : (l = m[6]);
      let h = l;
      return (
        m[7] !== h || m[8] !== f
          ? ((o = () => {
              h();
              let e = u.current;
              return () => {
                e && f(e);
              };
            }),
            (c = [h, f]),
            (m[7] = h),
            (m[8] = f),
            (m[9] = o),
            (m[10] = c))
          : ((o = m[9]), (c = m[10])),
        (0, i.useEffect)(o, c),
        u
      );
    },
  ]);
};
