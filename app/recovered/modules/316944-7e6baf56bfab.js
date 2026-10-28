// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.s([
    "f",
    0,
    (e) => {
      let n,
        i,
        s,
        a = (0, r.c)(4),
        { className: o } = e;
      return (
        a[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = (0, t.jsx)("circle", { cx: "11", cy: "11", r: "7" })),
            (i = (0, t.jsx)("path", { d: "M21 21l-4.3-4.3" })),
            (a[0] = n),
            (a[1] = i))
          : ((n = a[0]), (i = a[1])),
        a[2] !== o
          ? ((s = (0, t.jsxs)("svg", {
              "aria-hidden": "true",
              className: o,
              fill: "none",
              height: "16",
              stroke: "currentColor",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 1.6,
              viewBox: "0 0 24 24",
              width: "16",
              children: [n, i],
            })),
            (a[2] = o),
            (a[3] = s))
          : (s = a[3]),
        s
      );
    },
  ]);
};
