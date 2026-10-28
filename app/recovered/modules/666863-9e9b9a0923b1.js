// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386),
    a = e.i(456753);
  e.s([
    "f",
    0,
    (e, i, n, l) => {
      let s,
        o,
        c,
        d = (0, t.c)(11),
        m = (0, r.useRef)(null),
        { observe: u, unobserve: f, addSeenCoin: h } = (0, a.j)();
      d[0] !== h ||
      d[1] !== i ||
      d[2] !== e ||
      d[3] !== u ||
      d[4] !== n ||
      d[5] !== l
        ? ((s = () => {
            m.current &&
              void 0 !== i &&
              u(
                m.current,
                e,
                () => {
                  h({
                    coinId: e,
                    itemPosition: i.itemPosition,
                    marketCap: i.marketCap,
                    sourceScreen: i.sourceScreen,
                    rec_id: i.rec_id,
                    recommendationRank: i.recommendationRank,
                    searchTerm: n,
                    sourceElement: i.sourceElement ?? l,
                  });
                },
                i.rec_id,
              );
          }),
          (d[0] = h),
          (d[1] = i),
          (d[2] = e),
          (d[3] = u),
          (d[4] = n),
          (d[5] = l),
          (d[6] = s))
        : (s = d[6]);
      let p = s;
      return (
        d[7] !== p || d[8] !== f
          ? ((o = () => {
              p();
              let e = m.current;
              return () => {
                e && f(e);
              };
            }),
            (c = [p, f]),
            (d[7] = p),
            (d[8] = f),
            (d[9] = o),
            (d[10] = c))
          : ((o = d[9]), (c = d[10])),
        (0, r.useEffect)(o, c),
        m
      );
    },
  ]);
};
