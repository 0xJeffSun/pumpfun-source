// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(372550);
  let s = ["all", ...e.i(21617).o],
    n = {
      all: "web.screeners.perps_category_all",
      crypto: "web.screeners.perps_category_crypto",
      stocks: "web.screeners.perps_category_stocks",
      commodities: "web.screeners.perps_category_commodities",
    };
  e.s([
    "f",
    0,
    function (e) {
      let l,
        o,
        c,
        d = (0, r.c)(11),
        { density: u, value: m, onChange: p, align: f } = e,
        x = void 0 === f ? "end" : f,
        { t: g } = (0, i.f)();
      d[0] !== g
        ? ((l = s.map((e) => ({ value: e, label: g(n[e]) }))),
          (d[0] = g),
          (d[1] = l))
        : (l = d[1]);
      let h = l;
      return (
        d[2] !== g
          ? ((o = g("web.screeners.perps_categories_a11y")),
            (d[2] = g),
            (d[3] = o))
          : (o = d[3]),
        d[4] !== x ||
        d[5] !== u ||
        d[6] !== p ||
        d[7] !== h ||
        d[8] !== o ||
        d[9] !== m
          ? ((c = (0, t.jsx)(a.f, {
              density: u,
              value: m,
              onChange: p,
              options: h,
              align: x,
              "aria-label": o,
              "data-testid": "perps-category",
            })),
            (d[4] = x),
            (d[5] = u),
            (d[6] = p),
            (d[7] = h),
            (d[8] = o),
            (d[9] = m),
            (d[10] = c))
          : (c = d[10]),
        c
      );
    },
  ]);
};
