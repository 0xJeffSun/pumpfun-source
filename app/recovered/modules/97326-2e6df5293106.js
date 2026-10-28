// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(778593);
  e.s([
    "f",
    0,
    () => {
      let e,
        i,
        a = (0, t.c)(5),
        { activePreset: r, updateActivePreset: s } = (0, n.f)();
      a[0] !== s
        ? ((e = (e) => {
            s({ slippage: e ?? 0 });
          }),
          (a[0] = s),
          (a[1] = e))
        : (e = a[1]);
      let l = e;
      return (
        a[2] !== r.slippage || a[3] !== l
          ? ((i = { slippage: r.slippage, setSlippage: l }),
            (a[2] = r.slippage),
            (a[3] = l),
            (a[4] = i))
          : (i = a[4]),
        i
      );
    },
  ]);
};
