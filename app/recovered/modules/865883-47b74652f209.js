// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    o = e.i(352386),
    a = e.i(995040),
    t = e.i(25047),
    i = e.i(847181),
    l = e.i(933185),
    c = e.i(827432),
    n = e.i(748117),
    d = e.i(565530),
    s = e.i(445143),
    v = e.i(118695),
    p = e.i(582355),
    u = e.i(623213),
    h = e.i(636447),
    y = e.i(616800),
    g = e.i(803437);
  async function f({ url: e, popup: r, provider: o }) {
    return (
      (r.location = e),
      new Promise((e, o) => {
        function a() {
          (r?.close(), window.removeEventListener("message", t));
        }
        function t(r) {
          r.data &&
            ("PRIVY_OAUTH_RESPONSE" === r.data.type &&
              r.data.stateCode &&
              r.data.authorizationCode &&
              (e(r.data), a()),
            "https://cdn.apple-cloudkit.com" === r.origin &&
              r.data.ckSession &&
              (e({
                type: "PRIVY_OAUTH_RESPONSE",
                ckWebAuthToken: r.data.ckSession,
              }),
              a()),
            "PRIVY_OAUTH_ERROR" === r.data.type && (o(r.data.error), a()));
        }
        window.addEventListener("message", t);
      })
    );
  }
  async function b({
    api: e,
    provider: r,
    stateCode: o,
    codeVerifier: a,
    authorizationCode: t,
  }) {
    if (!t || !o)
      throw new d.P(
        "[OAuth AuthFlow] Authorization and state codes code must be set prior to calling authenicate.",
      );
    if ("undefined" === t)
      throw new d.P("User denied confirmation during OAuth flow");
    try {
      return (
        await e.post(s.a8, {
          authorization_code: t,
          state_code: o,
          code_verifier: a,
          provider: r,
        })
      ).access_token;
    } catch (r) {
      let e = (0, d.f)(r);
      if (e.privyErrorCode)
        throw new d.P(
          e.message || "Invalid code during OAuth flow.",
          void 0,
          e.privyErrorCode,
        );
      if ("User denied confirmation during OAuth flow" === e.message)
        throw new d.P(
          "Invalid code during oauth flow.",
          void 0,
          d.a.OAUTH_USER_DENIED,
        );
      throw new d.P(
        "Invalid code during OAuth flow.",
        void 0,
        d.a.UNKNOWN_AUTH_ERROR,
      );
    }
  }
  async function w({ api: e, provider: r }) {
    let o = (0, v.c)(),
      a = (0, v.a)(),
      t = await (0, v.d)(o);
    try {
      return "icloud" === r
        ? { url: (await e.post(s.a9, { client_type: "web" })).url }
        : {
            url: (
              await e.post(s.aa, {
                redirect_to: window.location.href,
                code_challenge: t,
                state_code: a,
              })
            ).url,
            codeVerifier: o,
            stateCode: a,
            provider: r,
          };
    } catch (e) {
      throw (0, d.f)(e);
    }
  }
  (e.i(252494), e.i(785373), e.i(768820), e.i(535391));
  let x = {
      "google-drive": { name: "Google Drive", component: g.G },
      icloud: { name: "iCloud", component: g.A },
    },
    m = {
      component: () => {
        let { logout: e } = (0, l.u)(),
          { navigate: s, setModalData: v, data: m } = (0, h.u)(),
          { closePrivyModal: k, createAnalyticsEvent: j } = (0, n.u)(),
          { execute: C } = (() => {
            let {
                client: e,
                walletProxy: r,
                refreshSessionAndUser: o,
              } = (0, n.u)(),
              { data: a } = (0, h.u)(),
              { user: t } = (0, l.u)(),
              i = (0, u.a)(),
              { create: c } = (0, y.n)();
            return {
              execute: async ({
                provider: n,
                action: s,
                popup: v,
                shouldCreateEth: u,
                shouldCreateSol: h,
              }) => {
                let y, g;
                if (!e) throw new d.P("Missing client");
                function x(r) {
                  if (!r && e)
                    throw (
                      e.createAnalyticsEvent({
                        eventName: "recovery_oauth_error",
                        payload: {
                          error: "Unable to open recovery OAuth popup",
                          provider: n,
                        },
                      }),
                      new d.P("Recovery OAuth failed")
                    );
                }
                switch (n) {
                  case "google-drive": {
                    let r,
                      o,
                      {
                        url: a,
                        codeVerifier: t,
                        stateCode: i,
                      } = await w({ api: e.api, provider: n });
                    x(a);
                    try {
                      let t = await f({ url: a, popup: v, provider: n });
                      if (
                        ((r = t.stateCode), (o = t.authorizationCode), r !== i)
                      )
                        throw (
                          e.createAnalyticsEvent({
                            eventName: "possible_phishing_attempt",
                            payload: {
                              provider: n,
                              storedStateCode: i ?? "",
                              returnedStateCode: r ?? "",
                            },
                          }),
                          new d.P(
                            "Unexpected auth flow. This may be a phishing attempt.",
                            void 0,
                            d.a.OAUTH_UNEXPECTED,
                          )
                        );
                    } catch (r) {
                      throw (
                        e.createAnalyticsEvent({
                          eventName: "recovery_oauth_error",
                          payload: { error: r.toString(), provider: n },
                        }),
                        new d.P("Recovery OAuth failed")
                      );
                    }
                    [y, g] = await Promise.all([
                      e.getAccessToken(),
                      b({
                        api: e.api,
                        provider: n,
                        codeVerifier: t,
                        stateCode: r,
                        authorizationCode: o,
                      }),
                    ]);
                    break;
                  }
                  case "icloud": {
                    let { url: r } = await w({ api: e.api, provider: n });
                    x(r);
                    let { ckWebAuthToken: o } = await f({
                      url: r,
                      popup: v,
                      provider: n,
                    });
                    ((g = o), (y = await e.getAccessToken()));
                  }
                }
                if (!r) throw new d.P("Cannot connect to wallet proxy");
                if (!y) throw new d.P("Unable to authorize user");
                switch (s) {
                  case "recover": {
                    let o = a?.recoverWallet?.entropyId,
                      t = a?.recoverWallet?.entropyIdVerifier;
                    if (!o || !t) throw new d.P("Recovery OAuth failed");
                    (e.createAnalyticsEvent({
                      eventName: "embedded_wallet_recovery_started",
                      payload: { walletAddress: o, recoveryMethod: n },
                    }),
                      await r.recover({
                        accessToken: y,
                        entropyId: o,
                        entropyIdVerifier: t,
                        recoveryAccessToken: g,
                      }),
                      e.createAnalyticsEvent({
                        eventName: "embedded_wallet_recovery_completed",
                        payload: { walletAddress: o, recoveryMethod: n },
                      }));
                    break;
                  }
                  case "create-wallet": {
                    let r;
                    if (
                      (e.createAnalyticsEvent({
                        eventName: "embedded_wallet_creation_started",
                      }),
                      u && h)
                    )
                      ((r = await c({
                        recoveryMethod: n,
                        recoveryAccessToken: g,
                        chainType: "ethereum",
                        walletIndex: 0,
                        latestUser: t,
                      })),
                        (r = await c({
                          chainType: "solana",
                          walletIndex: 0,
                          latestUser: r.user,
                        })));
                    else if (h)
                      r = await c({
                        recoveryMethod: n,
                        recoveryAccessToken: g,
                        chainType: "solana",
                        walletIndex: 0,
                        latestUser: t,
                      });
                    else {
                      if (!u) throw Error("Invalid args to create wallet");
                      r = await c({
                        recoveryMethod: n,
                        recoveryAccessToken: g,
                        chainType: "ethereum",
                        walletIndex: 0,
                        latestUser: t,
                      });
                    }
                    if (!r)
                      throw (
                        i(
                          "createWallet",
                          "onError",
                          d.a.UNKNOWN_EMBEDDED_WALLET_ERROR,
                        ),
                        Error("Failed to create wallet")
                      );
                    (e.createAnalyticsEvent({
                      eventName: "embedded_wallet_creation_completed",
                      payload: { walletAddress: r.account.address },
                    }),
                      i("createWallet", "onSuccess", { wallet: r.account }));
                    break;
                  }
                  case "set-recovery": {
                    let a = (0, l.g)(t);
                    if (!a)
                      throw (
                        i(
                          "setWalletRecovery",
                          "onError",
                          d.a.EMBEDDED_WALLET_NOT_FOUND,
                        ),
                        Error("Embedded wallet not found")
                      );
                    e.createAnalyticsEvent({
                      eventName: "embedded_wallet_set_recovery_started",
                      payload: {
                        walletAddress: a.address,
                        existingRecoveryMethod: a.recoveryMethod,
                        targetRecoveryMethod: n,
                      },
                    });
                    let { entropyId: c, entropyIdVerifier: s } = (0, p.g)(t);
                    await r.setRecovery({
                      accessToken: y,
                      entropyId: c,
                      entropyIdVerifier: s,
                      recoveryMethod: n,
                      recoveryAccessToken: g,
                    });
                    let v = (0, l.g)(await o());
                    if (!v)
                      throw (
                        i(
                          "createWallet",
                          "onError",
                          d.a.UNKNOWN_EMBEDDED_WALLET_ERROR,
                        ),
                        Error("Failed to set recovery on wallet")
                      );
                    (e.createAnalyticsEvent({
                      eventName: "embedded_wallet_set_recovery_completed",
                      payload: {
                        walletAddress: a.address,
                        existingRecoveryMethod: a.recoveryMethod,
                        targetRecoveryMethod: n,
                      },
                    }),
                      i("setWalletRecovery", "onSuccess", {
                        method: n,
                        wallet: v,
                      }));
                    break;
                  }
                  default:
                    throw new d.P("Unsupported recovery action");
                }
              },
            };
          })(),
          [A, E] = (0, o.useState)(!1),
          {
            provider: _,
            action: M,
            isInAccountCreateFlow: z,
            shouldCreateEth: $,
            shouldCreateSol: T,
          } = m?.recoveryOAuthStatus ?? {},
          [L, R] = (0, o.useState)(void 0),
          [S, O] = (0, o.useState)("create-wallet" === M);
        if ("user-passcode" === _)
          throw Error(
            "RecoveryOAuthScreen should never be called with a wallet that specifies recoveryMethod: `user-passcode`",
          );
        let P = x[_].name,
          Z = x[_].component,
          U = m?.recoverWallet?.onCompleteNavigateTo,
          N = new c.R(
            async (e = "create-wallet") => (
              O(!0),
              new Promise((r, o) => {
                setTimeout(async () => {
                  try {
                    let o = window.open();
                    (await C({
                      provider: _,
                      action: e,
                      popup: o,
                      shouldCreateEth: $,
                      shouldCreateSol: T,
                    }),
                      E(!0),
                      r());
                  } catch (r) {
                    (R({
                      message: `${"recover" === e ? "Recovery" : "Back up"} with ${P} unsuccessful`,
                      detail:
                        "recover" === M
                          ? `Please verify that you are selecting the ${P} account associated with your backup.`
                          : "",
                      retryable: !0,
                    }),
                      o());
                  }
                }, 0);
              })
            ),
          );
        ((0, o.useEffect)(() => {
          "recover" !== M && N.execute(z ? "create-wallet" : "set-recovery");
        }, []),
          (0, o.useEffect)(() => {
            if (!A) return;
            let r = setTimeout(() => {
              z
                ? (v({
                    createWallet: {
                      onSuccess: () => {},
                      onFailure: (r) => {
                        (j({
                          eventName: "embedded_wallet_creation_failure_logout",
                          payload: { error: r, screen: "RecoveryOAuthScreen" },
                        }),
                          e());
                      },
                      callAuthOnSuccessOnClose: !0,
                      shouldCreateEth: !1,
                      shouldCreateSol: !1,
                    },
                  }),
                  s("EmbeddedWalletCreatedScreen"))
                : k({ shouldCallAuthOnSuccess: !1 });
            }, l.Q);
            return () => clearTimeout(r);
          }, [A]));
        let V = (0, o.useCallback)(async () => {
            (await N.execute("recover"), U ? s(U) : E(!0));
          }, []),
          B = "google-drive" === _ ? "Google Drive" : "Apple iCloud",
          W =
            (A &&
              `Successfully ${"recover" === M ? "recovered" : "backed up"} with ${B}.`) ||
            (L && L.message) ||
            `${"recover" === M ? "Recovering" : "Backing up"} with ${B}...`,
          F = L ? L.detail : "";
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsx)(a.M, {}),
            S
              ? (0, r.jsx)(r.Fragment, {
                  children: (0, r.jsxs)(g.R, {
                    children: [
                      (0, r.jsx)(i.C, {
                        title: W,
                        icon: (0, r.jsx)(Z, {
                          style: { width: "38px", height: "38px" },
                        }),
                        description: F,
                      }),
                      L && L?.retryable
                        ? (0, r.jsx)(a.P, {
                            onClick: () => {
                              ((0, y.k)(),
                                R(void 0),
                                "create-wallet" === M
                                  ? N.execute("create-wallet")
                                  : V());
                            },
                            disabled: !A && !L?.retryable,
                            children: "Try again",
                          })
                        : null,
                    ],
                  }),
                })
              : (0, r.jsxs)(g.R, {
                  children: [
                    (0, r.jsx)(i.C, {
                      title: "Confirm it's really you",
                      icon: (0, r.jsx)(Z, { style: { height: 42, width: 48 } }),
                      description: `To confirm your identity, please log in to ${B} where your account is backed up.`,
                    }),
                    (0, r.jsxs)(a.P, {
                      onClick: V,
                      children: ["Confirm with ", B],
                    }),
                  ],
                }),
            (0, r.jsx)(t.B, {}),
          ],
        });
      },
    };
  e.s(["RecoveryOAuthScreen", 0, m, "default", 0, m]);
};
