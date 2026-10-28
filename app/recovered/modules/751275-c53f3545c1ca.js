// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386);
  let o = "legacy";
  e.s(["f", 0, o], 741430);
  let i = (0, a.createContext)(o);
  e.s(
    [
      "j",
      0,
      function (e) {
        let a,
          o = (0, r.c)(3),
          { value: n, children: s } = e;
        return (
          o[0] !== s || o[1] !== n
            ? ((a = (0, t.jsx)(i.Provider, { value: n, children: s })),
              (o[0] = s),
              (o[1] = n),
              (o[2] = a))
            : (a = o[2]),
          a
        );
      },
      "y",
      0,
      () => (0, a.use)(i),
    ],
    751275,
  );
};
