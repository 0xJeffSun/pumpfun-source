// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(183249);
  e.s([
    "f",
    0,
    (e) => {
      let r = e.trim();
      return /^0x[\dA-Fa-f]{40}$/.test(r) ? (0, t.A)(r.toLowerCase()) : e;
    },
  ]);
};
