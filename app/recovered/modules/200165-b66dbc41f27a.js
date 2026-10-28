// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(426091);
  let i = e.i(352386).forwardRef((e, i) => {
    let a,
      l,
      s,
      o,
      c,
      u = (0, r.c)(11);
    return (
      u[0] !== e
        ? (({ className: a, type: s, ...l } = e),
          (u[0] = e),
          (u[1] = a),
          (u[2] = l),
          (u[3] = s))
        : ((a = u[1]), (l = u[2]), (s = u[3])),
      u[4] !== a
        ? ((o = (0, n.c)(
            "flex h-10 w-full rounded-md border border-border-secondary bg-bg-secondary px-3 py-2 text-sm ring-offset-bg-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            a,
          )),
          (u[4] = a),
          (u[5] = o))
        : (o = u[5]),
      u[6] !== l || u[7] !== i || u[8] !== o || u[9] !== s
        ? ((c = (0, t.jsx)("input", { type: s, className: o, ref: i, ...l })),
          (u[6] = l),
          (u[7] = i),
          (u[8] = o),
          (u[9] = s),
          (u[10] = c))
        : (c = u[10]),
      c
    );
  });
  ((i.displayName = "Input"), e.s(["f", 0, i]));
};
