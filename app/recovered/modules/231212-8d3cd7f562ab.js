// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(453706),
    i = e.i(599077),
    n = e.i(613768);
  let l = (0, a.default)(() => e.A(413700).then((e) => e.GlobalDockHostBody), {
    loadableGenerated: { modules: [138833] },
    ssr: !1,
  });
  e.s([
    "GlobalDockHost",
    0,
    function (e) {
      let a,
        s = (0, r.c)(2),
        { side: o } = e,
        c = void 0 === o ? "right" : o,
        d = (0, i.usePathname)();
      return (0, n.f)(d)
        ? null
        : (s[0] !== c
            ? ((a = (0, t.jsx)(l, { side: c })), (s[0] = c), (s[1] = a))
            : (a = s[1]),
          a);
    },
  ]);
};
