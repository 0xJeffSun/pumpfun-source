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
        i = (0, t.c)(5),
        { activePreset: l, updateActivePreset: n } = (0, r.f)();
      i[0] !== n
        ? ((e = (e) => {
            n({ tipAmount: Math.max(e ?? 0, 0) });
          }),
          (i[0] = n),
          (i[1] = e))
        : (e = i[1]);
      let o = e;
      return (
        i[2] !== l.tipAmount || i[3] !== o
          ? ((a = { tipAmount: l.tipAmount, setTipAmount: o }),
            (i[2] = l.tipAmount),
            (i[3] = o),
            (i[4] = a))
          : (a = i[4]),
        a
      );
    },
  ]);
};
