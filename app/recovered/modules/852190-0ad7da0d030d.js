// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(254010),
    r = e.i(352386);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        l,
        a = (0, t.c)(4),
        s = (0, n.V)(e),
        [o, c] = (0, r.useState)(!1);
      return (
        a[0] !== o || a[1] !== s
          ? ((i = () => {
              if (s || o) return;
              let e = setTimeout(() => c(!0), 3e3);
              return () => clearTimeout(e);
            }),
            (l = [s, o]),
            (a[0] = o),
            (a[1] = s),
            (a[2] = i),
            (a[3] = l))
          : ((i = a[2]), (l = a[3])),
        (0, r.useEffect)(i, l),
        s || o
      );
    },
  ]);
};
