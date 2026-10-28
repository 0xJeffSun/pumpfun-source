// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(732486),
    o = r.i(583503),
    i = r.i(19916),
    a = r.i(636447),
    l = r.i(335341);
  (r.i(352386), r.i(252494));
  let n = ({
      walletName: r,
      installLink: a,
      title: n,
      subtitle: t = "Follow the instructions below to get started.",
      onReload: c,
      onBack: d,
    }) => {
      let s = n || `Create a ${r} wallet`.replace(/wallet wallet/gi, "wallet");
      return (0, e.jsx)(l.S, {
        title: s,
        subtitle: t,
        onBack: d,
        showBack: !0,
        primaryCta: { label: "Reload the page to use your wallet", onClick: c },
        helpText: (0, e.jsxs)(e.Fragment, {
          children: [
            (0, e.jsx)("span", { children: "Still not sure? " }),
            (0, e.jsx)(o.L, {
              size: "sm",
              target: "_blank",
              href: "https://solana.com/docs/intro/wallets",
              children: "Learn more",
            }),
          ],
        }),
        watermark: !0,
        children: (0, e.jsxs)(i.T, {
          children: [
            (0, e.jsx)(i.a, {
              children: (0, e.jsxs)("div", {
                children: [
                  (0, e.jsx)("span", { children: "Install the " }),
                  " ",
                  (0, e.jsxs)(o.L, {
                    href: a,
                    target: "_blank",
                    children: [r, " browser extension"],
                  }),
                ],
              }),
            }),
            (0, e.jsx)(i.a, { children: "Set up your first wallet" }),
            (0, e.jsx)(i.a, {
              children: "Store your recovery phrase in a safe place!",
            }),
          ],
        }),
      });
    },
    t = {
      component: () => {
        let { navigateBack: r, data: o } = (0, a.u)();
        if (!o?.installWalletModalData) throw Error("Wallet data is missing");
        let { walletConfig: i } = o.installWalletModalData;
        return (0, e.jsx)(n, {
          walletName: i.name,
          installLink: i.installLink,
          onReload: () => {
            window.location.reload();
          },
          onBack: r,
        });
      },
    };
  r.s([
    "InstallWalletScreen",
    0,
    t,
    "InstallWalletScreenView",
    0,
    n,
    "default",
    0,
    t,
  ]);
};
