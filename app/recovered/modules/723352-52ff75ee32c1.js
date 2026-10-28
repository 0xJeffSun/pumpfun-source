// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(908163);
  let i = "comfortable";
  (e.s(["f", 0, i], 761234),
    e.s(
      [
        "f",
        0,
        function (e) {
          let n,
            l,
            s,
            o = (0, r.c)(10),
            { tone: c, active: d, value: m, ariaLabel: u } = e,
            f = void 0 !== d && d;
          if (void 0 === m) return null;
          let h = f ? "true" : void 0,
            p = `explore-lens-count-${c}`,
            x = "live" === c ? "hot" : f ? "mint" : "neutral";
          o[0] !== m
            ? ((n = (0, t.jsx)("span", { "aria-hidden": !0, children: m })),
              (o[0] = m),
              (o[1] = n))
            : (n = o[1]);
          let g = `, ${u}`;
          return (
            o[2] !== g
              ? ((l = (0, t.jsx)("span", {
                  className: "sr-only",
                  children: g,
                })),
                (o[2] = g),
                (o[3] = l))
              : (l = o[3]),
            o[4] !== h || o[5] !== p || o[6] !== x || o[7] !== n || o[8] !== l
              ? ((s = (0, t.jsxs)(a.E, {
                  "data-active": h,
                  "data-testid": p,
                  density: i,
                  tone: x,
                  children: [n, l],
                })),
                (o[4] = h),
                (o[5] = p),
                (o[6] = x),
                (o[7] = n),
                (o[8] = l),
                (o[9] = s))
              : (s = o[9]),
            s
          );
        },
      ],
      723352,
    ));
};
