// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(778593);
  e.s([
    "f",
    0,
    () => {
      let e,
        a,
        n = (0, t.c)(6),
        { activePreset: r, updateActivePreset: s } = (0, i.f)(),
        l = r.frontRunningProtection;
      n[0] !== l || n[1] !== s
        ? ((e = (e) => {
            s({ frontRunningProtection: "function" == typeof e ? e(l) : e });
          }),
          (n[0] = l),
          (n[1] = s),
          (n[2] = e))
        : (e = n[2]);
      let o = e;
      return (
        n[3] !== l || n[4] !== o
          ? ((a = { frontRunningProtection: l, setFrontRunningProtection: o }),
            (n[3] = l),
            (n[4] = o),
            (n[5] = a))
          : (a = n[5]),
        a
      );
    },
  ]);
};
