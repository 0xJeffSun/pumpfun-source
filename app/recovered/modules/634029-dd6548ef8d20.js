// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = null;
  e.s([
    "C",
    0,
    (e) => {
      t = e;
    },
    "U",
    0,
    (e) => (null !== t && t.nftAddress !== e && (t = null), t),
  ]);
};
