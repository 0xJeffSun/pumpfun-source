// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s([
    "f",
    0,
    (t, e, i = 10) => {
      let s = "",
        r = Math.max(Math.round(e / i), 2);
      for (let e = 0; e < r; e++)
        s += Math.round(1e4 * t(e / (r - 1))) / 1e4 + ", ";
      return `linear(${s.substring(0, s.length - 2)})`;
    },
  ]);
};
