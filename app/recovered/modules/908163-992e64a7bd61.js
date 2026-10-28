// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(338319);
  let n =
      "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-sm px-1.5 font-medium tabular-nums [&>svg]:size-3 [&>svg]:shrink-0",
    a = {
      terminal: "h-[18px] text-[11px] leading-4",
      comfortable: "h-5 text-xs leading-4",
    },
    o = {
      neutral: "bg-bg-tertiary text-text-secondary",
      gain: "bg-bg-tertiary text-gain",
      loss: "bg-bg-tertiary text-loss",
      mint: "bg-bg-accent/[0.12] text-text-accent",
      hot: "bg-hot/[0.14] text-hot",
    };
  e.s([
    "G",
    0,
    n,
    "q",
    0,
    a,
    "c",
    0,
    o,
    "E",
    0,
    function (e) {
      let s,
        l,
        u,
        c,
        d,
        f,
        m,
        h = (0, i.c)(16);
      h[0] !== e
        ? (({ density: u, tone: d, className: l, children: s, ...c } = e),
          (h[0] = e),
          (h[1] = s),
          (h[2] = l),
          (h[3] = u),
          (h[4] = c),
          (h[5] = d))
        : ((s = h[1]), (l = h[2]), (u = h[3]), (c = h[4]), (d = h[5]));
      let p = void 0 === d ? "neutral" : d,
        E = a[u],
        v = o[p];
      return (
        h[6] !== l || h[7] !== E || h[8] !== v
          ? ((f = (0, r.c)(n, E, v, l)),
            (h[6] = l),
            (h[7] = E),
            (h[8] = v),
            (h[9] = f))
          : (f = h[9]),
        h[10] !== s || h[11] !== u || h[12] !== c || h[13] !== f || h[14] !== p
          ? ((m = (0, t.jsx)("span", {
              "data-density": u,
              "data-tone": p,
              className: f,
              ...c,
              children: s,
            })),
            (h[10] = s),
            (h[11] = u),
            (h[12] = c),
            (h[13] = f),
            (h[14] = p),
            (h[15] = m))
          : (m = h[15]),
        m
      );
    },
  ]);
};
