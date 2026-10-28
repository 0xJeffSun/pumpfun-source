// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(465120),
    i = r.i(565530),
    a = r.i(748117),
    l = r.i(636447),
    n = r.i(335341);
  (r.i(352386), r.i(252494));
  let t = ({ onClose: r, onProceed: i }) =>
      (0, e.jsx)(n.S, {
        title: "Secure Your Account",
        subtitle: (0, e.jsxs)(e.Fragment, {
          children: [
            "Please set a password to secure your account.",
            (0, e.jsx)("br", {}),
            "Losing access to this password and this device will make your account inaccessible.",
          ],
        }),
        icon: o.f,
        primaryCta: { label: "Add password", onClick: i },
        onClose: r,
        watermark: !0,
      }),
    c = {
      component: () => {
        let { closePrivyModal: r } = (0, a.u)(),
          {
            data: o,
            navigate: n,
            onUserCloseViaDialogOrKeybindRef: c,
          } = (0, l.u)(),
          { onFailure: d } = o.setWalletPassword,
          s = () => {
            (d(new i.k("Exited before password was added to wallet")),
              r({ shouldCallAuthOnSuccess: !1 }));
          };
        return (
          (c.current = s),
          (0, e.jsx)(t, {
            onClose: s,
            onProceed: () => {
              n("EmbeddedWalletPasswordUpdateScreen");
            },
          })
        );
      },
    };
  r.s([
    "EmbeddedWalletPasswordUpdateSplashScreen",
    0,
    c,
    "EmbeddedWalletPasswordUpdateSplashView",
    0,
    t,
    "default",
    0,
    c,
  ]);
};
