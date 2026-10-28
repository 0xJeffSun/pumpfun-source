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
        transactionCount: r,
      }) {
        (super(
          `Wallet approval outlived the blockhash: ${r} signed transaction(s) discarded unsent (block height ${e} past last valid ${t})`,
        ),
          (this.name = "ApprovalExpiredError"),
          (this.blockHeight = e),
          (this.lastValidBlockHeight = t),
          (this.transactionCount = r));
      }
    },
    "$",
    0,
    function (e) {
      return e instanceof Error && "ApprovalExpiredError" === e.name;
    },
  ]);
};
