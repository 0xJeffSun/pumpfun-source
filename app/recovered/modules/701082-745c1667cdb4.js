// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(550675);
  var r = e.i(547562);
  e.s([
    "f",
    0,
    () => {
      let e,
        n,
        a = (0, t.c)(5),
        [i, o] = (0, r.l)("trading.priorityLevel");
      a[0] !== o
        ? ((e = (e) => {
            o(e || "Medium");
          }),
          (a[0] = o),
          (a[1] = e))
        : (e = a[1]);
      let l = e;
      return (
        a[2] !== i || a[3] !== l
          ? ((n = { priorityLevel: i, setPriorityLevel: l }),
            (a[2] = i),
            (a[3] = l),
            (a[4] = n))
          : (n = a[4]),
        n
      );
    },
  ]);
};
