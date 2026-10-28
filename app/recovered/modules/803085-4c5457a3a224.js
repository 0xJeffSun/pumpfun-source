// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(64989);
  e.s([
    "f",
    0,
    function ({ blockNumber: e, chain: n, contract: r }) {
      let i = n?.contracts?.[r];
      if (!i) throw new t.m({ chain: n, contract: { name: r } });
      if (e && i.blockCreated && i.blockCreated > e)
        throw new t.m({
          blockNumber: e,
          chain: n,
          contract: { name: r, blockCreated: i.blockCreated },
        });
      return i.address;
    },
  ]);
};
