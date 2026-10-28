// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(269722),
    i = r.i(352386),
    a = r.i(933185),
    l = r.i(748117),
    n = r.i(636447),
    t = r.i(335341);
  r.i(252494);
  let c = ({ title: r, description: i, onClose: a }) =>
      (0, e.jsx)(t.S, {
        title: r,
        subtitle: i,
        icon: o.f,
        iconVariant: "success",
        watermark: !0,
        onBack: a,
      }),
    d = {
      component: () => {
        let { user: r } = (0, a.u)(),
          {
            closePrivyModal: o,
            isNewUserThisSession: t,
            updateWallets: d,
          } = (0, l.u)(),
          { data: s, onUserCloseViaDialogOrKeybindRef: v } = (0, n.u)(),
          p = (0, a.a)(),
          {
            onSuccess: u,
            onFailure: h,
            callAuthOnSuccessOnClose: g,
          } = s.createWallet,
          b = () => {
            let e = (0, a.M)(r) ?? (0, a.N)(r);
            (r && e
              ? (d(), u({ user: r, account: e }))
              : h(Error("Failed to create wallet")),
              o({ shouldCallAuthOnSuccess: g }));
          };
        ((0, i.useEffect)(() => {
          let r = setTimeout(b, a.T);
          return () => clearTimeout(r);
        }, []),
          (v.current = b));
        let f = t && !((r?.linkedAccounts?.length ?? 0) > 1);
        return (0, e.jsx)(c, {
          title: f ? "Welcome" + (p?.name ? ` to ${p?.name}` : "") : "All set!",
          description: f
            ? "You've successfully created an account."
            : "Your account is secured.",
          onClose: b,
        });
      },
    };
  r.s([
    "EmbeddedWalletCreatedScreen",
    0,
    d,
    "EmbeddedWalletCreatedScreenView",
    0,
    c,
    "default",
    0,
    d,
  ]);
};
