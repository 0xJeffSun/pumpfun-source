// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var a = e.i(398902),
    i = e.i(372550);
  let n = ["all", ...e.i(21617).o],
    l = {
      all: "web.screeners.perps_category_all",
      crypto: "web.screeners.perps_category_crypto",
      stocks: "web.screeners.perps_category_stocks",
      commodities: "web.screeners.perps_category_commodities",
    };
  e.s([
    "f",
    0,
    function (e) {
      let s,
        o,
        d,
        u = (0, r.c)(11),
        { density: c, value: m, onChange: p, align: h } = e,
        f = void 0 === h ? "end" : h,
        { t: g } = (0, a.f)();
      u[0] !== g
        ? ((s = n.map((e) => ({ value: e, label: g(l[e]) }))),
          (u[0] = g),
          (u[1] = s))
        : (s = u[1]);
      let b = s;
      return (
        u[2] !== g
          ? ((o = g("web.screeners.perps_categories_a11y")),
            (u[2] = g),
            (u[3] = o))
          : (o = u[3]),
        u[4] !== f ||
        u[5] !== c ||
        u[6] !== p ||
        u[7] !== b ||
        u[8] !== o ||
        u[9] !== m
          ? ((d = (0, t.jsx)(i.f, {
              density: c,
              value: m,
              onChange: p,
              options: b,
              align: f,
              "aria-label": o,
              "data-testid": "perps-category",
            })),
            (u[4] = f),
            (u[5] = c),
            (u[6] = p),
            (u[7] = b),
            (u[8] = o),
            (u[9] = m),
            (u[10] = d))
          : (d = u[10]),
        d
      );
    },
  ]);
};
