// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(745018),
    l = e.i(426091);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        r,
        s,
        o = (0, n.c)(5),
        { className: c } = e;
      return (
        o[0] !== c
          ? ((a = (0, l.c)(
              "flex size-6 items-center justify-center rounded-full bg-gradient-to-b from-green-300 to-red-500 p-0.5",
              c,
            )),
            (o[0] = c),
            (o[1] = a))
          : (a = o[1]),
        o[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = (0, t.jsx)("div", {
              className:
                "flex size-full items-center justify-center rounded-full bg-bg-secondary",
              children: (0, t.jsx)(i.Sg, {
                className: "text-text-accent",
                size: 12,
              }),
            })),
            (o[2] = r))
          : (r = o[2]),
        o[3] !== a
          ? ((s = (0, t.jsx)("div", { className: a, children: r })),
            (o[3] = a),
            (o[4] = s))
          : (s = o[4]),
        s
      );
    },
  ]);
};
