// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = (t) => ({
      test: (e) =>
        "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length,
      parse: parseFloat,
      transform: (e) => `${e}${t}`,
    }),
    i = e("deg"),
    s = e("%"),
    r = e("px"),
    n = e("vh"),
    a = e("vw"),
    o = {
      ...s,
      parse: (t) => s.parse(t) / 100,
      transform: (t) => s.transform(100 * t),
    };
  t.s(["b", 0, i, "U", 0, s, "v", 0, o, "L", 0, r, "a", 0, n, "$", 0, a]);
};
