// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var i = e.i(398902),
    l = e.i(51206),
    n = e.i(813792);
  e.s([
    "f",
    0,
    (e) => {
      let o,
        s,
        d,
        c,
        u,
        f = (0, r.c)(14),
        { label: m, text: p, popoverClassName: b } = e,
        { t: h } = (0, i.f)(),
        v = b ?? "max-w-[14rem]";
      if (
        (f[0] !== m || f[1] !== h
          ? ((o = h("web.coin.info_tip_aria", { label: m })),
            (f[0] = m),
            (f[1] = h),
            (f[2] = o))
          : (o = f[2]),
        f[3] !== m)
      ) {
        let e;
        (f[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = /\s+/g), (f[5] = e))
          : (e = f[5]),
          (s = m.toLowerCase().replace(e, "-")),
          (f[3] = m),
          (f[4] = s));
      } else s = f[4];
      let x = `info-tip-${s}`;
      return (
        f[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((d = (0, t.jsx)(a.aj, { "aria-hidden": !0 })), (f[6] = d))
          : (d = f[6]),
        f[7] !== o || f[8] !== x
          ? ((c = (0, t.jsx)(l._, {
              density: "terminal",
              size: 20,
              variant: "ghost",
              "aria-label": o,
              "data-testid": x,
              children: d,
            })),
            (f[7] = o),
            (f[8] = x),
            (f[9] = c))
          : (c = f[9]),
        f[10] !== v || f[11] !== c || f[12] !== p
          ? ((u = (0, t.jsx)(n.f, {
              density: "terminal",
              content: p,
              contentClassName: v,
              children: c,
            })),
            (f[10] = v),
            (f[11] = c),
            (f[12] = p),
            (f[13] = u))
          : (u = f[13]),
        u
      );
    },
  ]);
};
