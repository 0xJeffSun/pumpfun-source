// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(928529);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        a,
        l,
        s,
        o = (0, r.c)(8);
      o[0] !== e
        ? (({ className: a, size: l, ...i } = e),
          (o[0] = e),
          (o[1] = i),
          (o[2] = a),
          (o[3] = l))
        : ((i = o[1]), (a = o[2]), (l = o[3]));
      let c = void 0 === a ? "" : a,
        u = void 0 === l ? 24 : l;
      return (
        o[4] !== c || o[5] !== i || o[6] !== u
          ? ((s = (0, t.jsx)(n.default, {
              alt: "pump.fun logomark",
              className: c,
              height: u,
              src: "/pump-logomark.svg",
              width: u,
              ...i,
            })),
            (o[4] = c),
            (o[5] = i),
            (o[6] = u),
            (o[7] = s))
          : (s = o[7]),
        s
      );
    },
  ]);
};
