// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s([
    "H",
    0,
    class extends Error {
      blockHeight;
      lastValidBlockHeight;
      transactionCount;
      constructor({
        blockHeight: e,
        lastValidBlockHeight: t,
        transactionCount: i,
      }) {
        (super(
          `Wallet approval outlived the blockhash: ${i} signed transaction(s) discarded unsent (block height ${e} past last valid ${t})`,
        ),
          (this.name = "ApprovalExpiredError"),
          (this.blockHeight = e),
          (this.lastValidBlockHeight = t),
          (this.transactionCount = i));
      }
    },
    "$",
    0,
    function (e) {
      return e instanceof Error && "ApprovalExpiredError" === e.name;
    },
  ]);
};
