// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386);
  let n = [],
    r = {
      autoConnect: !1,
      connecting: !1,
      connected: !1,
      disconnecting: !1,
      select() {
        i("call", "select");
      },
      connect: () => Promise.reject(i("call", "connect")),
      disconnect: () => Promise.reject(i("call", "disconnect")),
      sendTransaction: () => Promise.reject(i("call", "sendTransaction")),
      signTransaction: () => Promise.reject(i("call", "signTransaction")),
      signAllTransactions: () =>
        Promise.reject(i("call", "signAllTransactions")),
      signMessage: () => Promise.reject(i("call", "signMessage")),
      signIn: () => Promise.reject(i("call", "signIn")),
    };
  function i(e, t) {
    let n = Error(
      `You have tried to ${e} "${t}" on a WalletContext without providing one. Make sure to render a WalletProvider as an ancestor of the component that uses WalletContext.`,
    );
    return (console.error(n), n);
  }
  (Object.defineProperty(r, "wallets", {
    get: () => (i("read", "wallets"), n),
  }),
    Object.defineProperty(r, "wallet", {
      get: () => (i("read", "wallet"), null),
    }),
    Object.defineProperty(r, "publicKey", {
      get: () => (i("read", "publicKey"), null),
    }));
  let o = (0, t.createContext)(r);
  e.s([
    "x",
    0,
    o,
    "P",
    0,
    function () {
      return (0, t.useContext)(o);
    },
  ]);
};
