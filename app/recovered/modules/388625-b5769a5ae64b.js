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
        r = (0, t.c)(5),
        { activePreset: l, updateActivePreset: a } = (0, n.f)();
      r[0] !== a
        ? ((e = (e) => {
            a({ holdToConfirm: e });
          }),
          (r[0] = a),
          (r[1] = e))
        : (e = r[1]);
      let s = e;
      return (
        r[2] !== l.holdToConfirm || r[3] !== s
          ? ((i = { holdToConfirm: l.holdToConfirm, setHoldToConfirm: s }),
            (r[2] = l.holdToConfirm),
            (r[3] = s),
            (r[4] = i))
          : (i = r[4]),
        i
      );
    },
  ]);
};
