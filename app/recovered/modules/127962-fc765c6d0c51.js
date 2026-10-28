// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(254667);
  let r = null,
    n = null,
    i = null,
    a = !1,
    l = !1,
    s = new Set();
  function o() {
    return (r ??= e
      .A(657164)
      .then((e) => e.instantiateWallets())
      .catch((e) => {
        throw ((r = null), e);
      }));
  }
  e.s([
    "P",
    0,
    function (r) {
      return l ||
        (function () {
          try {
            return !!localStorage
              .getItem("walletName")
              ?.includes("WalletConnect");
          } catch {
            return !1;
          }
        })()
        ? (i ??= Promise.all([
            o(),
            (n ??= e
              .A(595138)
              .then((e) => e.instantiateWalletConnectWalletAdapter(r))
              .catch(
                (e) => (
                  (n = null),
                  t.y.error("Failed to load WalletConnect wallet adapter", {
                    error: e,
                  }),
                  null
                ),
              )),
          ])
            .then(([e, t]) => (t ? [...e, t] : ((i = null), e)))
            .catch((e) => {
              throw ((i = null), e);
            }))
        : o();
    },
    "U",
    0,
    function () {
      for (let e of ((a = !0), (l = !0), s)) e();
    },
    "B",
    0,
    function () {
      for (let e of ((a = !0), s)) e();
    },
    "_",
    0,
    function (e) {
      return (
        s.add(e),
        () => {
          s.delete(e);
        }
      );
    },
    "W",
    0,
    function () {
      return a;
    },
  ]);
};
