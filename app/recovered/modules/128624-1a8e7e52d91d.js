// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(550675);
  var r = e.i(547562),
    l = e.i(595673);
  e.s([
    "f",
    0,
    () => {
      let e,
        a,
        s = (0, t.c)(5),
        [i, n] = (0, r.l)("chart.markers.calloutMinPositionUsd");
      s[0] !== n
        ? ((e = (e) => {
            e !== (0, r.L)("chart.markers.calloutMinPositionUsd") &&
              ((0, l.ri)({ buttonId: `chart_callout_min_position:${e}` }),
              n(e));
          }),
          (s[0] = n),
          (s[1] = e))
        : (e = s[1]);
      let d = e;
      return (
        s[2] !== i || s[3] !== d
          ? ((a = { minPositionUsd: i, pickMinPositionUsd: d }),
            (s[2] = i),
            (s[3] = d),
            (s[4] = a))
          : (a = s[4]),
        a
      );
    },
  ]);
};
