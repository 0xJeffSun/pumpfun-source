// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(352386),
    i = r.i(933185),
    a = r.i(827432),
    l = r.i(565530),
    t = r.i(748117),
    n = r.i(616800),
    c = r.i(636447),
    d = r.i(700622);
  (r.i(252494),
    r.i(785373),
    r.i(768820),
    r.i(535391),
    r.i(950542),
    r.i(279641));
  let s = {
    component: () => {
      let {
          navigate: r,
          data: s,
          onUserCloseViaDialogOrKeybindRef: v,
        } = (0, c.u)(),
        p = (0, i.a)(),
        [u, h] = (0, o.useState)(""),
        [g, f] = (0, o.useState)(!1),
        [b, x] = (0, o.useState)(),
        [y, m] = (0, o.useState)(null),
        { create: w } = (0, n.n)(),
        { authenticated: k, user: j } = (0, i.u)(),
        {
          closePrivyModal: z,
          isNewUserThisSession: $,
          initializeWalletProxy: C,
        } = (0, t.u)(),
        {
          onSuccess: M,
          onFailure: E,
          callAuthOnSuccessOnClose: S,
          shouldCreateEth: L,
          shouldCreateSol: Z,
        } = s.createWallet,
        [B, A] = (0, o.useState)(null),
        V = new a.R(async () => {
          try {
            let e;
            if (L && Z)
              ((e = await w({
                recoveryMethod: "user-passcode",
                recoveryPassword: b,
                chainType: "ethereum",
                walletIndex: 0,
                latestUser: j,
              })),
                (e = await w({
                  chainType: "solana",
                  walletIndex: 0,
                  latestUser: e.user,
                })));
            else if (Z)
              e = await w({
                recoveryMethod: "user-passcode",
                recoveryPassword: b,
                chainType: "solana",
                walletIndex: 0,
                latestUser: j,
              });
            else {
              if (!L) throw Error("Invalid args to create wallet");
              e = await w({
                recoveryMethod: "user-passcode",
                recoveryPassword: b,
                chainType: "ethereum",
                walletIndex: 0,
                latestUser: j,
              });
            }
            (A(e),
              $
                ? r("EmbeddedWalletCreatedScreen")
                : (M(e), z({ shouldCallAuthOnSuccess: S })));
          } catch (r) {
            h(r.message);
          }
        });
      return (
        (0, o.useEffect)(() => {
          y || C(3e4).then((r) => m(r));
        }, [y]),
        (0, o.useEffect)(() => {
          if (!k || !j)
            return (
              r("LandingScreen"),
              void E(
                Error(
                  "User must be authenticated before creating a Privy wallet",
                ),
              )
            );
        }, [k]),
        (v.current = () => null),
        (0, e.jsx)(d.S, {
          config: { initiatedBy: "automatic" },
          appName: p?.name || "privy",
          loading: !y,
          buttonLoading: g,
          buttonHideAnimations: !B && g,
          isResettingPassword: !1,
          error: u,
          password: b || "",
          onClose: () => {
            B && "user-passcode" !== B.account.recoveryMethod
              ? (E(
                  new l.k(
                    "User created a wallet but failed to set a password for it",
                  ),
                ),
                z({ shouldCallAuthOnSuccess: !1 }))
              : B
                ? (M(B), z({ shouldCallAuthOnSuccess: S }))
                : (E(new l.k("User wallet creation failed")),
                  z({ shouldCallAuthOnSuccess: !1 }));
          },
          onPasswordChange: x,
          onPasswordGenerate: () => x((0, d.g)()),
          onSubmit: async () => (
            f(!0),
            V.execute()
              .then(() => new Promise((r) => setTimeout(r, 250)))
              .finally(() => f(!1))
          ),
        })
      );
    },
  };
  r.s(["EmbeddedWalletPasswordCreateScreen", 0, s, "default", 0, s]);
};
