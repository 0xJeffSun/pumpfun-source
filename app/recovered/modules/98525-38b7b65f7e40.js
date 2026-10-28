// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(426091);
  let a =
    "M63.85 15.5C69.82 15.5 73.8 22.38 79.03 24.43C84.45 26.55 91.98 23.92 96.08 28.02C100.18 32.12 97.55 39.65 99.67 45.07C101.72 50.3 108.6 54.28 108.6 60.25C108.6 66.22 101.72 70.2 99.67 75.43C97.55 80.85 100.18 88.38 96.08 92.48C91.98 96.58 84.45 93.95 79.03 96.07C73.8 98.12 69.82 105 63.85 105C57.88 105 53.9 98.12 48.67 96.07C43.25 93.95 35.72 96.58 31.62 92.48C27.52 88.38 30.15 80.85 28.03 75.43C25.98 70.2 19.1 66.22 19.1 60.25C19.1 54.28 25.98 50.3 28.03 45.07C30.15 39.65 27.52 32.12 31.62 28.02C35.72 23.92 43.25 26.55 48.67 24.43C53.9 22.38 57.88 15.5 63.85 15.5Z";
  e.s([
    "f",
    0,
    function (e) {
      let i,
        l,
        o,
        s,
        u,
        d = (0, r.c)(11),
        { size: c, className: f } = e,
        m = 179 / (c - 4),
        h = `${19.1 - m} ${15.5 - m} ${89.5 + 2 * m} ${89.5 + 2 * m}`;
      d[0] !== f
        ? ((i = (0, n.c)("shrink-0", f)), (d[0] = f), (d[1] = i))
        : (i = d[1]);
      let p = 2 * m;
      return (
        d[2] !== p
          ? ((l = (0, t.jsx)("path", {
              d: a,
              fill: "none",
              stroke: "#0F0F12",
              strokeWidth: p,
              strokeLinejoin: "round",
            })),
            (d[2] = p),
            (d[3] = l))
          : (l = d[3]),
        d[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((o = (0, t.jsx)("path", { d: a, fill: "#FBBF24" })),
            (s = (0, t.jsx)("path", {
              d: "M52.6 62.2L61.05 70.65L79.95 49.95",
              fill: "none",
              stroke: "#090B18",
              strokeWidth: 10,
              strokeLinecap: "round",
              strokeLinejoin: "round",
            })),
            (d[4] = o),
            (d[5] = s))
          : ((o = d[4]), (s = d[5])),
        d[6] !== c || d[7] !== i || d[8] !== l || d[9] !== h
          ? ((u = (0, t.jsxs)("svg", {
              width: c,
              height: c,
              viewBox: h,
              fill: "none",
              role: "img",
              "aria-label": "Verified account",
              className: i,
              children: [l, o, s],
            })),
            (d[6] = c),
            (d[7] = i),
            (d[8] = l),
            (d[9] = h),
            (d[10] = u))
          : (u = d[10]),
        u
      );
    },
  ]);
};
