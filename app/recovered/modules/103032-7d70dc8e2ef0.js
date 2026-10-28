// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "--layout-top-offset";
  e.s([
    "E",
    0,
    t,
    "d",
    0,
    (e) => {
      if ("u" < typeof document) return e;
      let r = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(t),
      );
      return Number.isFinite(r) && r >= 0 ? r : e;
    },
  ]);
};
