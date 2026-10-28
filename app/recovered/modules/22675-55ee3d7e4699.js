// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(753887),
    f = e.i(971370),
    r = e.i(358052);
  e.s([
    "m",
    0,
    (e) =>
      f.VersionedTransaction.deserialize(
        new Uint8Array(t.Buffer.from(e, "base64")),
      ),
    "r",
    0,
    (e) => t.Buffer.from((0, r.f)(e)).toString("base64"),
  ]);
};
