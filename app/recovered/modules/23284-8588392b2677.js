// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(845785),
    n = e.i(305088);
  e.s([
    "f",
    0,
    (e) => {
      let o,
        l,
        a,
        s,
        c = (0, r.c)(8);
      c[0] !== e
        ? (({ streamType: l, videoType: a, ...o } = e),
          (c[0] = e),
          (c[1] = o),
          (c[2] = l),
          (c[3] = a))
        : ((o = c[1]), (l = c[2]), (a = c[3]));
      let u = void 0 === l ? i.s.LIVE : l,
        d = void 0 === a ? i.$.Livestream : a;
      return (
        c[4] !== o || c[5] !== u || c[6] !== d
          ? ((s = (0, t.jsx)(n.f, { streamType: u, videoType: d, ...o })),
            (c[4] = o),
            (c[5] = u),
            (c[6] = d),
            (c[7] = s))
          : (s = c[7]),
        s
      );
    },
  ]);
};
