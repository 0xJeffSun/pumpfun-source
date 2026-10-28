// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(439587);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(326929);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        o,
        s,
        c,
        d,
        u,
        m,
        p,
        h,
        f = (0, r.c)(22),
        { view: y, onRetry: b } = e,
        v = void 0 === y ? "candle" : y,
        { t: g } = (0, l.f)();
      f[0] !== v ? ((n = (0, a.l)(v)), (f[0] = v), (f[1] = n)) : (n = f[1]);
      let x = n;
      return (
        f[2] !== x
          ? ((o = { minHeight: x }), (f[2] = x), (f[3] = o))
          : (o = f[3]),
        f[4] !== g
          ? ((s = g("web.coin.chart_load_failed")), (f[4] = g), (f[5] = s))
          : (s = f[5]),
        f[6] !== s
          ? ((c = (0, t.jsx)("p", {
              className: "text-sm text-text-secondary",
              children: s,
            })),
            (f[6] = s),
            (f[7] = c))
          : (c = f[7]),
        f[8] !== g
          ? ((d = g("web.chart.temporarily_unavailable")),
            (f[8] = g),
            (f[9] = d))
          : (d = f[9]),
        f[10] !== d
          ? ((u = (0, t.jsx)("p", {
              className: "mt-1 text-xs text-text-tertiary",
              children: d,
            })),
            (f[10] = d),
            (f[11] = u))
          : (u = f[11]),
        f[12] !== g
          ? ((m = g("common.try_again")), (f[12] = g), (f[13] = m))
          : (m = f[13]),
        f[14] !== b || f[15] !== m
          ? ((p = (0, t.jsx)(i.K, {
              className: "mt-4",
              onClick: b,
              size: 40,
              type: "button",
              variant: "secondary",
              children: m,
            })),
            (f[14] = b),
            (f[15] = m),
            (f[16] = p))
          : (p = f[16]),
        f[17] !== o || f[18] !== c || f[19] !== u || f[20] !== p
          ? ((h = (0, t.jsxs)("div", {
              className:
                "flex w-full flex-col items-center justify-center rounded-md px-4 text-center",
              "data-testid": "coin-chart-load-error",
              role: "alert",
              style: o,
              children: [c, u, p],
            })),
            (f[17] = o),
            (f[18] = c),
            (f[19] = u),
            (f[20] = p),
            (f[21] = h))
          : (h = f[21]),
        h
      );
    },
  ]);
};
