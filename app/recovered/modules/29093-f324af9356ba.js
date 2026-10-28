// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(259948),
    i = e.i(426091);
  let s = e.i(352386).forwardRef((e, s) => {
    let a,
      o,
      l,
      u,
      d,
      c,
      f = (0, r.c)(11);
    return (
      f[0] !== e
        ? (({ className: a, ...o } = e), (f[0] = e), (f[1] = a), (f[2] = o))
        : ((a = f[1]), (o = f[2])),
      f[3] !== a
        ? ((l = (0, i.c)(
            "relative flex w-full touch-none select-none items-center",
            a,
          )),
          (f[3] = a),
          (f[4] = l))
        : (l = f[4]),
      f[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = (0, t.jsx)(n.m, {
            className:
              "relative h-1.5 w-full grow overflow-hidden rounded-full bg-bg-secondary/20",
            children: (0, t.jsx)(n.h, {
              className: "absolute h-full bg-text-accent",
            }),
          })),
          (d = (0, t.jsx)(n.w, {
            className:
              "block h-4 w-4 rounded-full border border-text-accent/50 bg-bg-secondary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
          })),
          (f[5] = u),
          (f[6] = d))
        : ((u = f[5]), (d = f[6])),
      f[7] !== o || f[8] !== s || f[9] !== l
        ? ((c = (0, t.jsxs)(n.F, {
            ref: s,
            className: l,
            ...o,
            children: [u, d],
          })),
          (f[7] = o),
          (f[8] = s),
          (f[9] = l),
          (f[10] = c))
        : (c = f[10]),
      c
    );
  });
  ((s.displayName = n.F.displayName), e.s(["f", 0, s]));
};
