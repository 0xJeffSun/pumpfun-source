// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    s = e.i(352386),
    a = e.i(506486),
    i = e.i(237687);
  function o() {}
  e.s([
    "f",
    0,
    function (e) {
      let l,
        c,
        u,
        d,
        m,
        g = (0, n.c)(12),
        { mint: p, existingCalloutPromise: f, screen: h, onActed: b } = e,
        [_, y] = (0, s.useState)(!1);
      (g[0] !== f
        ? ((l = () => {
            if (!f) return;
            let e = !0;
            return (
              f
                .then((t) => {
                  e && t && y(!0);
                })
                .catch(o),
              () => {
                e = !1;
              }
            );
          }),
          (c = [f]),
          (g[0] = f),
          (g[1] = l),
          (g[2] = c))
        : ((l = g[1]), (c = g[2])),
        (0, s.useEffect)(l, c),
        g[3] !== _ || g[4] !== p || g[5] !== b || g[6] !== h
          ? ((u = (e) => {
              (e.stopPropagation(),
                _
                  ? (0, i.R)({ mint: p, entryPoint: "trade_success_toast" })
                  : (0, i._)({ mint: p }, h ? { screen: h } : void 0),
                b?.());
            }),
            (g[3] = _),
            (g[4] = p),
            (g[5] = b),
            (g[6] = h),
            (g[7] = u))
          : (u = g[7]));
      let w = u;
      g[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, t.jsx)(r.EX, { size: 12 })), (g[8] = d))
        : (d = g[8]);
      let v = _ ? "Update callout" : "Create callout";
      return (
        g[9] !== w || g[10] !== v
          ? ((m = (0, t.jsxs)("button", {
              type: "button",
              onClick: w,
              "data-testid": "trade-callout-toast-action",
              className: a.u,
              children: [d, v],
            })),
            (g[9] = w),
            (g[10] = v),
            (g[11] = m))
          : (m = g[11]),
        m
      );
    },
  ]);
};
