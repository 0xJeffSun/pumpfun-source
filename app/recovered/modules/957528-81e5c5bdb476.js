// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    n = e.i(352386),
    o = e.i(768820),
    a = e.i(809845),
    l = e.i(933185),
    i = e.i(461687),
    c = e.i(748117),
    r = e.i(636447),
    s = e.i(335341),
    u = e.i(827432),
    d = e.i(91656);
  (e.i(785373), e.i(252494), e.i(535391));
  let w = ({
      walletLogo: e,
      success: n,
      errorMessage: o,
      title: l,
      subtitle: i,
      onRetry: c,
      onUseDifferentWallet: r,
      onBack: u,
      numRetries: d,
      maxRetries: w,
    }) =>
      (0, t.jsx)(s.S, {
        title: l,
        subtitle: i,
        icon: e,
        iconVariant: "loading",
        iconLoadingStatus: { success: n, fail: !!o },
        primaryCta:
          o === a.C.ERROR_USER_EXISTS
            ? { label: "Use a different wallet", onClick: r }
            : !n && o?.retryable && d < w
              ? {
                  label: "Retry",
                  onClick: c,
                  disabled: !o?.retryable || d >= w,
                }
              : !n && o && d >= w
                ? { label: "Use a different wallet", onClick: r }
                : void 0,
        onBack: u,
        watermark: !0,
      }),
    m = {
      component: () => {
        let e,
          {
            navigateBack: a,
            navigate: s,
            lastScreen: m,
            currentScreen: y,
            data: C,
            setModalData: g,
          } = (0, r.u)(),
          { walletConnectionStatus: f, closePrivyModal: b } = (0, c.u)(),
          [p, T] = (0, n.useState)(void 0),
          [k, S] = (0, n.useState)(0),
          h = (0, i.k)(f?.connector?.walletClientType || "unknown"),
          R = "connected" === f?.status,
          v = "switching_to_supported_chain" === f?.status;
        ((0, n.useEffect)(() => {
          if (R) {
            let e;
            if (C?.externalConnectWallet?.onCompleteNavigateTo) {
              let t = C.externalConnectWallet.onCompleteNavigateTo,
                n = f.connectedWallet?.address;
              e = setTimeout(() => {
                if (C.funding && f.connector) {
                  let e = f.connector.wallets.find((e) => e.address === n);
                  g({ ...C, funding: { ...C.funding, connectedWallet: e } });
                }
                s(
                  t({
                    address: n,
                    walletClientType: f.connector?.walletClientType,
                    walletChainType: f.connector?.chainType,
                  }),
                );
              }, l.Q);
            } else e = setTimeout(b, l.Q);
            return () => clearTimeout(e);
          }
        }, [R]),
          (0, n.useEffect)(() => {
            var e;
            f?.connectError &&
              ((e = f?.connectError), T((0, d.getErrorDetails)(e)));
          }, [f]));
        let B = f?.connector?.connectorType || "injected",
          x = f?.connector?.walletClientType || "unknown",
          E =
            h?.metadata?.shortName ||
            h?.name ||
            f?.connector?.walletBranding.name ||
            "Browser Extension",
          _ =
            h?.image_url?.md ||
            f?.connector?.walletBranding.icon ||
            ((e) => (0, t.jsx)(u.B, { ...e })),
          W = "Browser Extension" === E ? E.toLowerCase() : E;
        e = R
          ? `Successfully connected with ${W}`
          : p
            ? p.message
            : v
              ? "Switching networks"
              : `Waiting for ${W}`;
        let U = "Don’t see your wallet? Check your other browser windows.";
        return (
          R
            ? (U =
                "coinbase_wallet" === B
                  ? "This Coinbase Wallet address is not your Coinbase.com deposit address."
                  : "You’re good to go!")
            : k >= 2 && p
              ? (U = "Unable to connect wallet")
              : p
                ? (U = p.detail)
                : v
                  ? (U = "Switch your wallet to the requested network.")
                  : "metamask" === x && o.isMobile
                    ? (U = "Click to continue to open and connect MetaMask.")
                    : "metamask" === x
                      ? (U =
                          "For the best experience, connect only one wallet at a time.")
                      : "wallet_connect_v2" === B
                        ? (U = "Open your mobile wallet app to continue")
                        : "coinbase_wallet" === B &&
                          (U =
                            "This connects Coinbase Wallet, not your Coinbase.com account."),
          (0, t.jsx)(w, {
            walletName: E,
            walletLogo: _,
            success: R,
            errorMessage: p,
            title: e,
            subtitle: U,
            onRetry: () => {
              (S(k + 1), T(void 0), f?.connectRetry());
            },
            onUseDifferentWallet: a,
            onBack: y === m ? void 0 : a,
            numRetries: k,
            maxRetries: 2,
          })
        );
      },
    };
  e.s([
    "ConnectOnlyStatusScreen",
    0,
    m,
    "ConnectOnlyStatusScreenView",
    0,
    w,
    "default",
    0,
    m,
  ]);
};
