// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(616800);
  r.s([
    "s",
    0,
    (r, o) =>
      (0, e.s)(r, o.ethereum.createOnLogin) ||
      (0, e.g)(r, o.solana.createOnLogin),
  ]);
};
