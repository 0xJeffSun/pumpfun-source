// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "reveal";
  e.s([
    "U",
    0,
    t,
    "B",
    0,
    (e, { reveal: n = !1 } = {}) =>
      `/achievements/${encodeURIComponent(e)}${n ? `?${t}=1` : ""}`,
  ]);
};
