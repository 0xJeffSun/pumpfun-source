// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(439587);
  e.i(12692);
  var a = e.i(398902),
    o = e.i(326929);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        n,
        s,
        c,
        d,
        m,
        u,
        p,
        h,
        b = (0, r.c)(22),
        { view: x, onRetry: f } = e,
        g = void 0 === x ? "candle" : x,
        { t: y } = (0, a.f)();
      b[0] !== g ? ((i = (0, o.l)(g)), (b[0] = g), (b[1] = i)) : (i = b[1]);
      let v = i;
      return (
        b[2] !== v
          ? ((n = { minHeight: v }), (b[2] = v), (b[3] = n))
          : (n = b[3]),
        b[4] !== y
          ? ((s = y("web.coin.chart_load_failed")), (b[4] = y), (b[5] = s))
          : (s = b[5]),
        b[6] !== s
          ? ((c = (0, t.jsx)("p", {
              className: "text-sm text-text-secondary",
              children: s,
            })),
            (b[6] = s),
            (b[7] = c))
          : (c = b[7]),
        b[8] !== y
          ? ((d = y("web.chart.temporarily_unavailable")),
            (b[8] = y),
            (b[9] = d))
          : (d = b[9]),
        b[10] !== d
          ? ((m = (0, t.jsx)("p", {
              className: "mt-1 text-xs text-text-tertiary",
              children: d,
            })),
            (b[10] = d),
            (b[11] = m))
          : (m = b[11]),
        b[12] !== y
          ? ((u = y("common.try_again")), (b[12] = y), (b[13] = u))
          : (u = b[13]),
        b[14] !== f || b[15] !== u
          ? ((p = (0, t.jsx)(l.K, {
              className: "mt-4",
              onClick: f,
              size: 40,
              type: "button",
              variant: "secondary",
              children: u,
            })),
            (b[14] = f),
            (b[15] = u),
            (b[16] = p))
          : (p = b[16]),
        b[17] !== n || b[18] !== c || b[19] !== m || b[20] !== p
          ? ((h = (0, t.jsxs)("div", {
              className:
                "flex w-full flex-col items-center justify-center rounded-md px-4 text-center",
              "data-testid": "coin-chart-load-error",
              role: "alert",
              style: n,
              children: [c, m, p],
            })),
            (b[17] = n),
            (b[18] = c),
            (b[19] = m),
            (b[20] = p),
            (b[21] = h))
          : (h = b[21]),
        h
      );
    },
  ]);
};
