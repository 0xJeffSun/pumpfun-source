// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(829451),
    i = t.i(59778),
    s = t.i(854022),
    r = t.i(813968);
  let n = new Set(["x", "y", "z"]),
    a = i.$.filter((t) => !n.has(t)),
    o = {
      width: (
        { x: t },
        { paddingLeft: e = "0", paddingRight: i = "0", boxSizing: s },
      ) => {
        let r = t.max - t.min;
        return "border-box" === s ? r : r - parseFloat(e) - parseFloat(i);
      },
      height: (
        { y: t },
        { paddingTop: e = "0", paddingBottom: i = "0", boxSizing: s },
      ) => {
        let r = t.max - t.min;
        return "border-box" === s ? r : r - parseFloat(e) - parseFloat(i);
      },
      top: (t, { top: e }) => parseFloat(e),
      left: (t, { left: e }) => parseFloat(e),
      bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
      right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
      x: (t, { transform: i }) => (0, e.g)(i, "x"),
      y: (t, { transform: i }) => (0, e.g)(i, "y"),
    };
  ((o.translateX = o.x),
    (o.translateY = o.y),
    t.s([
      "D",
      0,
      (t) => t === s.H || t === r.L,
      "k",
      0,
      o,
      "l",
      0,
      function (t) {
        let e = [];
        return (
          a.forEach((i) => {
            let s = t.getValue(i);
            void 0 !== s &&
              (e.push([i, s.get()]), s.set(+!!i.startsWith("scale")));
          }),
          e
        );
      },
    ]));
};
