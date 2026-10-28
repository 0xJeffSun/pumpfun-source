// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(778593);
  e.s([
    "f",
    0,
    () => {
      let e,
        r,
        s = (0, t.c)(6),
        { activePreset: a, updateActivePreset: i } = (0, n.f)(),
        o = a.frontRunningProtection;
      s[0] !== o || s[1] !== i
        ? ((e = (e) => {
            i({ frontRunningProtection: "function" == typeof e ? e(o) : e });
          }),
          (s[0] = o),
          (s[1] = i),
          (s[2] = e))
        : (e = s[2]);
      let l = e;
      return (
        s[3] !== o || s[4] !== l
          ? ((r = { frontRunningProtection: o, setFrontRunningProtection: l }),
            (s[3] = o),
            (s[4] = l),
            (s[5] = r))
          : (r = s[5]),
        r
      );
    },
  ]);
};
