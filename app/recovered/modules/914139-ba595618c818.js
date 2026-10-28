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
        p = (0, n.c)(12),
        { mint: f, existingCalloutPromise: g, screen: _, onActed: b } = e,
        [h, w] = (0, s.useState)(!1);
      (p[0] !== g
        ? ((l = () => {
            if (!g) return;
            let e = !0;
            return (
              g
                .then((t) => {
                  e && t && w(!0);
                })
                .catch(o),
              () => {
                e = !1;
              }
            );
          }),
          (c = [g]),
          (p[0] = g),
          (p[1] = l),
          (p[2] = c))
        : ((l = p[1]), (c = p[2])),
        (0, s.useEffect)(l, c),
        p[3] !== h || p[4] !== f || p[5] !== b || p[6] !== _
          ? ((u = (e) => {
              (e.stopPropagation(),
                h
                  ? (0, i.R)({ mint: f, entryPoint: "trade_success_toast" })
                  : (0, i._)({ mint: f }, _ ? { screen: _ } : void 0),
                b?.());
            }),
            (p[3] = h),
            (p[4] = f),
            (p[5] = b),
            (p[6] = _),
            (p[7] = u))
          : (u = p[7]));
      let y = u;
      p[8] === Symbol.for("react.memo_cache_sentinel")
        ? ((d = (0, t.jsx)(r.EX, { size: 12 })), (p[8] = d))
        : (d = p[8]);
      let j = h ? "Update callout" : "Create callout";
      return (
        p[9] !== y || p[10] !== j
          ? ((m = (0, t.jsxs)("button", {
              type: "button",
              onClick: y,
              "data-testid": "trade-callout-toast-action",
              className: a.u,
              children: [d, j],
            })),
            (p[9] = y),
            (p[10] = j),
            (p[11] = m))
          : (m = p[11]),
        m
      );
    },
  ]);
};
