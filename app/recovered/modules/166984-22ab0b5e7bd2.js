// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(300059),
    i = r.i(19648);
  r.s([
    "f",
    0,
    function (r) {
      let { r: t, s: n } = e.secp256k1.Signature.fromCompact(r.slice(2, 130)),
        o = Number(`0x${r.slice(130)}`),
        [s, f] = (() => {
          if (0 === o || 1 === o) return [void 0, o];
          if (27 === o) return [BigInt(o), 0];
          if (28 === o) return [BigInt(o), 1];
          throw Error("Invalid yParityOrV value");
        })();
      return void 0 !== s
        ? {
            r: (0, i.N)(t, { size: 32 }),
            s: (0, i.N)(n, { size: 32 }),
            v: s,
            yParity: f,
          }
        : {
            r: (0, i.N)(t, { size: 32 }),
            s: (0, i.N)(n, { size: 32 }),
            yParity: f,
          };
    },
  ]);
};
