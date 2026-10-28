// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var o = r.i(732486),
    e = r.i(91163),
    a = r.i(147890),
    l = r.i(352386),
    i = r.i(933185),
    c = r.i(995040),
    n = r.i(25047),
    t = r.i(689391),
    d = r.i(205212),
    s = r.i(850876),
    v = r.i(748117),
    u = r.i(636447),
    p = r.i(315430);
  (r.i(252494), r.i(785373), r.i(768820));
  let h = t.z.div`
  && {
    border-width: 4px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  aspect-ratio: 1;
  border-style: solid;
  border-color: ${(r) => r.$color ?? "var(--privy-color-accent)"};
  border-radius: 50%;
`,
    g = {
      component: () => {
        let { user: r } = (0, i.u)(),
          {
            client: t,
            walletProxy: g,
            refreshSessionAndUser: b,
            closePrivyModal: y,
          } = (0, v.u)(),
          f = (0, u.u)(),
          { entropyId: x, entropyIdVerifier: m } = f.data?.recoverWallet ?? {},
          [k, w] = (0, l.useState)(!1),
          [j, $] = (0, l.useState)(null),
          [z, M] = (0, l.useState)(null);
        function C() {
          if (!k) {
            if (z) return (f.data?.setWalletPassword?.onFailure(z), void y());
            if (!j)
              return (
                f.data?.setWalletPassword?.onFailure(
                  Error("User exited set recovery flow"),
                ),
                void y()
              );
          }
        }
        return (
          (f.onUserCloseViaDialogOrKeybindRef.current = C),
          (0, o.jsxs)(
            o.Fragment,
            z
              ? {
                  children: [
                    (0, o.jsx)(c.M, { onClose: C }, "header"),
                    (0, o.jsx)(h, {
                      $color: "var(--privy-color-error)",
                      style: { alignSelf: "center" },
                      children: (0, o.jsx)(e.f, {
                        height: 38,
                        width: 38,
                        stroke: "var(--privy-color-error)",
                      }),
                    }),
                    (0, o.jsx)(s.T, {
                      style: { marginTop: "0.5rem" },
                      children: "Something went wrong",
                    }),
                    (0, o.jsx)(p.G, { style: { minHeight: "2rem" } }),
                    (0, o.jsx)(c.b, {
                      onClick: () => M(null),
                      children: "Try again",
                    }),
                    (0, o.jsx)(n.B, {}),
                  ],
                }
              : {
                  children: [
                    (0, o.jsx)(c.M, { onClose: C }, "header"),
                    (0, o.jsx)(a.f, {
                      style: {
                        width: "3rem",
                        height: "3rem",
                        alignSelf: "center",
                      },
                    }),
                    (0, o.jsx)(s.T, {
                      style: { marginTop: "0.5rem" },
                      children: "Automatically secure your account",
                    }),
                    (0, o.jsx)(d.S, {
                      style: { marginTop: "1rem" },
                      children:
                        "When you log into a new device, you’ll only need to authenticate to access your account. Never get logged out if you forget your password.",
                    }),
                    (0, o.jsx)(p.G, { style: { minHeight: "2rem" } }),
                    (0, o.jsx)(c.b, {
                      loading: k,
                      disabled: !(!k && !j),
                      onClick: () =>
                        (async function () {
                          w(!0);
                          try {
                            let o = await t.getAccessToken(),
                              e = (0, i.k)(r, x);
                            if (!o || !g || !e) return;
                            if (
                              !(
                                await g.setRecovery({
                                  accessToken: o,
                                  entropyId: x,
                                  entropyIdVerifier: m,
                                  existingRecoveryMethod: e.recoveryMethod,
                                  recoveryMethod: "privy",
                                })
                              ).entropyId
                            )
                              throw Error("Unable to set recovery on wallet");
                            let a = await b();
                            if (!a)
                              throw Error("Unable to set recovery on wallet");
                            let l = (0, i.k)(a, e.address);
                            if (!l)
                              throw Error("Unabled to set recovery on wallet");
                            ($(!!a),
                              setTimeout(() => {
                                (f.data?.setWalletPassword?.onSuccess(l), y());
                              }, i.Q));
                          } catch (r) {
                            M(r);
                          } finally {
                            w(!1);
                          }
                        })(),
                      children: j ? "Success" : "Confirm",
                    }),
                    (0, o.jsx)(n.B, {}),
                  ],
                },
          )
        );
      },
    };
  r.s(["SetAutomaticRecoveryScreen", 0, g, "default", 0, g]);
};
