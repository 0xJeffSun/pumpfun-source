// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = "blockhash_refresh_failed";
  class r extends Error {
    kind;
    constructor(e, r) {
      (super(t, r), (this.name = "BlockhashRefreshError"), (this.kind = e));
    }
  }
  e.s([
    "C",
    0,
    t,
    "U",
    0,
    r,
    "D",
    0,
    function (e) {
      return e instanceof r || (e instanceof Error && e.message === t);
    },
  ]);
};
