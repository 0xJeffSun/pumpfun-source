// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    n = e.i(453706),
    i = e.i(352386);
  let o = (0, n.default)(
      () => e.A(911849).then((e) => ({ default: e.CreateBountyDialog })),
      { loadableGenerated: { modules: [271395] }, ssr: !1 },
    ),
    a = (0, i.createContext)(null);
  function s(e) {
    return e + 1;
  }
  function l(e) {
    return e + 1;
  }
  e.s([
    "BountyCreateDialogProvider",
    0,
    function (e) {
      let n,
        c,
        u,
        d,
        h,
        f,
        p = (0, r.c)(13),
        { children: E } = e,
        [y, m] = (0, i.useState)(!1),
        [C, g] = (0, i.useState)(null),
        [b, P] = (0, i.useState)(0);
      p[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = () => {
            (g(null), P(l), m(!0));
          }),
          (p[0] = n))
        : (n = p[0]);
      let v = n;
      p[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = (e) => {
            (g(e), P(s), m(!0));
          }),
          (p[1] = c))
        : (c = p[1]);
      let A = c;
      p[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = () => {
            m(!1);
          }),
          (p[2] = u))
        : (u = p[2]);
      let I = u;
      p[3] !== y
        ? ((d = { open: v, openWithDraft: A, close: I, isOpen: y }),
          (p[3] = y),
          (p[4] = d))
        : (d = p[4]);
      let L = d;
      return (
        p[5] !== y || p[6] !== b || p[7] !== C
          ? ((h =
              b > 0
                ? (0, t.jsx)(
                    o,
                    {
                      onOpenChange: (e) => {
                        (m(e), e || g(null));
                      },
                      open: y,
                      taskId: C,
                    },
                    b,
                  )
                : null),
            (p[5] = y),
            (p[6] = b),
            (p[7] = C),
            (p[8] = h))
          : (h = p[8]),
        p[9] !== E || p[10] !== h || p[11] !== L
          ? ((f = (0, t.jsxs)(a.Provider, { value: L, children: [E, h] })),
            (p[9] = E),
            (p[10] = h),
            (p[11] = L),
            (p[12] = f))
          : (f = p[12]),
        f
      );
    },
    "useBountyCreateDialog",
    0,
    function () {
      let e = (0, i.useContext)(a);
      if (!e)
        throw Error(
          "useBountyCreateDialog must be used within a BountyCreateDialogProvider",
        );
      return e;
    },
  ]);
};
