// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(928529),
    n = e.i(116549),
    a = e.i(813792),
    o = e.i(541710),
    l = e.i(464649);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        d,
        c,
        u = (0, r.c)(15),
        { chainId: m, size: h, includeSolana: p, className: f } = e,
        b = void 0 === h ? 14 : h,
        g = void 0 !== p && p,
        x = (0, n.x)(),
        v = (0, o.l)(),
        y = !0 === v.ton,
        w = !0 === v.starknet,
        _ = !0 === v.near;
      u[0] !== m || u[1] !== _ || u[2] !== g || u[3] !== w || u[4] !== y
        ? ((s = (0, l.z)(m, {
            includeSolana: g,
            includeTon: y,
            includeStarknet: w,
            includeNear: _,
          })),
          (u[0] = m),
          (u[1] = _),
          (u[2] = g),
          (u[3] = w),
          (u[4] = y),
          (u[5] = s))
        : (s = u[5]);
      let k = s;
      if (!k) return null;
      let j = `${k.name} chain logo`;
      return (
        u[6] !== f || u[7] !== k.src || u[8] !== b || u[9] !== j
          ? ((d = (0, t.jsx)(i.default, {
              src: k.src,
              alt: j,
              width: b,
              height: b,
              className: f,
            })),
            (u[6] = f),
            (u[7] = k.src),
            (u[8] = b),
            (u[9] = j),
            (u[10] = d))
          : (d = u[10]),
        u[11] !== x || u[12] !== k.name || u[13] !== d
          ? ((c = (0, t.jsx)(a.f, {
              content: k.name,
              density: x,
              children: d,
            })),
            (u[11] = x),
            (u[12] = k.name),
            (u[13] = d),
            (u[14] = c))
          : (c = u[14]),
        c
      );
    },
  ]);
};
