// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242);
  e.i(550675);
  var i = e.i(547562);
  e.s([
    "f",
    0,
    () => {
      let e,
        r,
        a = (0, t.c)(5),
        [n, s] = (0, i.l)("trading.priorityLevel");
      a[0] !== s
        ? ((e = (e) => {
            s(e || "Medium");
          }),
          (a[0] = s),
          (a[1] = e))
        : (e = a[1]);
      let l = e;
      return (
        a[2] !== n || a[3] !== l
          ? ((r = { priorityLevel: n, setPriorityLevel: l }),
            (a[2] = n),
            (a[3] = l),
            (a[4] = r))
          : (r = a[4]),
        r
      );
    },
  ]);
};
