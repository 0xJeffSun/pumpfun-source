// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s([
    "f",
    0,
    (t) =>
      null == t || 0 === t.length || t.length <= 256 ? t : t.slice(0, 256),
  ]);
};
