// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => "number" == typeof e && Number.isFinite(e);
  e.s([
    "H",
    0,
    (e) => (t(e) ? e : null),
    "I",
    0,
    t,
    "C",
    0,
    (e) => (t(e) && e > 0 ? e : null),
  ]);
};
