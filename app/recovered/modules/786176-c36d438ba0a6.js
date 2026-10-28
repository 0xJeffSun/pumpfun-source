// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e) => {
      if (!/^\d+$/.test(e)) return null;
      let t = Number(e) / 1e9;
      return Number.isFinite(t)
        ? (t >= 1 ? t.toFixed(2) : t.toFixed(4)).replace(/\.?0+$/, "")
        : null;
    },
  ]);
};
