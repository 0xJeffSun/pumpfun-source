// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) => {
    let t = Number.parseInt(e, 10);
    return Number.isNaN(t) ? null : t;
  };
  e.s([
    "H",
    0,
    1,
    "n",
    0,
    ({ page: e, pageSize: t }) => (Math.max(1, e) - 1) * t,
    "S",
    0,
    (e) => (void 0 === e ? 1 : (t(e) ?? 1)),
    "B",
    0,
    t,
    "O",
    0,
    (e) => Math.round(e).toFixed(),
  ]);
};
