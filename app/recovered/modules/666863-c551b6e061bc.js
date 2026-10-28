// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386),
    r = e.i(456753);
  e.s([
    "f",
    0,
    (e, s, l, a) => {
      let n,
        o,
        c,
        d = (0, t.c)(11),
        m = (0, i.useRef)(null),
        { observe: u, unobserve: f, addSeenCoin: h } = (0, r.j)();
      d[0] !== h ||
      d[1] !== s ||
      d[2] !== e ||
      d[3] !== u ||
      d[4] !== l ||
      d[5] !== a
        ? ((n = () => {
            m.current &&
              void 0 !== s &&
              u(
                m.current,
                e,
                () => {
                  h({
                    coinId: e,
                    itemPosition: s.itemPosition,
                    marketCap: s.marketCap,
                    sourceScreen: s.sourceScreen,
                    rec_id: s.rec_id,
                    recommendationRank: s.recommendationRank,
                    searchTerm: l,
                    sourceElement: s.sourceElement ?? a,
                  });
                },
                s.rec_id,
              );
          }),
          (d[0] = h),
          (d[1] = s),
          (d[2] = e),
          (d[3] = u),
          (d[4] = l),
          (d[5] = a),
          (d[6] = n))
        : (n = d[6]);
      let x = n;
      return (
        d[7] !== x || d[8] !== f
          ? ((o = () => {
              x();
              let e = m.current;
              return () => {
                e && f(e);
              };
            }),
            (c = [x, f]),
            (d[7] = x),
            (d[8] = f),
            (d[9] = o),
            (d[10] = c))
          : ((o = d[9]), (c = d[10])),
        (0, i.useEffect)(o, c),
        m
      );
    },
  ]);
};
