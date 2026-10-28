// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(933185),
    a = r.i(565530),
    t = r.i(748117),
    l = r.i(636447),
    n = r.i(582355),
    c = r.i(700622);
  (r.i(252494), r.i(950542), r.i(279641));
  let d = {
    component: () => {
      let [r, d] = (0, o.useState)(null),
        [s, v] = (0, o.useState)(!1),
        [p, h] = (0, o.useState)(null),
        [u, g] = (0, o.useState)(""),
        { authenticated: f, user: b } = (0, i.u)(),
        {
          client: y,
          walletProxy: x,
          refreshSessionAndUser: m,
          closePrivyModal: w,
          createAnalyticsEvent: k,
        } = (0, t.u)(),
        {
          navigate: j,
          data: z,
          onUserCloseViaDialogOrKeybindRef: $,
        } = (0, l.u)(),
        M = (0, i.a)(),
        { onSuccess: C, onFailure: E } = z.setWalletPassword,
        L = (0, i.g)(b),
        Z = "user-passcode" === r?.recoveryMethod,
        A = "user-passcode" === L?.recoveryMethod;
      (0, o.useEffect)(() => {
        f ||
          (j("LandingScreen"),
          E(
            new a.l(
              "User must be authenticated before setting a password on a Privy wallet",
            ),
          ));
      }, [f]);
      let R = () => (
        p
          ? E(p)
          : Z
            ? C(r)
            : E(new a.k("Exited before password was added to wallet")),
        void w({ shouldCallAuthOnSuccess: !1 })
      );
      return (
        ($.current = R),
        (0, e.jsx)(c.S, {
          appName: M?.name || "privy",
          config: { initiatedBy: "user", onCancel: R },
          error: p ? "An error has occurred, please try again." : void 0,
          buttonLoading: s,
          buttonHideAnimations: !1,
          password: u,
          isResettingPassword: A,
          onPasswordGenerate: () => g((0, c.g)()),
          onPasswordChange: g,
          onSubmit: async () => {
            Z
              ? (C(r), w({ shouldCallAuthOnSuccess: !1 }))
              : (v(!0),
                h(null),
                await (async () => {
                  let r = await y.getAccessToken();
                  if (r && b && L?.address && u && x)
                    try {
                      k({
                        eventName: "embedded_wallet_set_recovery_started",
                        payload: {
                          walletAddress: L.address,
                          existingRecoveryMethod: L.recoveryMethod,
                          targetRecoveryMethod: "user-passcode",
                          isResettingPassword: A,
                        },
                      });
                      let { entropyId: e, entropyIdVerifier: o } = (0, n.g)(b);
                      if (
                        !(
                          await x.setRecovery({
                            accessToken: r,
                            entropyId: e,
                            entropyIdVerifier: o,
                            recoveryPassword: u,
                            recoveryMethod: "user-passcode",
                          })
                        ).entropyId
                      )
                        return (
                          h(new a.k("Error setting password on privy wallet")),
                          void k({
                            eventName: "embedded_wallet_set_recovery_failed",
                            payload: {
                              walletAddress: L.address,
                              existingRecoveryMethod: L.recoveryMethod,
                              targetRecoveryMethod: "user-passcode",
                              isResettingPassword: A,
                              reason: "error setting password",
                            },
                          })
                        );
                      let t = await m(),
                        l = (0, i.g)(t);
                      if (!l)
                        return (
                          h(new a.k("Error setting password on privy wallet")),
                          void k({
                            eventName: "embedded_wallet_set_recovery_failed",
                            payload: {
                              walletAddress: L.address,
                              existingRecoveryMethod: L.recoveryMethod,
                              targetRecoveryMethod: "user-passcode",
                              isResettingPassword: A,
                              reason: "wallet disconnected",
                            },
                          })
                        );
                      (d(l),
                        k({
                          eventName: "embedded_wallet_set_recovery_completed",
                          payload: {
                            walletAddress: L.address,
                            existingRecoveryMethod: L.recoveryMethod,
                            targetRecoveryMethod: "user-passcode",
                            isResettingPassword: A,
                          },
                        }));
                    } catch (r) {
                      (console.warn(r),
                        h(
                          r instanceof Error
                            ? r
                            : Error("Error setting password on privy wallet"),
                        ),
                        k({
                          eventName: "embedded_wallet_set_password_failed",
                          payload: { walletAddress: L.address, reason: r },
                        }));
                    }
                })(),
                v(!1));
          },
          onClose: R,
        })
      );
    },
  };
  r.s(["EmbeddedWalletPasswordUpdateScreen", 0, d, "default", 0, d]);
};
