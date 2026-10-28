// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(164771);
  e.s([
    "f",
    0,
    function (e, n = r.i) {
      let [u] = (0, t.useState)(() => {
        let e, t;
        return (
          (t = !1),
          {
            keep: (r) =>
              t && void 0 !== e && n(e, r) ? e : ((e = r), (t = !0), r),
          }
        );
      });
      return u.keep(e);
    },
  ]);
};
