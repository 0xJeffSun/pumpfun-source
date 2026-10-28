// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  let n = null;
  e.s([
    "N",
    0,
    function (e) {
      return n?.wallet === e ? n.balance : void 0;
    },
    "e",
    0,
    function (e) {
      let r = e.tokenBalanceByMint[(0, t.T)()]?.balance;
      n =
        null !== e.currentWallet && void 0 !== r
          ? { wallet: e.currentWallet, balance: r }
          : null;
    },
  ]);
};
