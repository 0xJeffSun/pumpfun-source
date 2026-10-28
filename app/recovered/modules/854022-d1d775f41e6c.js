// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(853624);
  let i = {
      test: (t) => "number" == typeof t,
      parse: parseFloat,
      transform: (t) => t,
    },
    s = { ...i, transform: (t) => (0, e.f)(0, 1, t) },
    r = { ...i, default: 1 };
  t.s(["_", 0, s, "H", 0, i, "Z", 0, r]);
};
