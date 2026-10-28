// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(453706),
    i = e.i(352386);
  let a = (0, n.default)(
      () => e.A(897887).then((e) => ({ default: e.DeveloperPortalDialog })),
      { loadableGenerated: { modules: [507194] }, ssr: !1 },
    ),
    l = (0, i.createContext)(null);
  function s(e) {
    return e + 1;
  }
  e.s([
    "DeveloperPortalProvider",
    0,
    function (e) {
      let n,
        o,
        c,
        u,
        d,
        f = (0, r.c)(11),
        { children: m } = e,
        [p, h] = (0, i.useState)(!1),
        [g, x] = (0, i.useState)(0);
      f[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = () => {
            (x(s), h(!0));
          }),
          (f[0] = n))
        : (n = f[0]);
      let v = n;
      f[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = () => h(!1)), (f[1] = o))
        : (o = f[1]);
      let y = o;
      f[2] !== p
        ? ((c = { open: v, close: y, isOpen: p }), (f[2] = p), (f[3] = c))
        : (c = f[3]);
      let b = c;
      return (
        f[4] !== p || f[5] !== g
          ? ((u =
              g > 0 ? (0, t.jsx)(a, { open: p, onOpenChange: h }, g) : null),
            (f[4] = p),
            (f[5] = g),
            (f[6] = u))
          : (u = f[6]),
        f[7] !== m || f[8] !== u || f[9] !== b
          ? ((d = (0, t.jsxs)(l.Provider, { value: b, children: [m, u] })),
            (f[7] = m),
            (f[8] = u),
            (f[9] = b),
            (f[10] = d))
          : (d = f[10]),
        d
      );
    },
    "useDeveloperPortal",
    0,
    function () {
      let e = (0, i.useContext)(l);
      if (!e)
        throw Error(
          "useDeveloperPortal must be used within a DeveloperPortalProvider",
        );
      return e;
    },
  ]);
};
