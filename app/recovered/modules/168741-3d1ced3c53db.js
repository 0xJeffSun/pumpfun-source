// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(572280),
    a = r.i(352386),
    i = r.i(42799),
    l = r.i(933185),
    t = r.i(827432),
    n = r.i(565530),
    c = r.i(748117),
    d = r.i(616800),
    s = r.i(636447),
    v = r.i(432250),
    p = r.i(335341);
  (r.i(252494), r.i(785373), r.i(768820), r.i(535391));
  let u = ({ errorMessage: r, onClose: a }) =>
      (0, e.jsx)(
        p.S,
        r
          ? {
              title: "Something went wrong",
              subtitle: r,
              icon: o.f,
              iconVariant: "error",
              primaryCta: { label: "Close", onClick: a },
              watermark: !0,
            }
          : {
              title: "Creating your wallet",
              subtitle: "Please wait...",
              iconVariant: "loading",
              watermark: !1,
            },
      ),
    h = {
      component: () => {
        let {
            setModalData: r,
            navigate: o,
            data: p,
            onUserCloseViaDialogOrKeybindRef: h,
          } = (0, s.u)(),
          g = (0, l.a)(),
          [b, y] = (0, a.useState)(""),
          { embeddedWallets: f } = (0, l.a)(),
          { authenticated: x, user: m } = (0, l.u)(),
          { closePrivyModal: w, walletProxy: k, client: j } = (0, c.u)(),
          {
            onSuccess: z,
            onFailure: C,
            callAuthOnSuccessOnClose: $,
            shouldCreateEth: S,
            shouldCreateSol: M,
          } = p.createWallet,
          A = (0, v.u)(),
          E = m ? A(d.W)?.shouldCreateWallet({ user: m }) : void 0,
          Z = !!m && (0, d.s)(m, g.embeddedWallets.ethereum.createOnLogin, E),
          W = !!m && (0, d.g)(m, g.embeddedWallets.solana.createOnLogin, E),
          V =
            "legacy-embedded-wallets-only" === g.embeddedWallets.mode &&
            !0 === g?.embeddedWallets.requireUserOwnedRecoveryOnCreate,
          [B, T] = (0, a.useState)(null),
          { create: L } = (0, d.n)(),
          O = S ?? Z,
          F = M ?? W,
          R = new t.R(async () => {
            let r = await j.getAccessToken();
            if (m && r && k)
              try {
                let r,
                  e = await (0, i.Q)(m.id, "ethereum"),
                  a = await (0, i.Q)(m.id, "solana");
                if (O && F)
                  ((r = await L({
                    chainType: "ethereum",
                    walletIndex: 0,
                    latestUser: m,
                    idempotencyKey: e,
                  })),
                    (r = await L({
                      chainType: "solana",
                      walletIndex: 0,
                      latestUser: r.user,
                      idempotencyKey: a,
                    })));
                else if (F)
                  r = await L({
                    chainType: "solana",
                    walletIndex: 0,
                    latestUser: m,
                    idempotencyKey: a,
                  });
                else {
                  if (!O) return void w({ shouldCallAuthOnSuccess: $ });
                  r = await L({
                    chainType: "ethereum",
                    walletIndex: 0,
                    latestUser: m,
                    idempotencyKey: e,
                  });
                }
                (T(r), o("EmbeddedWalletCreatedScreen"));
              } catch (r) {
                y(r.message);
              }
          });
        return (
          (0, a.useEffect)(
            () =>
              x && m
                ? V
                  ? (r({
                      ...p,
                      createWallet: {
                        ...p.createWallet,
                        shouldCreateEth: O,
                        shouldCreateSol: F,
                      },
                      recoverySelection: {
                        ...p?.recoverySelection,
                        isInAccountCreateFlow: !0,
                        shouldCreateEth: O,
                        shouldCreateSol: F,
                      },
                    }),
                    o(
                      (0, d.v)({
                        walletAction: "create",
                        showAutomaticRecovery: !1,
                        availableRecoveryMethods: f.userOwnedRecoveryOptions,
                        legacySetWalletPasswordFlow: !1,
                        isResettingPassword: !1,
                      }),
                    ))
                  : void R.execute()
                : (o("LandingScreen"),
                  void C(
                    Error(
                      "User must be authenticated before creating a Privy wallet",
                    ),
                  )),
            [V, x],
          ),
          (h.current = () => null),
          (0, e.jsx)(u, {
            errorMessage: b || void 0,
            onClose: () => {
              B
                ? (z(B), w({ shouldCallAuthOnSuccess: $ }))
                : (C(new n.k("User wallet creation failed")),
                  w({ shouldCallAuthOnSuccess: !1 }));
            },
          })
        );
      },
    };
  r.s([
    "EmbeddedWalletOnAccountCreateScreen",
    0,
    h,
    "EmbeddedWalletOnAccountCreateView",
    0,
    u,
    "default",
    0,
    h,
  ]);
};
