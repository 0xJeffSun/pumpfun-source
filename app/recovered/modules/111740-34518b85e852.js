// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(445242),
    n = t.i(778593);
  t.s([
    "f",
    0,
    () => {
      let t,
        r,
        s = (0, e.c)(6),
        { activePreset: a, updateActivePreset: i } = (0, n.f)(),
        o = a.frontRunningProtection;
      s[0] !== o || s[1] !== i
        ? ((t = (t) => {
            i({ frontRunningProtection: "function" == typeof t ? t(o) : t });
          }),
          (s[0] = o),
          (s[1] = i),
          (s[2] = t))
        : (t = s[2]);
      let c = t;
      return (
        s[3] !== o || s[4] !== c
          ? ((r = { frontRunningProtection: o, setFrontRunningProtection: c }),
            (s[3] = o),
            (s[4] = c),
            (s[5] = r))
          : (r = s[5]),
        r
      );
    },
  ]);
};
