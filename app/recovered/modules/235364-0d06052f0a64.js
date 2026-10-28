// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(595673);
  async function a(e, t, a) {
    if (void 0 !== t)
      try {
        (0, r.iV)({
          coinId: e,
          itemPosition: t.itemPosition,
          marketCap: t.marketCap,
          sourceScreen: t.sourceScreen,
          rec_id: t.rec_id,
          recommendationRank: t.recommendationRank,
          searchTerm: a,
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
        r = (0, t.c)(1);
      return (
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = { handleCoinClick: a }), (r[0] = e))
          : (e = r[0]),
        e
      );
    },
  ]);
};
