// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(927974),
    n = e.i(703114);
  e.s([
    "f",
    0,
    function (e) {
      let {
        blockHash: r,
        blockNumber: i,
        blockTag: a,
        requireCanonical: s,
      } = e;
      if (void 0 !== s && !r)
        throw new t.f(
          "`requireCanonical` can only be provided when `blockHash` is set.",
        );
      return r
        ? s
          ? { blockHash: r, requireCanonical: s }
          : { blockHash: r }
        : "bigint" == typeof i
          ? (0, n.N)(i)
          : (a ?? "latest");
    },
  ]);
};
