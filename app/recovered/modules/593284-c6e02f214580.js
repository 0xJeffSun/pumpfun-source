// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  t.s([
    "H",
    0,
    class extends Error {
      blockHeight;
      lastValidBlockHeight;
      transactionCount;
      constructor({
        blockHeight: t,
        lastValidBlockHeight: e,
        transactionCount: n,
      }) {
        (super(
          `Wallet approval outlived the blockhash: ${n} signed transaction(s) discarded unsent (block height ${t} past last valid ${e})`,
        ),
          (this.name = "ApprovalExpiredError"),
          (this.blockHeight = t),
          (this.lastValidBlockHeight = e),
          (this.transactionCount = n));
      }
    },
    "$",
    0,
    function (t) {
      return t instanceof Error && "ApprovalExpiredError" === t.name;
    },
  ]);
};
