// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "limit-order-line-click";
  e.s([
    "X",
    0,
    t,
    "s",
    0,
    (e) => {
      window.dispatchEvent(new CustomEvent(t, { detail: e }));
    },
  ]);
};
