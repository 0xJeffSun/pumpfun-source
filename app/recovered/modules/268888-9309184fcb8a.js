// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(778593);
  (e.i(53479).A,
    e.s([
      "f",
      0,
      () => {
        let e,
          a,
          n = (0, t.c)(5),
          { activePreset: r, updateActivePreset: s } = (0, i.f)();
        n[0] !== s
          ? ((e = (e) => {
              s({ priorityFee: Math.max(e ?? 0, 0) });
            }),
            (n[0] = s),
            (n[1] = e))
          : (e = n[1]);
        let l = e;
        return (
          n[2] !== r.priorityFee || n[3] !== l
            ? ((a = { priorityFee: r.priorityFee, setPriorityFee: l }),
              (n[2] = r.priorityFee),
              (n[3] = l),
              (n[4] = a))
            : (a = n[4]),
          a
        );
      },
    ]));
};
