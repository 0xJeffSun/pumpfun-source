// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  let e = new Set(["https:", "mailto:"]);
  r.s([
    "t",
    0,
    function (r) {
      if (!r) return null;
      try {
        if (e.has(new URL(r).protocol)) return r;
      } catch {}
      return null;
    },
  ]);
};
