// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "o",
    0,
    (e, t) => {
      if (!(e <= BigInt(0)))
        return Math.round((Number(t - e) / Number(e)) * 1e4);
    },
    "v",
    0,
    (e) => Math.round(performance.now() - e),
    "_",
    0,
    (e, t = performance.now()) =>
      void 0 === e ? void 0 : Math.max(0, Math.round(t - e)),
  ]);
};
