// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(4327),
    i = e.i(103547);
  e.s([
    "SidebarController",
    0,
    function (e) {
      let n,
        l,
        s = (0, r.c)(4),
        { children: o, defaultOpen: c } = e;
      return (
        s[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = { [a.p]: "" }), (s[0] = n))
          : (n = s[0]),
        s[1] !== o || s[2] !== c
          ? ((l = (0, t.jsx)(i.SidebarProvider, {
              defaultOpen: c,
              ...n,
              children: o,
            })),
            (s[1] = o),
            (s[2] = c),
            (s[3] = l))
          : (l = s[3]),
        l
      );
    },
  ]);
};
