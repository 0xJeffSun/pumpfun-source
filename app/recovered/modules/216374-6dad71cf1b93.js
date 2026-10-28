// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(426091);
  e.s([
    "s",
    0,
    "!rounded-md !border !border-solid !border-border-tertiary !bg-transparent !text-[13px] !font-medium text-text-primary hover:!bg-bg-tertiary",
    "l",
    0,
    (e) => {
      let n,
        i,
        a,
        s,
        o,
        c = (0, l.c)(10);
      return (
        c[0] !== e
          ? (({ children: n, className: i, ...a } = e),
            (c[0] = e),
            (c[1] = n),
            (c[2] = i),
            (c[3] = a))
          : ((n = c[1]), (i = c[2]), (a = c[3])),
        c[4] !== i
          ? ((s = (0, r.c)(
              "flex min-h-8 w-full items-center justify-center gap-1 px-3 text-center text-xs text-text-tertiary",
              i,
            )),
            (c[4] = i),
            (c[5] = s))
          : (s = c[5]),
        c[6] !== n || c[7] !== a || c[8] !== s
          ? ((o = (0, t.jsx)("p", {
              role: "note",
              className: s,
              ...a,
              children: n,
            })),
            (c[6] = n),
            (c[7] = a),
            (c[8] = s),
            (c[9] = o))
          : (o = c[9]),
        o
      );
    },
  ]);
};
