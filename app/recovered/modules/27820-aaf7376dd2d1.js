// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  "use strict";
  var e = t.i(481654),
    i = t.i(641705);
  let n = new Map();
  t.s([
    "getEvmPublicClient",
    0,
    function (t) {
      let o = n.get(t);
      if (o) return o;
      let r = (0, e.f)({
        transport: (0, i.f)(`${window.location.origin}/api/evm-rpc/${t}`, {
          batch: { batchSize: 8, wait: 0 },
        }),
      });
      return (n.set(t, r), r);
    },
  ]);
};
