// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(300059),
    r = e.i(19648);
  e.s([
    "f",
    0,
    function (e) {
      let { r: n, s: i } = t.secp256k1.Signature.fromCompact(e.slice(2, 130)),
        a = Number(`0x${e.slice(130)}`),
        [o, s] = (() => {
          if (0 === a || 1 === a) return [void 0, a];
          if (27 === a) return [BigInt(a), 0];
          if (28 === a) return [BigInt(a), 1];
          throw Error("Invalid yParityOrV value");
        })();
      return void 0 !== o
        ? {
            r: (0, r.N)(n, { size: 32 }),
            s: (0, r.N)(i, { size: 32 }),
            v: o,
            yParity: s,
          }
        : {
            r: (0, r.N)(n, { size: 32 }),
            s: (0, r.N)(i, { size: 32 }),
            yParity: s,
          };
    },
  ]);
};
