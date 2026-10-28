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
        s = (0, t.c)(5),
        { activePreset: a, updateActivePreset: i } = (0, n.f)();
      s[0] !== i
        ? ((e = (e) => {
            i({ tipAmount: Math.max(e ?? 0, 0) });
          }),
          (s[0] = i),
          (s[1] = e))
        : (e = s[1]);
      let o = e;
      return (
        s[2] !== a.tipAmount || s[3] !== o
          ? ((r = { tipAmount: a.tipAmount, setTipAmount: o }),
            (s[2] = a.tipAmount),
            (s[3] = o),
            (s[4] = r))
          : (r = s[4]),
        r
      );
    },
  ]);
};
