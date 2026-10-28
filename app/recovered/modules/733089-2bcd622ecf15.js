// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = [
    "you",
    "dev",
    "sniper",
    "bundler",
    "fresh",
    "tracked",
    "following",
    "verified",
    "lp",
    "pump_user",
    "outside_top",
  ];
  e.s([
    "O",
    0,
    (e) => [...new Set(e)].sort((e, r) => t.indexOf(e) - t.indexOf(r)),
    "P",
    0,
    (e) => (e.startsWith("0x") || e.startsWith("0X") ? e.toLowerCase() : e),
  ]);
};
