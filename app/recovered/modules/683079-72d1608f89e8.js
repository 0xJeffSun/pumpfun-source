// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e, t) => {
      if (t >= 100) return e;
      let l = Math.max(0, Math.min(100, Math.round(t)));
      return ((BigInt(e) * BigInt(l)) / BigInt(100)).toString();
    },
  ]);
};
