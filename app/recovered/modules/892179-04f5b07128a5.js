// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    n = e.i(352386),
    l = e.i(933185),
    a = e.i(565530),
    c = e.i(623213),
    o = e.i(748117),
    r = e.i(636447),
    i = e.i(467793);
  (e.i(252494), e.i(768820), e.i(698870), e.i(785373));
  let s = {
    component: () => {
      let {
          setWalletConnectionStatus: e,
          closePrivyModal: s,
          inProgressAuthFlowRef: u,
        } = (0, o.u)(),
        { data: C, navigate: d } = (0, r.u)(),
        p = (0, l.a)(),
        W = (0, c.a)(),
        E = C?.externalConnectWallet?.description,
        R = (0, n.useRef)(
          C?.externalConnectWallet?.walletList ?? p.appearance.walletList,
        ),
        S = (0, n.useRef)(
          C?.externalConnectWallet?.walletChainType ??
            p.appearance.walletChainType,
        ),
        w = R.current,
        T = S.current,
        h = "link" === u.current ? void 0 : () => d("LandingScreen");
      return (0, t.jsx)(i.i, {
        walletList: w,
        walletChainType: T,
        onClose: s,
        onConnect: (0, n.useCallback)(
          ({ connector: t, wallet: n }) => {
            (W("connectWallet", "onSuccess", { wallet: n }),
              e({
                status: "connected",
                connectedWallet: n,
                connector: t,
                connectError: null,
                connectRetry: () => null,
              }),
              d(
                "ConnectionStatusScreen",
                !C?.externalConnectWallet?.preSelectedWalletId,
              ));
          },
          [
            e,
            d,
            C?.login?.disableSignup,
            C?.externalConnectWallet?.preSelectedWalletId,
          ],
        ),
        onConnectError: (e) => {
          e instanceof a.b
            ? (console.warn(e.cause ? e.cause : e.message),
              W(
                "connectWallet",
                "onError",
                e.privyErrorCode || a.a.GENERIC_CONNECT_WALLET_ERROR,
              ))
            : (console.warn(e),
              W("connectWallet", "onError", a.a.UNKNOWN_CONNECT_WALLET_ERROR));
        },
        onBack: h,
        customDescription: E || "",
        preSelectedWalletId: C?.externalConnectWallet?.preSelectedWalletId,
        app: p,
      });
    },
    isUnauthenticatedScreem: !0,
  };
  e.s(["AuthenticateWithWalletScreen", 0, s, "default", 0, s]);
};
