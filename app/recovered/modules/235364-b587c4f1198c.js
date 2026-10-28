// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(595673);
  async function r(e, t, r) {
    if (void 0 !== t)
      try {
        (0, i.iV)({
          coinId: e,
          itemPosition: t.itemPosition,
          marketCap: t.marketCap,
          sourceScreen: t.sourceScreen,
          rec_id: t.rec_id,
          recommendationRank: t.recommendationRank,
          searchTerm: r,
          sourceElement: t.sourceElement,
        });
      } catch (e) {
        console.error("Error tracking coin click:", e);
      }
  }
  e.s([
    "f",
    0,
    () => {
      let e,
        i = (0, t.c)(1);
      return (
        i[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = { handleCoinClick: r }), (i[0] = e))
          : (e = i[0]),
        e
      );
    },
  ]);
};
