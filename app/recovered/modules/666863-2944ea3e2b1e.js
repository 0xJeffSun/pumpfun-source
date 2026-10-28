// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(352386),
    i = e.i(456753);
  e.s([
    "f",
    0,
    (e, l, r, n) => {
      let o,
        s,
        d,
        c = (0, t.c)(11),
        u = (0, a.useRef)(null),
        { observe: m, unobserve: p, addSeenCoin: h } = (0, i.j)();
      c[0] !== h ||
      c[1] !== l ||
      c[2] !== e ||
      c[3] !== m ||
      c[4] !== r ||
      c[5] !== n
        ? ((o = () => {
            u.current &&
              void 0 !== l &&
              m(
                u.current,
                e,
                () => {
                  h({
                    coinId: e,
                    itemPosition: l.itemPosition,
                    marketCap: l.marketCap,
                    sourceScreen: l.sourceScreen,
                    rec_id: l.rec_id,
                    recommendationRank: l.recommendationRank,
                    searchTerm: r,
                    sourceElement: l.sourceElement ?? n,
                  });
                },
                l.rec_id,
              );
          }),
          (c[0] = h),
          (c[1] = l),
          (c[2] = e),
          (c[3] = m),
          (c[4] = r),
          (c[5] = n),
          (c[6] = o))
        : (o = c[6]);
      let f = o;
      return (
        c[7] !== f || c[8] !== p
          ? ((s = () => {
              f();
              let e = u.current;
              return () => {
                e && p(e);
              };
            }),
            (d = [f, p]),
            (c[7] = f),
            (c[8] = p),
            (c[9] = s),
            (c[10] = d))
          : ((s = c[9]), (d = c[10])),
        (0, a.useEffect)(s, d),
        u
      );
    },
  ]);
};
