// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(753887),
    i = e.i(971370),
    n = e.i(358052);
  e.s([
    "m",
    0,
    (e) =>
      i.VersionedTransaction.deserialize(
        new Uint8Array(t.Buffer.from(e, "base64")),
      ),
    "r",
    0,
    (e) => t.Buffer.from((0, n.f)(e)).toString("base64"),
  ]);
};
