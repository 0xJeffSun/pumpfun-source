// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var n = e.i(484169);
  e.s([
    "f",
    0,
    (e) =>
      e instanceof n.ConnectionError &&
      (e.reason === n.ConnectionErrorReason.NotAllowed || 401 === e.status),
  ]);
};
