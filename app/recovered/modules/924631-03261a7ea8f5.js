// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => e?.replace(/^\$/, "").trim() ?? "";
  e.s([
    "D",
    0,
    (e) => e.name?.trim() || t(e.symbol) || e.mint,
    "G",
    0,
    (e) => (t(e.symbol) || e.name?.trim() || e.mint).slice(0, 2),
    "W",
    0,
    t,
    "e",
    0,
    (e) => (e.length <= 12 ? e : `${e.slice(0, 8)}…${e.slice(-4)}`),
  ]);
};
