// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(753887),
    n = t.i(971370),
    r = t.i(358052);
  t.s([
    "m",
    0,
    (t) =>
      n.VersionedTransaction.deserialize(
        new Uint8Array(e.Buffer.from(t, "base64")),
      ),
    "r",
    0,
    (t) => e.Buffer.from((0, r.f)(t)).toString("base64"),
  ]);
};
