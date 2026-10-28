// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    i = e.i(238442),
    l = e.i(187611);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        o,
        s,
        u,
        c,
        d,
        m,
        f = (0, n.c)(21),
        { count: p, onClick: h, avatars: g, placement: y, className: v } = e,
        { t: b } = (0, r.f)();
      if (f[0] !== g || f[1] !== v || f[2] !== p || f[3] !== b) {
        let e = (0, l.T)(p > 99 ? "99+" : String(p), "number-format");
        ((a = i.f),
          (o = g),
          (s = v),
          (u = p),
          (c = b("web.feed.show_new_callouts", { count: p, shown: e })),
          (f[0] = g),
          (f[1] = v),
          (f[2] = p),
          (f[3] = b),
          (f[4] = a),
          (f[5] = o),
          (f[6] = s),
          (f[7] = u),
          (f[8] = c));
      } else ((a = f[4]), (o = f[5]), (s = f[6]), (u = f[7]), (c = f[8]));
      return (
        f[9] !== p || f[10] !== b
          ? ((d = b("web.feed.new_callouts", { count: p })),
            (f[9] = p),
            (f[10] = b),
            (f[11] = d))
          : (d = f[11]),
        f[12] !== a ||
        f[13] !== h ||
        f[14] !== y ||
        f[15] !== o ||
        f[16] !== s ||
        f[17] !== u ||
        f[18] !== c ||
        f[19] !== d
          ? ((m = (0, t.jsx)(a, {
              avatars: o,
              className: s,
              count: u,
              label: c,
              tail: d,
              onClick: h,
              placement: y,
            })),
            (f[12] = a),
            (f[13] = h),
            (f[14] = y),
            (f[15] = o),
            (f[16] = s),
            (f[17] = u),
            (f[18] = c),
            (f[19] = d),
            (f[20] = m))
          : (m = f[20]),
        m
      );
    },
  ]);
};
