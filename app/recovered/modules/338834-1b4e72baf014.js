// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(683903);
  r.s([
    "g",
    0,
    function (r) {
      let [o] =
        Object.entries(e.D[r]).find(([r, e]) => "USDC" === e.symbol) ?? [];
      return o;
    },
  ]);
};
