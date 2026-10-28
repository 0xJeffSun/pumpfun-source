// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(670169),
    o = e.i(426091),
    i = e.i(352386),
    a = e.i(360827);
  let s = n.F,
    l = n.d,
    d = i.forwardRef((e, i) => {
      let s,
        l,
        d,
        u,
        c,
        f,
        p = (0, r.c)(13);
      p[0] !== e
        ? (({ className: s, align: d, sideOffset: u, ...l } = e),
          (p[0] = e),
          (p[1] = s),
          (p[2] = l),
          (p[3] = d),
          (p[4] = u))
        : ((s = p[1]), (l = p[2]), (d = p[3]), (u = p[4]));
      let m = void 0 === d ? "center" : d,
        v = void 0 === u ? 4 : u;
      return (
        p[5] !== s
          ? ((c = (0, o.c)(
              "pointer-events-auto z-[1000] w-72 p-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              a.V,
              s,
            )),
            (p[5] = s),
            (p[6] = c))
          : (c = p[6]),
        p[7] !== m || p[8] !== l || p[9] !== i || p[10] !== v || p[11] !== c
          ? ((f = (0, t.jsx)(n.z, {
              children: (0, t.jsx)(n.c, {
                ref: i,
                align: m,
                sideOffset: v,
                className: c,
                ...l,
              }),
            })),
            (p[7] = m),
            (p[8] = l),
            (p[9] = i),
            (p[10] = v),
            (p[11] = c),
            (p[12] = f))
          : (f = p[12]),
        f
      );
    });
  ((d.displayName = n.c.displayName), e.s(["V", 0, s, "T", 0, d, "J", 0, l]));
};
