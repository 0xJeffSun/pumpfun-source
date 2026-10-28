// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300059),
    n = e.i(19648);
  e.s([
    "f",
    0,
    function (e) {
      let { r: i, s: r } = t.secp256k1.Signature.fromCompact(e.slice(2, 130)),
        s = Number(`0x${e.slice(130)}`),
        [o, a] = (() => {
          if (0 === s || 1 === s) return [void 0, s];
          if (27 === s) return [BigInt(s), 0];
          if (28 === s) return [BigInt(s), 1];
          throw Error("Invalid yParityOrV value");
        })();
      return void 0 !== o
        ? {
            r: (0, n.N)(i, { size: 32 }),
            s: (0, n.N)(r, { size: 32 }),
            v: o,
            yParity: a,
          }
        : {
            r: (0, n.N)(i, { size: 32 }),
            s: (0, n.N)(r, { size: 32 }),
            yParity: a,
          };
    },
  ]);
};
