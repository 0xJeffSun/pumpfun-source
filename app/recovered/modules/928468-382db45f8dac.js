// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  let r = null;
  e.s([
    "N",
    0,
    function (e) {
      return r?.wallet === e ? r.balance : void 0;
    },
    "e",
    0,
    function (e) {
      let n = e.tokenBalanceByMint[(0, t.T)()]?.balance;
      r =
        null !== e.currentWallet && void 0 !== n
          ? { wallet: e.currentWallet, balance: n }
          : null;
    },
  ]);
};
