// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "A",
    0,
    function (e, t) {
      return t ? e + 1 : Math.max(0, e - 1);
    },
    "q",
    0,
    function (e, t) {
      if (t)
        for (let { queryKey: i, previous: r } of t.rollbacks)
          e.setQueryData(i, r);
    },
  ]);
};
