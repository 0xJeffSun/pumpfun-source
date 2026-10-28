// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let r = new Set(["https:", "mailto:"]);
  e.s([
    "t",
    0,
    function (e) {
      if (!e) return null;
      try {
        if (r.has(new URL(e).protocol)) return e;
      } catch {}
      return null;
    },
  ]);
};
