// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(157633),
    i = e.i(745018),
    n = e.i(497968),
    l = e.i(338319);
  let s = {
    watchlist: { fill: a.G3, line: i.G3 },
    trending: { fill: n.a, line: n.a },
    movers: { fill: a._X, line: i._X },
    calls: { fill: a.EX, line: i.EX },
    live: { fill: a.s4, line: i.s4 },
    new: { fill: a.Ip, line: i.Ip },
    oldest: { fill: a.s6, line: i.s6 },
    charities: { fill: a.cJ, line: i.cJ },
    custom_pairs: { fill: a.HU, line: i.HU },
    stocks: { fill: a.oY, line: i.oY },
    majors: { fill: a.GV, line: i.GV },
    market_cap: { fill: a.oX, line: i.oX },
  };
  e.s([
    "f",
    0,
    function (e) {
      let a,
        i,
        n,
        o = (0, r.c)(8),
        { id: c, active: d, className: m } = e,
        u = void 0 !== d && d,
        f = s[c],
        h = u ? f.fill : f.line,
        p = u ? "fill" : "line";
      return (
        o[0] !== m
          ? ((a = (0, l.c)("size-4 shrink-0", m)), (o[0] = m), (o[1] = a))
          : (a = o[1]),
        o[2] !== h || o[3] !== a
          ? ((i = (0, t.jsx)(h, { className: a })),
            (o[2] = h),
            (o[3] = a),
            (o[4] = i))
          : (i = o[4]),
        o[5] !== p || o[6] !== i
          ? ((n = (0, t.jsx)("span", {
              "aria-hidden": !0,
              className: "inline-flex shrink-0",
              "data-glyph": p,
              children: i,
            })),
            (o[5] = p),
            (o[6] = i),
            (o[7] = n))
          : (n = o[7]),
        n
      );
    },
  ]);
};
