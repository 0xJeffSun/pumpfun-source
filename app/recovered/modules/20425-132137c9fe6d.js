// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(246666);
  e.s([
    "f",
    0,
    function ({ blockNumber: e, chain: f, contract: a }) {
      let n = f?.contracts?.[a];
      if (!n) throw new t.m({ chain: f, contract: { name: a } });
      if (e && n.blockCreated && n.blockCreated > e)
        throw new t.m({
          blockNumber: e,
          chain: f,
          contract: { name: a, blockCreated: n.blockCreated },
        });
      return n.address;
    },
  ]);
};
