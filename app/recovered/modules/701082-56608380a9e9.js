// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(445242);
  t.i(550675);
  var n = t.i(547562);
  t.s([
    "f",
    0,
    () => {
      let t,
        r,
        s = (0, e.c)(5),
        [a, i] = (0, n.l)("trading.priorityLevel");
      s[0] !== i
        ? ((t = (t) => {
            i(t || "Medium");
          }),
          (s[0] = i),
          (s[1] = t))
        : (t = s[1]);
      let o = t;
      return (
        s[2] !== a || s[3] !== o
          ? ((r = { priorityLevel: a, setPriorityLevel: o }),
            (s[2] = a),
            (s[3] = o),
            (s[4] = r))
          : (r = s[4]),
        r
      );
    },
  ]);
};
