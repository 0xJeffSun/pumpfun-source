// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(228935);
  e.s([
    "f",
    0,
    (e, n = 6) => {
      if (!e) return 0;
      if ("number" == typeof e) return e / 10 ** n;
      try {
        return (0, t.f)(BigInt(e.toString()), n);
      } catch {
        return 0;
      }
    },
  ]);
};
