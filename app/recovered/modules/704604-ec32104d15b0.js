// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(971370),
    r = t.i(371389);
  t.s([
    "a",
    0,
    function (t) {
      return [
        {
          kind: "wallet",
          clientRowId: (0, r.f)(),
          address: new e.PublicKey(t),
          shareBps: 1e4,
          isAdmin: !0,
        },
      ];
    },
    "D",
    0,
    function (t, e) {
      if (!t?.length) return !1;
      if (1 === t.length) {
        let r = t[0];
        if (
          "wallet" === r.kind &&
          r.address.toBase58() === e &&
          1e4 === r.shareBps
        )
          return !1;
      }
      return !0;
    },
  ]);
};
