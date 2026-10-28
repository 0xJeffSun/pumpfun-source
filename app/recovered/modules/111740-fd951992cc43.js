// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(778593);
  e.s([
    "f",
    0,
    () => {
      let e,
        a,
        i = (0, t.c)(6),
        { activePreset: l, updateActivePreset: n } = (0, r.f)(),
        o = l.frontRunningProtection;
      i[0] !== o || i[1] !== n
        ? ((e = (e) => {
            n({ frontRunningProtection: "function" == typeof e ? e(o) : e });
          }),
          (i[0] = o),
          (i[1] = n),
          (i[2] = e))
        : (e = i[2]);
      let s = e;
      return (
        i[3] !== o || i[4] !== s
          ? ((a = { frontRunningProtection: o, setFrontRunningProtection: s }),
            (i[3] = o),
            (i[4] = s),
            (i[5] = a))
          : (a = i[5]),
        a
      );
    },
  ]);
};
