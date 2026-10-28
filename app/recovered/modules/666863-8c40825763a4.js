// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(352386),
    l = e.i(456753);
  e.s([
    "f",
    0,
    (e, r, a, o) => {
      let n,
        s,
        d,
        c = (0, t.c)(11),
        u = (0, i.useRef)(null),
        { observe: m, unobserve: p, addSeenCoin: f } = (0, l.j)();
      c[0] !== f ||
      c[1] !== r ||
      c[2] !== e ||
      c[3] !== m ||
      c[4] !== a ||
      c[5] !== o
        ? ((n = () => {
            u.current &&
              void 0 !== r &&
              m(
                u.current,
                e,
                () => {
                  f({
                    coinId: e,
                    itemPosition: r.itemPosition,
                    marketCap: r.marketCap,
                    sourceScreen: r.sourceScreen,
                    rec_id: r.rec_id,
                    recommendationRank: r.recommendationRank,
                    searchTerm: a,
                    sourceElement: r.sourceElement ?? o,
                  });
                },
                r.rec_id,
              );
          }),
          (c[0] = f),
          (c[1] = r),
          (c[2] = e),
          (c[3] = m),
          (c[4] = a),
          (c[5] = o),
          (c[6] = n))
        : (n = c[6]);
      let h = n;
      return (
        c[7] !== h || c[8] !== p
          ? ((s = () => {
              h();
              let e = u.current;
              return () => {
                e && p(e);
              };
            }),
            (d = [h, p]),
            (c[7] = h),
            (c[8] = p),
            (c[9] = s),
            (c[10] = d))
          : ((s = c[9]), (d = c[10])),
        (0, i.useEffect)(s, d),
        u
      );
    },
  ]);
};
