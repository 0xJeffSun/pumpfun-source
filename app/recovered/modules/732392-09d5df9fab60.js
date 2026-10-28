// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(352386),
    i = e.i(125214),
    o = n.forwardRef((e, r) =>
      (0, t.jsx)(i.f.label, {
        ...e,
        ref: r,
        onMouseDown: (t) => {
          t.target.closest("button, input, select, textarea") ||
            (e.onMouseDown?.(t),
            !t.defaultPrevented && t.detail > 1 && t.preventDefault());
        },
      }),
    );
  o.displayName = "Label";
  var s = e.i(426091);
  let a = (0, e.i(294237).f)(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    ),
    l = n.forwardRef((e, n) => {
      let i,
        l,
        u,
        c,
        d = (0, r.c)(9);
      return (
        d[0] !== e
          ? (({ className: i, ...l } = e), (d[0] = e), (d[1] = i), (d[2] = l))
          : ((i = d[1]), (l = d[2])),
        d[3] !== i
          ? ((u = (0, s.c)(a(), i)), (d[3] = i), (d[4] = u))
          : (u = d[4]),
        d[5] !== l || d[6] !== n || d[7] !== u
          ? ((c = (0, t.jsx)(o, { ref: n, className: u, ...l })),
            (d[5] = l),
            (d[6] = n),
            (d[7] = u),
            (d[8] = c))
          : (c = d[8]),
        c
      );
    });
  ((l.displayName = o.displayName), e.s(["f", 0, l], 732392));
};
