// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(778593);
  (e.i(53479).A,
    e.s([
      "f",
      0,
      () => {
        let e,
          r,
          i = (0, t.c)(5),
          { activePreset: a, updateActivePreset: s } = (0, n.f)();
        i[0] !== s
          ? ((e = (e) => {
              s({ priorityFee: Math.max(e ?? 0, 0) });
            }),
            (i[0] = s),
            (i[1] = e))
          : (e = i[1]);
        let l = e;
        return (
          i[2] !== a.priorityFee || i[3] !== l
            ? ((r = { priorityFee: a.priorityFee, setPriorityFee: l }),
              (i[2] = a.priorityFee),
              (i[3] = l),
              (i[4] = r))
            : (r = i[4]),
          r
        );
      },
    ]));
};
