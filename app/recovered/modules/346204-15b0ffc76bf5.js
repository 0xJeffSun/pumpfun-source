// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242);
  e.i(12692);
  var i = e.i(398902),
    l = e.i(372550);
  let r = ["all", ...e.i(21617).o],
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
      let o,
        s,
        d,
        c = (0, a.c)(11),
        { density: u, value: m, onChange: p, align: h } = e,
        f = void 0 === h ? "end" : h,
        { t: g } = (0, i.f)();
      c[0] !== g
        ? ((o = r.map((e) => ({ value: e, label: g(n[e]) }))),
          (c[0] = g),
          (c[1] = o))
        : (o = c[1]);
      let y = o;
      return (
        c[2] !== g
          ? ((s = g("web.screeners.perps_categories_a11y")),
            (c[2] = g),
            (c[3] = s))
          : (s = c[3]),
        c[4] !== f ||
        c[5] !== u ||
        c[6] !== p ||
        c[7] !== y ||
        c[8] !== s ||
        c[9] !== m
          ? ((d = (0, t.jsx)(l.f, {
              density: u,
              value: m,
              onChange: p,
              options: y,
              align: f,
              "aria-label": s,
              "data-testid": "perps-category",
            })),
            (c[4] = f),
            (c[5] = u),
            (c[6] = p),
            (c[7] = y),
            (c[8] = s),
            (c[9] = m),
            (c[10] = d))
          : (d = c[10]),
        d
      );
    },
  ]);
};
