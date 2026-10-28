// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(481654),
    r = e.i(641705);
  let n = new Map();
  e.s([
    "getEvmPublicClient",
    0,
    function (e) {
      let i = n.get(e);
      if (i) return i;
      let a = (0, t.f)({
        transport: (0, r.f)(`${window.location.origin}/api/evm-rpc/${e}`, {
          batch: { batchSize: 8, wait: 0 },
        }),
      });
      return (n.set(e, a), a);
    },
  ]);
};
