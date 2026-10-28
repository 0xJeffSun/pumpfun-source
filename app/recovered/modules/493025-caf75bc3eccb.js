// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(426091);
  let i = /^https?:\/\//i;
  e.s([
    "f",
    0,
    function (e, r, n) {
      return e.map((e) => {
        var a;
        let o;
        return (
          void 0 !== e.created_at &&
            void 0 === e.created_timestamp &&
            (e.created_timestamp = e.created_at),
          void 0 !== e.recommendation_id &&
            void 0 === e.rec_id &&
            (e.rec_id = e.recommendation_id),
          e.image_uri &&
            ((a = e.image_uri),
            (o = (0, t.r)(a, r)),
            (e.image_uri = a !== t.A && o === t.A && i.test(a) ? a : o)),
          e.metadata_uri && (e.metadata_uri = (0, t.r)(e.metadata_uri, r)),
          n && (e.searchTerm = n),
          !0 === e.ischarity && void 0 === e.is_charity && (e.is_charity = !0),
          e
        );
      });
    },
  ]);
};
