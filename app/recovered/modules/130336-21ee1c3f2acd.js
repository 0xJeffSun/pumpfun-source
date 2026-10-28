// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018);
  e.i(12692);
  var l = e.i(398902),
    i = e.i(51206),
    a = e.i(813792);
  e.s([
    "f",
    0,
    (e) => {
      let s,
        o,
        u,
        d,
        c,
        m = (0, r.c)(14),
        { label: f, text: p, popoverClassName: h } = e,
        { t: b } = (0, l.f)(),
        g = h ?? "max-w-[14rem]";
      if (
        (m[0] !== f || m[1] !== b
          ? ((s = b("web.coin.info_tip_aria", { label: f })),
            (m[0] = f),
            (m[1] = b),
            (m[2] = s))
          : (s = m[2]),
        m[3] !== f)
      ) {
        let e;
        (m[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = /\s+/g), (m[5] = e))
          : (e = m[5]),
          (o = f.toLowerCase().replace(e, "-")),
          (m[3] = f),
          (m[4] = o));
      } else o = m[4];
      let x = `info-tip-${o}`;
      return (
        m[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = (0, t.jsx)(n.aj, { "aria-hidden": !0 })), (m[6] = u))
          : (u = m[6]),
        m[7] !== s || m[8] !== x
          ? ((d = (0, t.jsx)(i._, {
              density: "terminal",
              size: 20,
              variant: "ghost",
              "aria-label": s,
              "data-testid": x,
              children: u,
            })),
            (m[7] = s),
            (m[8] = x),
            (m[9] = d))
          : (d = m[9]),
        m[10] !== g || m[11] !== d || m[12] !== p
          ? ((c = (0, t.jsx)(a.f, {
              density: "terminal",
              content: p,
              contentClassName: g,
              children: d,
            })),
            (m[10] = g),
            (m[11] = d),
            (m[12] = p),
            (m[13] = c))
          : (c = m[13]),
        c
      );
    },
  ]);
};
