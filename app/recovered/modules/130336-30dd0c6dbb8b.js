// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var n = e.i(398902),
    r = e.i(51206),
    s = e.i(813792);
  e.s([
    "f",
    0,
    (e) => {
      let l,
        o,
        c,
        d,
        m,
        u = (0, i.c)(14),
        { label: p, text: f, popoverClassName: x } = e,
        { t: g } = (0, n.f)(),
        h = x ?? "max-w-[14rem]";
      if (
        (u[0] !== p || u[1] !== g
          ? ((l = g("web.coin.info_tip_aria", { label: p })),
            (u[0] = p),
            (u[1] = g),
            (u[2] = l))
          : (l = u[2]),
        u[3] !== p)
      ) {
        let e;
        (u[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = /\s+/g), (u[5] = e))
          : (e = u[5]),
          (o = p.toLowerCase().replace(e, "-")),
          (u[3] = p),
          (u[4] = o));
      } else o = u[4];
      let b = `info-tip-${o}`;
      return (
        u[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = (0, t.jsx)(a.aj, { "aria-hidden": !0 })), (u[6] = c))
          : (c = u[6]),
        u[7] !== l || u[8] !== b
          ? ((d = (0, t.jsx)(r._, {
              density: "terminal",
              size: 20,
              variant: "ghost",
              "aria-label": l,
              "data-testid": b,
              children: c,
            })),
            (u[7] = l),
            (u[8] = b),
            (u[9] = d))
          : (d = u[9]),
        u[10] !== h || u[11] !== d || u[12] !== f
          ? ((m = (0, t.jsx)(s.f, {
              density: "terminal",
              content: f,
              contentClassName: h,
              children: d,
            })),
            (u[10] = h),
            (u[11] = d),
            (u[12] = f),
            (u[13] = m))
          : (m = u[13]),
        m
      );
    },
  ]);
};
