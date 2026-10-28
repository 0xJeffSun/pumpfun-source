// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "f",
    0,
    (e, t) => {
      if (
        null == e ||
        !Number.isFinite(e) ||
        e <= 0 ||
        null == t ||
        !Number.isFinite(t) ||
        t <= 0
      )
        return null;
      let r = e / t;
      return r > 1 ? null : r;
    },
  ]);
};
