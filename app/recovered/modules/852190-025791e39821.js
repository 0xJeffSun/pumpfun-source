// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(254010),
    a = e.i(352386);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        s,
        i = (0, t.c)(4),
        n = (0, r.V)(e),
        [o, d] = (0, a.useState)(!1);
      return (
        i[0] !== o || i[1] !== n
          ? ((l = () => {
              if (n || o) return;
              let e = setTimeout(() => d(!0), 3e3);
              return () => clearTimeout(e);
            }),
            (s = [n, o]),
            (i[0] = o),
            (i[1] = n),
            (i[2] = l),
            (i[3] = s))
          : ((l = i[2]), (s = i[3])),
        (0, a.useEffect)(l, s),
        n || o
      );
    },
  ]);
};
