// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(732486),
    n = t.i(445242),
    r = t.i(745018),
    s = t.i(352386),
    a = t.i(506486),
    i = t.i(237687);
  function o() {}
  t.s([
    "f",
    0,
    function (t) {
      let c,
        l,
        u,
        d,
        m,
        f = (0, n.c)(12),
        { mint: h, existingCalloutPromise: g, screen: b, onActed: p } = t,
        [w, y] = (0, s.useState)(!1);
      (f[0] !== g
        ? ((c = () => {
            if (!g) return;
            let t = !0;
            return (
              g
                .then((e) => {
                  t && e && y(!0);
                })
                .catch(o),
              () => {
                t = !1;
              }
            );
          }),
          (l = [g]),
          (f[0] = g),
          (f[1] = c),
          (f[2] = l))
        : ((c = f[1]), (l = f[2])),
        (0, s.useEffect)(c, l),
        f[3] !== w || f[4] !== h || f[5] !== p || f[6] !== b
          ? ((u = (t) => {
              (t.stopPropagation(),
                w
                  ? (0, i.R)({ mint: h, entryPoint: "trade_success_toast" })
                  : (0, i._)({ mint: h }, b ? { screen: b } : void 0),
                p?.());
            }),
            (f[3] = w),
            (f[4] = h),
            (f[5] = p),
            (f[6] = b),
            (f[7] = u))
          : (u = f[7]));
      let _ = u;
      f[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, e.jsx)(r.EX, { size: 12 })), (f[8] = d))
        : (d = f[8]);
      let x = w ? "Update callout" : "Create callout";
      return (
        f[9] !== _ || f[10] !== x
          ? ((m = (0, e.jsxs)("button", {
              type: "button",
              onClick: _,
              "data-testid": "trade-callout-toast-action",
              className: a.u,
              children: [d, x],
            })),
            (f[9] = _),
            (f[10] = x),
            (f[11] = m))
          : (m = f[11]),
        m
      );
    },
  ]);
};
