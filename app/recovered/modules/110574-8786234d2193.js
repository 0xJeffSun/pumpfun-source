// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(572280),
    i = r.i(352386),
    a = r.i(616800),
    l = r.i(748117),
    t = r.i(636447),
    n = r.i(933185),
    c = r.i(335341);
  (r.i(785373), r.i(768820), r.i(535391), r.i(252494));
  let d = ({ connectionFailed: r, onClose: i }) =>
      (0, e.jsx)(
        c.S,
        r
          ? {
              title: "Something went wrong",
              subtitle: "We're on it. Please try again later.",
              icon: o.f,
              iconVariant: "error",
              primaryCta: { label: "Close", onClick: i },
              watermark: !0,
            }
          : {
              title: "Connecting to your wallet",
              subtitle: "Please wait...",
              iconVariant: "loading",
              showClose: !0,
              onClose: i,
              watermark: !1,
            },
      ),
    s = {
      component: () => {
        let { authenticated: r, user: o } = (0, n.u)(),
          {
            client: c,
            closePrivyModal: s,
            createAnalyticsEvent: v,
            walletProxy: p,
          } = (0, l.u)(),
          {
            navigate: u,
            data: h,
            setModalData: g,
            onUserCloseViaDialogOrKeybindRef: b,
          } = (0, t.u)(),
          f = (0, i.useMemo)(() => Date.now(), []),
          [y, x] = (0, i.useState)(!1),
          {
            onCompleteNavigateTo: m,
            onFailure: w,
            shouldForceMFA: k,
            entropyId: j,
            entropyIdVerifier: z,
            recoveryMethod: $,
            connectingWalletAddress: C,
            isUnifiedWallet: M = !1,
          } = h?.connectWallet ?? {},
          S = (r) => {
            y || (x(!0), w("string" == typeof r ? Error(r) : r));
          };
        (0, i.useEffect)(() => {
          let e;
          return r
            ? p
              ? ((async () => {
                  let r = await c.getAccessToken();
                  if (!r)
                    return S(
                      "User must be authenticated and have a Privy wallet before it can be connected",
                    );
                  try {
                    if (!M) {
                      if (!j || !z)
                        return S(
                          "For on-device first-class chain wallets, entropyId and entropyIdVerifier are required",
                        );
                      await p.connect({
                        accessToken: r,
                        entropyId: j,
                        entropyIdVerifier: z,
                      });
                    }
                    k && (await p.verifyMfa({ accessToken: r }));
                    let o = (Date.now() - f) / 1e3;
                    "EmbeddedWalletKeyExportScreen" === m && o < 1
                      ? (e = setTimeout(
                          () => {
                            u(m, !1);
                          },
                          1e3 * (1 - o),
                        ))
                      : u(m, !1);
                  } catch (r) {
                    if ((0, a.e)(r) && "privy" === $) {
                      let r = await c.getAccessToken();
                      if (!r)
                        return S(
                          "User must be authenticated and have a Privy wallet before it can be recovered",
                        );
                      try {
                        v({
                          eventName: "embedded_wallet_pinless_recovery_started",
                          payload: { walletAddress: C },
                        });
                        let e = await p?.recover({
                          accessToken: r,
                          entropyId: j,
                          entropyIdVerifier: z,
                        });
                        (e?.entropyId || S(Error("Unable to recover wallet")),
                          m ? u(m) : s({ shouldCallAuthOnSuccess: !1 }),
                          v({
                            eventName: "embedded_wallet_recovery_completed",
                            payload: { walletAddress: C },
                          }),
                          u(m));
                      } catch (r) {
                        S("An error has occurred, please try again.");
                      }
                    } else
                      (0, a.e)(r) && "privy" !== $ && "privy-v2" !== $
                        ? (g({
                            ...h,
                            recoverWallet: {
                              entropyId: j,
                              entropyIdVerifier: z,
                              onCompleteNavigateTo: m,
                              onFailure: w,
                            },
                            recoveryOAuthStatus: {
                              provider: $,
                              action: "recover",
                              isInAccountCreateFlow: !1,
                              shouldCreateEth: !1,
                              shouldCreateSol: !1,
                            },
                          }),
                          u((0, a.b)($)))
                        : S(r);
                  }
                })(),
                () => clearTimeout(e))
              : void 0
            : S(
                "User must be authenticated and have a Privy wallet before it can be connected",
              );
        }, [r, o, p]);
        let A = () => {
          (S("User exited before wallet could be connected"),
            s({ shouldCallAuthOnSuccess: !1 }));
        };
        return (
          (b.current = A),
          (0, e.jsx)(d, { connectionFailed: y, onClose: A })
        );
      },
    };
  r.s([
    "EmbeddedWalletConnectingScreen",
    0,
    s,
    "EmbeddedWalletConnectingView",
    0,
    d,
    "default",
    0,
    s,
  ]);
};
