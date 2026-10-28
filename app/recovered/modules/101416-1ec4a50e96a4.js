// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(218438);
  e.s([
    "f",
    0,
    function ({ blockNumber: e, chain: n, contract: r }) {
      let a = n?.contracts?.[r];
      if (!a) throw new t.m({ chain: n, contract: { name: r } });
      if (e && a.blockCreated && a.blockCreated > e)
        throw new t.m({
          blockNumber: e,
          chain: n,
          contract: { name: r, blockCreated: a.blockCreated },
        });
      return a.address;
    },
  ]);
};
