// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    a = e.i(352386),
    o = e.i(768820),
    i = e.i(689391),
    t = e.i(827432),
    n = e.i(616800),
    l = e.i(583503),
    c = e.i(933185),
    s = e.i(439614),
    d = e.i(809845),
    u = e.i(520417),
    p = e.i(389238),
    g = e.i(565530),
    v = e.i(461687),
    h = e.i(748117),
    b = e.i(636447),
    m = e.i(203793),
    y = e.i(432250),
    w = e.i(857366),
    f = e.i(335341),
    x = e.i(336291);
  (e.i(785373), e.i(535391), e.i(252494));
  let C = (e) => {
      let r = localStorage
        .getItem("-walletlink:https://www.walletlink.org:Addresses")
        ?.split(" ")
        .filter((e) => (0, u.f)(e, { strict: !0 }))
        .map((e) => (0, p.A)(e));
      return (
        !!r?.length &&
        !!e?.linkedAccounts.filter(
          (e) => "wallet" == e.type && r.includes(e.address),
        ).length
      );
    },
    k = new Set(["phantom"]),
    S = (e) =>
      e && k.has(e.toLowerCase()) ? "transaction" : "offchain-message",
    V = (e) =>
      e?.privyErrorCode === g.a.LINKED_TO_ANOTHER_USER
        ? d.C.ERROR_USER_EXISTS
        : e instanceof d.P && !e.details.default
          ? e.details
          : e instanceof d.b
            ? d.C.ERROR_TIMED_OUT
            : e?.privyErrorCode === g.a.CANNOT_LINK_MORE_OF_TYPE
              ? d.C.ERROR_USER_LIMIT_REACHED
              : d.C.ERROR_WALLET_CONNECTION,
    T = ({
      walletLogo: e,
      title: a,
      subtitle: o,
      signSuccess: i,
      errorMessage: t,
      connectSuccess: n,
      separateConnectAndSign: c,
      signing: u,
      walletConnectRedirectUri: p,
      walletConnectFallbackUniversalUri: g,
      hasTabbedAway: v,
      showCoinbaseWalletResetCta: h,
      numRetries: b,
      onBack: m,
      onSign: y,
      onRetry: w,
      onCoinbaseReset: x,
      onDifferentWallet: C,
    }) => {
      let { t: k } = (0, s.u)(),
        S = h
          ? { label: "Use a different wallet", onClick: x, disabled: i }
          : t === d.C.ERROR_USER_EXISTS && m
            ? { label: "Use a different wallet", onClick: C }
            : n && !i && c
              ? {
                  label: u ? "Signing" : "Sign with your wallet",
                  onClick: y,
                  disabled: u,
                }
              : !i && t?.retryable && b < 2
                ? { label: "Retry", onClick: w, disabled: !1 }
                : i || t
                  ? void 0
                  : {
                      label: k("connectionStatus.connecting"),
                      onClick: () => {},
                      disabled: !0,
                    };
      return (0, r.jsx)(f.S, {
        title: a,
        subtitle: o,
        icon: e,
        iconVariant: "loading",
        iconLoadingStatus: { success: i, fail: !!t },
        primaryCta: S,
        onBack: m,
        watermark: !0,
        children:
          !n &&
          p &&
          !v &&
          (0, r.jsxs)(j, {
            children: [
              k("connectionStatus.stillHere"),
              " ",
              (0, r.jsx)(l.L, {
                href: p,
                target: "_blank",
                variant: "underlined",
                size: "sm",
                children: k("connectionStatus.tryConnectingAgain"),
              }),
              g &&
                (0, r.jsxs)(r.Fragment, {
                  children: [
                    " ",
                    k("connectionStatus.or"),
                    " ",
                    (0, r.jsx)(l.L, {
                      href: g,
                      target: "_blank",
                      variant: "underlined",
                      size: "sm",
                      children: k("connectionStatus.useDifferentLink"),
                    }),
                  ],
                }),
            ],
          }),
      });
    },
    D = {
      component: () => {
        var e, i;
        let l,
          u,
          [p, f] = (0, a.useState)(!1),
          [k, D] = (0, a.useState)(!1),
          [j, z] = (0, a.useState)(void 0),
          { authenticated: F, logout: E } = (0, c.u)(),
          {
            navigate: U,
            navigateBack: R,
            lastScreen: W,
            currentScreen: L,
            setModalData: $,
            data: A,
          } = (0, b.u)(),
          P = (0, c.a)(),
          { t: _ } = (0, s.u)(),
          {
            getAuthFlow: M,
            walletConnectionStatus: N,
            closePrivyModal: I,
            initLoginWithWallet: B,
            loginWithWallet: O,
            updateWallets: Z,
            createAnalyticsEvent: H,
          } = (0, h.u)(),
          { walletConnectors: Y } = (0, c.u)(),
          [q, K] = (0, a.useState)(0),
          { user: X } = (0, c.u)(),
          [G] = (0, a.useState)(X?.linkedAccounts.length || 0),
          [Q, J] = (0, a.useState)(""),
          [ee, er] = (0, a.useState)(""),
          [ea, eo] = (0, a.useState)(!1),
          { hasTabbedAway: ei } = (function () {
            let [e, r] = (0, a.useState)(!1),
              o = (0, a.useCallback)(() => {
                document.hidden && r(!0);
              }, []);
            return (
              (0, a.useEffect)(
                () => (
                  document.addEventListener("visibilitychange", o),
                  () => document.removeEventListener("visibilitychange", o)
                ),
                [o],
              ),
              { hasTabbedAway: e, reset: () => r(!1) }
            );
          })(),
          { enabled: et, token: en } = (0, n.a)(),
          el = (0, v.k)(N?.connector?.walletClientType || "unknown"),
          ec =
            (o.isMobile &&
              "wallet_connect_v2" === N?.connector?.connectorType) ||
            (o.isMobile && "coinbase_wallet" === N?.connector?.connectorType) ||
            (o.isMobile && "base_account" === N?.connector?.connectorType) ||
            (o.isMobile &&
              "injected" === N?.connector?.connectorType &&
              "phantom" === N?.connector?.walletClientType) ||
            (o.isMobile &&
              "solana_adapter" === N?.connector?.connectorType &&
              "mobile_wallet_adapter" === N.connector.walletClientType),
          es = "connected" === N?.status,
          ed = "switching_to_supported_chain" === N?.status;
        ((0, a.useEffect)(() => {
          let e = M(),
            r = e instanceof t.S || e instanceof n.S ? e : void 0;
          es &&
          "solana" === N.connector?.chainType &&
          (0, y.g)(w.a) &&
          void 0 === A?.login?.isSigningInWithLedgerSolana
            ? U("ConnectLedgerScreen", !1)
            : (es &&
                !r &&
                (!et || en || F
                  ? B(
                      N.connectedWallet,
                      en,
                      A?.login?.disableSignup,
                      A?.login?.isSigningInWithLedgerSolana
                        ? S(N.connector?.walletClientType)
                        : "plain",
                    ).then(() => {
                      eo(!0);
                    })
                  : ($({
                      captchaModalData: {
                        callback: (e) =>
                          B(
                            N.connectedWallet,
                            e,
                            A?.login?.disableSignup,
                            A?.login?.isSigningInWithLedgerSolana
                              ? S(N.connector?.walletClientType)
                              : "plain",
                          ).then(() => {
                            eo(!0);
                          }),
                        userIntentRequired: !1,
                        onSuccessNavigateTo: "ConnectionStatusScreen",
                        onErrorNavigateTo: "ErrorScreen",
                      },
                    }),
                    U("CaptchaScreen", !1))),
              r instanceof n.S &&
                A?.login?.isSigningInWithLedgerSolana &&
                (r.messageType = S(r.meta.walletClientType)),
              r && ec && es && !r.preparedMessage
                ? r.buildMessage()
                : r &&
                  !ec &&
                  es &&
                  (k ||
                    (async () => {
                      (D(!0), z(void 0));
                      try {
                        ("wallet_connect_v2" === N?.connector?.connectorType &&
                          "metamask" === N?.connector?.walletClientType &&
                          (await (0, x.a)(2500)),
                          await ep());
                      } catch (e) {
                        console.warn("Auto-prompted signature failed", e);
                      } finally {
                        D(!1);
                      }
                    })()));
        }, [q, es, ea]),
          (0, a.useEffect)(() => {
            if (X && p) {
              let e = c.Q - 500;
              if (P?.legal.requireUsersAcceptTerms && !X.hasAcceptedTerms) {
                let r = setTimeout(() => {
                  U("AffirmativeConsentScreen");
                }, e);
                return () => clearTimeout(r);
              }
              if ((0, m.s)(X, P.embeddedWallets)) {
                let r = setTimeout(() => {
                  ($({
                    createWallet: {
                      onSuccess: () => {},
                      onFailure: (e) => {
                        (console.error(e),
                          H({
                            eventName:
                              "embedded_wallet_creation_failure_logout",
                            payload: {
                              error: e,
                              screen: "ConnectionStatusScreen",
                            },
                          }),
                          E());
                      },
                      callAuthOnSuccessOnClose: !0,
                    },
                  }),
                    U("EmbeddedWalletOnAccountCreateScreen"));
                }, e);
                return () => clearTimeout(r);
              }
              Z();
              let r = setTimeout(
                () => I({ shouldCallAuthOnSuccess: !0, isSuccess: !0 }),
                c.Q,
              );
              return () => clearTimeout(r);
            }
          }, [X, p]));
        let eu = (e) => {
          if (e?.privyErrorCode !== g.a.ALLOWLIST_REJECTED) {
            if (e?.privyErrorCode === g.a.USER_LIMIT_REACHED)
              return (
                console.error(new g.j(e).toString()),
                void U("UserLimitReachedScreen")
              );
            if (e?.privyErrorCode !== g.a.USER_DOES_NOT_EXIST)
              return e?.privyErrorCode === g.a.ACCOUNT_TRANSFER_REQUIRED &&
                e.data?.data?.nonce
                ? ($({
                    accountTransfer: {
                      nonce: e.data?.data?.nonce,
                      account: M()?.meta.address,
                      displayName: e.data?.data?.account?.displayName,
                      externalWalletMetadata: {
                        walletClientType: M()?.meta.walletClientType,
                        chainId: M()?.meta.chainId,
                        connectorType: M()?.meta.connectorType,
                      },
                      linkMethod: M() instanceof t.S ? "siwe" : "siws",
                      embeddedWalletAddress:
                        e.data?.data?.otherUser?.embeddedWalletAddress,
                    },
                  }),
                  void U("LinkConflictScreen"))
                : void z(V(e));
            U("AccountNotFoundScreen");
          } else U("AllowlistRejectionScreen");
        };
        async function ep() {
          try {
            (await O(), f(!0));
          } catch (e) {
            eu(e);
          } finally {
            D(!1);
          }
        }
        ((0, a.useEffect)(() => {
          N?.connectError && eu(N?.connectError);
        }, [N]),
          (e = () => {
            let e =
              "wallet_connect_v2" === eg && N?.connector instanceof t.W
                ? N.connector.redirectUri
                : void 0;
            e && J(e);
            let r =
              "wallet_connect_v2" === eg && N?.connector instanceof t.W
                ? N.connector.fallbackUniversalRedirectUri
                : void 0;
            r && er(r);
          }),
          (i = N?.connector instanceof t.W && !Q ? 500 : null),
          (l = (0, a.useRef)(() => {})),
          (0, a.useEffect)(() => {
            l.current = e;
          }),
          (0, a.useEffect)(() => {
            if (null !== i) {
              let e = setInterval(() => l.current(), i || 0);
              return () => clearInterval(e);
            }
          }, [i]));
        let eg = N?.connector?.connectorType || "injected",
          ev = N?.connector?.walletClientType || "unknown",
          eh =
            el?.metadata?.shortName ||
            el?.name ||
            N?.connector?.walletBranding.name ||
            "Browser Extension",
          eb =
            el?.image_url?.md ||
            N?.connector?.walletBranding.icon ||
            ((e) => (0, r.jsx)(t.B, { ...e })),
          em = "Browser Extension" === eh ? eh.toLowerCase() : eh;
        u = p
          ? _("connectionStatus.successfullyConnected", { walletName: em })
          : j
            ? _("connectionStatus.errorTitle", { errorMessage: j.message })
            : ed
              ? "Switching networks"
              : es
                ? k && ec
                  ? "Signing"
                  : "Sign to verify"
                : `Waiting for ${em}`;
        let ey = _("connectionStatus.checkOtherWindows");
        p
          ? (ey =
              G === (X?.linkedAccounts.length || 0)
                ? "Wallet was already linked."
                : "coinbase_wallet" === eg
                  ? _("coinbaseWallet.successSubtitle")
                  : "You're good to go!")
          : q >= 2 && j
            ? (ey = "Unable to connect wallet")
            : j
              ? (ey = j.detail)
              : ed
                ? (ey = "Switch your wallet to the requested network.")
                : es && ec
                  ? (ey =
                      "Sign the message in your wallet to verify it belongs to you.")
                  : "metamask" === ev && o.isMobile
                    ? (ey = "Click continue to open and connect MetaMask.")
                    : "metamask" === ev
                      ? (ey =
                          "For the best experience, connect only one wallet at a time.")
                      : "wallet_connect" === eg
                        ? (ey = "Open your mobile wallet app to continue")
                        : "coinbase_wallet" === eg
                          ? (ey = _(
                              C(X)
                                ? "coinbaseWallet.connectingSubtitleReset"
                                : "coinbaseWallet.connectingSubtitle",
                            ))
                          : A?.login?.isSigningInWithLedgerSolana &&
                            (ey =
                              "Ledger requires a transaction to verify your identity. You'll sign a transaction that performs no onchain action.");
        let ew = Y?.walletConnectors?.find(
            (e) => "coinbase_wallet" === e.walletClientType,
          ),
          ef =
            "coinbase_wallet" === ev && (C(X) || j === d.C.ERROR_USER_EXISTS);
        return (0, r.jsx)(T, {
          walletLogo: eb,
          title: u,
          subtitle: ey,
          signSuccess: p,
          errorMessage: j,
          connectSuccess: es,
          separateConnectAndSign: ec,
          signing: k,
          walletConnectRedirectUri: Q,
          walletConnectFallbackUniversalUri: ee,
          hasTabbedAway: ei,
          showCoinbaseWalletResetCta: ef,
          numRetries: q,
          onBack: W && L !== W ? R : void 0,
          onSign: () => {
            (D(!0), ep());
          },
          onRetry: () => {
            (K(q + 1), z(void 0), es ? (D(!0), ep()) : N?.connectRetry());
          },
          onCoinbaseReset: () => {
            ew && ew?.disconnect();
          },
          onDifferentWallet: R,
        });
      },
    },
    j = i.z.p`
  text-align: center;
  color: var(--privy-color-foreground-2);
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0;
`;
  e.s([
    "ConnectionStatusScreen",
    0,
    D,
    "ConnectionStatusView",
    0,
    T,
    "default",
    0,
    D,
    "getErrorDetails",
    0,
    V,
  ]);
};
