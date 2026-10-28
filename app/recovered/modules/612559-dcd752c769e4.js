// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(745018);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        a,
        l = (0, r.c)(5);
      l[0] !== e
        ? ((i = void 0 === e ? {} : e), (l[0] = e), (l[1] = i))
        : (i = l[1]);
      let { variant: s, className: o } = i;
      if ("nav" === (void 0 === s ? "badge" : s)) {
        let e;
        return (
          l[2] !== o
            ? ((e = (0, t.jsx)(n.Sg, { className: o })), (l[2] = o), (l[3] = e))
            : (e = l[3]),
          e
        );
      }
      return (
        l[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((a = (0, t.jsx)("div", {
              className:
                "size-9 rounded-full bg-gradient-to-b from-green-300 to-red-500 p-0.5 shadow-[0_20px_30px_-6px_rgba(0,0,0,0.10),_0_8px_12px_-4px_rgba(0,0,0,0.05)]",
              children: (0, t.jsx)("div", {
                className:
                  "flex size-full items-center justify-center rounded-full bg-bg-secondary",
                children: (0, t.jsx)(n.Sg, {
                  className: "text-text-accent",
                  size: 14,
                }),
              }),
            })),
            (l[4] = a))
          : (a = l[4]),
        a
      );
    },
  ]);
};
