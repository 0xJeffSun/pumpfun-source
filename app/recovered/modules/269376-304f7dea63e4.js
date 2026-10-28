// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(29797),
    i = e.i(845785),
    n = e.i(855376),
    l = e.i(453706),
    s = e.i(599077),
    o = e.i(352386),
    c = e.i(405048);
  let d = () => e.A(751006).then((e) => e.PersistentPlayer),
    u = (0, l.default)(d, { ssr: !1 });
  function m(e) {
    return null !== e.pipStream;
  }
  function f(e) {
    return null !== e.currentPageMintId;
  }
  e.s([
    "PersistentPlayerWrapper",
    0,
    () => {
      let e,
        l,
        p,
        h,
        b = (0, r.c)(7),
        { push: x } = (0, s.useRouter)(),
        g = (0, a.f)(m),
        y = (0, a.f)(f);
      b[0] !== x
        ? ((e = (e) => {
            x(e);
          }),
          (b[0] = x),
          (b[1] = e))
        : (e = b[1]);
      let v = e;
      return (b[2] !== y
        ? ((l = () => {
            y && d();
          }),
          (p = [y]),
          (b[2] = y),
          (b[3] = l),
          (b[4] = p))
        : ((l = b[3]), (p = b[4])),
      (0, o.useEffect)(l, p),
      g)
        ? (b[5] !== v
            ? ((h = (0, t.jsx)(c.V, {
                property: n.f.PUMP_WEB,
                playerName: i.w.WEB_MINI_PLAYER,
                children: (0, t.jsx)(u, { onNavigate: v }),
              })),
              (b[5] = v),
              (b[6] = h))
            : (h = b[6]),
          h)
        : null;
    },
  ]);
};
