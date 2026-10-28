// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242);
  e.i(12692);
  var n = e.i(398902),
    i = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let a,
        l,
        s,
        o = (0, r.c)(8),
        { className: c, size: u } = e,
        d = void 0 === u ? "md" : u,
        { t: f } = (0, n.f)();
      return (
        o[0] !== c || o[1] !== d
          ? ((a = (0, i.c)(
              "inline-flex items-center justify-center rounded-sm bg-bg-accent font-bold text-black",
              {
                sm: "px-1.5 py-0.5 text-[10px]",
                md: "px-[6px] py-0.5 text-xs",
              }[d],
              c,
            )),
            (o[0] = c),
            (o[1] = d),
            (o[2] = a))
          : (a = o[2]),
        o[3] !== f
          ? ((l = f("livestream.controls.live")), (o[3] = f), (o[4] = l))
          : (l = o[4]),
        o[5] !== a || o[6] !== l
          ? ((s = (0, t.jsx)("span", {
              className: a,
              "data-testid": "live-badge",
              children: l,
            })),
            (o[5] = a),
            (o[6] = l),
            (o[7] = s))
          : (s = o[7]),
        s
      );
    },
  ]);
};
